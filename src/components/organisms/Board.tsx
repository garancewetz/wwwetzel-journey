'use client'

import { useState, useEffect, useRef, useCallback } from "react";
import Character from '../atoms/Character';
import GridRow from '../molecules/GridRow';
import { useBoard } from '../../store/BoardContext';

export default function Board() {
  const { grid, addFoundItem, foundItems } = useBoard();
// je veux flatter mon board.json
const flattenedGrid = grid.flat();
const mappedGrid = new Map(flattenedGrid.map((item) => [item.id, item]));

  const [currentPosition, setCurrentPosition] = useState({ row: 0, col: 0 });
  const [gridOffset, setGridOffset] = useState({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [circleRadius, setCircleRadius] = useState(150);
  const gridRef = useRef<HTMLDivElement>(null);
  const heightCell = 120;

  // Calculer le rayon du cercle en fonction des XPs trouvés
  const baseRadius = 150;
  const radiusIncrement = 15;
  const foundXpsCount = foundItems.filter(item => item.type === 'xp').length;

  // Mettre à jour le rayon avec un délai de 200ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setCircleRadius(baseRadius + (foundXpsCount * radiusIncrement));
    }, 0);

    return () => clearTimeout(timer);
  }, [foundXpsCount]);

  const updateGridPosition = (row: number, col: number) => {
    if (gridRef.current) {
      const targetInput = gridRef.current.querySelector(`[data-row="${row}"][data-col="${col}"]`) as HTMLElement;
      if (targetInput) {
        const inputRect = targetInput.getBoundingClientRect();
        
        // Calculer l'offset pour centrer la case cible sous le personnage fixe
        const windowCenterX = window.innerWidth / 2;
        const windowCenterY = window.innerHeight / 2;
        const inputCenterX = inputRect.left + (inputRect.width / 2);
        const inputCenterY = inputRect.top + (inputRect.height / 2);
        
        // Calculer l'offset nécessaire pour centrer la case cible
        const offsetX = windowCenterX - inputCenterX;
        const offsetY = windowCenterY - inputCenterY;
        
        setGridOffset({ x: offsetX, y: offsetY });
      }
    }
  };

  const moveGridByOneCell = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (gridRef.current) {
      const firstCell = gridRef.current.querySelector('[data-row="0"][data-col="0"]') as HTMLElement;
      if (firstCell) {
        const cellHeight = heightCell; // 120px (h-30)
        const cellWidth = firstCell.offsetWidth;
        
        setGridOffset(prev => {
          switch (direction) {
            case 'up':
              return { x: prev.x, y: prev.y + cellHeight/2 };
            case 'down':
              return { x: prev.x, y: prev.y - cellHeight/2 };
            case 'left':
              return { x: prev.x + cellWidth/2, y: prev.y };
            case 'right':
              return { x: prev.x - cellWidth/2, y: prev.y };
            default:
              return prev;
          }
        });
      }
    }
  };

  const deselectAllInputs = useCallback(() => {
    if (gridRef.current) {
      const allInputs = gridRef.current.querySelectorAll('input');
      allInputs.forEach(input => {
        (input as HTMLInputElement).blur();
      });
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    
    // Vérifier que la grille est chargée
    if (!grid || grid.length === 0) return;
    
    const maxRows = grid.length;
    const maxCols = grid[0].length;

    switch (key) {
      case 'ArrowUp':
        event.preventDefault();
        deselectAllInputs();
        setCurrentPosition(prev => {
          if (prev?.row > 0) {
            const futureCell = grid[prev.row-1][prev.col];
            const futureDataCell = mappedGrid.get(futureCell.id);
            if (!futureDataCell?.isWay) return prev;

            const newRow = prev.row - 1;
            moveGridByOneCell('up');
            return { ...prev, row: newRow };
          }
          return prev;
        });
        break;
      case 'ArrowDown':
        event.preventDefault();
        deselectAllInputs();

        setCurrentPosition(prev => {
          if (prev.row < maxRows - 1) {

            const futureCell = grid[prev.row+1][prev.col];
            const futureDataCell = mappedGrid.get(futureCell.id);
            if (!futureDataCell?.isWay) return prev;

            const newRow = prev.row + 1;
            moveGridByOneCell('down');
            return { ...prev, row: newRow };
          }
          return prev;
        });
        break;
      case 'ArrowLeft':
        event.preventDefault();
        deselectAllInputs();

        setCurrentPosition(prev => {
          if (prev.col > 0) {

            const futureCell = grid[prev.row][prev.col-1];
            const futureDataCell = mappedGrid.get(futureCell.id);
            if (!futureDataCell?.isWay) return prev;

            const newCol = prev.col - 1;
            moveGridByOneCell('left');
            return { ...prev, col: newCol };
          }
          return prev;
        });
        break;
      case 'ArrowRight':
        event.preventDefault();
        deselectAllInputs();
        setCurrentPosition(prev => {
          if (prev.col < maxCols - 1) {

            const futureCell = grid[prev.row][prev.col+1];
            const futureDataCell = mappedGrid.get(futureCell.id);
            if (!futureDataCell?.isWay) return prev;

            const newCol = prev.col + 1;
            moveGridByOneCell('right');
            return { ...prev, col: newCol };
          }
          return prev;
        });
        break;
      case ' ':
        event.preventDefault();
        setCurrentPosition(prev => {
          // Vérifier s'il y a un objet dans la case actuelle
          const currentCell = grid[prev.row][prev.col];
          if (currentCell.item) {
            // Ajouter l'objet au store et marquer comme trouvé
            addFoundItem(currentCell.item, prev.row, prev.col);
          }
          
          // Sélectionner l'input de la case actuelle
          if (gridRef.current) {
            const currentInput = gridRef.current.querySelector(`[data-row="${prev.row}"][data-col="${prev.col}"]`) as HTMLInputElement;
            if (currentInput) {
              currentInput.focus();
              currentInput.select();
            }
          }
          return prev;
        });
        break;
    }
  }, [grid, addFoundItem, deselectAllInputs]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);


  // Initialiser la position de la grille au montage pour centrer la première case de la dernière ligne sous le character
  useEffect(() => {
    if (grid && grid.length > 0 && !isInitialized) {
      // Attendre que le DOM soit chargé
      // Calculer dynamiquement l'index de la dernière ligne
      const timer = setTimeout(() => {
        const lastRowIndex = grid.length - 2;
        // Mettre à jour la position actuelle d'abord
        setCurrentPosition({ row: lastRowIndex, col: 1 });
        // Puis positionner la grille
        updateGridPosition(lastRowIndex, 1);
        // Marquer comme initialisé
      }, 200);
      setIsInitialized(true);
      
      return () => clearTimeout(timer);
    }
  }, [grid]);

  // Attendre 1 seconde après l'initialisation avant de rendre la carte visible
  useEffect(() => {
    if (isInitialized) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isInitialized]);

  // Afficher un message de chargement si la grille n'est pas encore chargée
  if (!grid || !isInitialized) {
    return <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className={`relative z-0 `}>

      {/* Écran de chargement noir complet */}
      <div 
        className="fixed inset-0 bg-black z-50 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isReady ? 0 : 1
        }}
      />

      {/* Fond noir complet pour masquer le contenu */}
     <div 
        className="fixed inset-0 bg-black/100 z-10 pointer-events-none"
        style={{
          mask: `radial-gradient(circle at 50% 50%, transparent ${circleRadius}px, black ${circleRadius}px)`,
          WebkitMask: `radial-gradient(circle at 50% 50%, transparent ${circleRadius}px, black ${circleRadius}px)`,
        }}
      />
       
      {/* Personnage fixe au centre */}
      <Character x={0} y={0} />
      
      {/* Grille avec les inputs - se déplace selon gridOffset */}
      <div 
        ref={gridRef}
        className="transition-transform duration-300 ease-in-out"
        style={{
          transform: `translate(${gridOffset.x}px, ${gridOffset.y}px)`
        }}
      >
        {grid.map((row, rowIndex) => (
          <GridRow
            heightCell={heightCell}
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
          />
        ))}
      </div>
    </div>
  );
}
