'use client'

import { useState, useEffect, useRef, useCallback } from "react";
import Character from '../atoms/Character';
import GridRow from '../molecules/GridRow';
import { useBoard } from '../../store/BoardContext';

export default function Board() {
  const { grid, getFoundItems, setCurrentPosition, setCurrentItem } = useBoard();

  const [gridOffset, setGridOffset] = useState({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [circleRadius, setCircleRadius] = useState(150);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);

  const heightCell = 120;
  const cellHalfHeight = heightCell / 2;
  // Calculer le rayon du cercle en fonction des XPs trouvés
  const baseRadius = 150;
  const radiusIncrement = 15;
  const foundXpsCount = getFoundItems().filter(item => item.type === 'xp').length;

  // Mettre à jour le rayon
  useEffect(() => {
    const timer = setTimeout(() => {
      setCircleRadius(baseRadius + (foundXpsCount * radiusIncrement));
    }, 0);

    return () => clearTimeout(timer);
  }, [foundXpsCount]);

  const updateGridPosition = useCallback((row: number, col: number) => {
    if (gridRef.current) {
      const targetInput = gridRef.current.querySelector(`[data-row="${row}"][data-col="${col}"]`) as HTMLElement;
      if (targetInput) {
        const inputRect = targetInput.getBoundingClientRect();

        // Calculer l'offset pour centrer la case cible sous le personnage fixe
        const windowCenterX = window.innerWidth / 2;
        const windowCenterY = window.innerHeight / 2;
        const inputCenterX = inputRect.left + cellHalfHeight;
        const inputCenterY = inputRect.top + cellHalfHeight;

        // Calculer l'offset nécessaire pour centrer la case cible
        const offsetX = windowCenterX - inputCenterX;
        const offsetY = windowCenterY - inputCenterY;

        setGridOffset({ x: offsetX, y: offsetY });
      }
    }
  }, [cellHalfHeight]);

  const moveGridByOneCell = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    setGridOffset(prev => {
      switch (direction) {
        case 'up':
          return { x: prev.x, y: prev.y + cellHalfHeight };
        case 'down':
          return { x: prev.x, y: prev.y - cellHalfHeight };
        case 'left':
          return { x: prev.x + cellHalfHeight, y: prev.y };
        case 'right':
          return { x: prev.x - cellHalfHeight, y: prev.y };
        default:
          return prev;
      }
    });
  }, [cellHalfHeight]);

  const deselectActiveElement = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
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
        deselectActiveElement();

        setCurrentPosition(prev => {
          if (prev.row === 0) return prev;
          // récupération de la nouvelle position
          const newPosition = { col: prev.col, row: prev.row - 1 };
          const newCell = grid[newPosition.row][newPosition.col];
          if (!newCell.isWay) return prev;
          moveGridByOneCell('up');
          return newPosition;
        });
        break;
      case 'ArrowDown':
        event.preventDefault();
        deselectActiveElement();

        setCurrentPosition(prev => {
          if (prev.row >= maxRows - 1) return prev;

          const newPosition = { col: prev.col, row: prev.row + 1 };
          const newCell = grid[newPosition.row][newPosition.col];
          if (!newCell.isWay) return prev;

          moveGridByOneCell('down');
          return newPosition;

        });
        break;
      case 'ArrowLeft':
        event.preventDefault();
        deselectActiveElement();

        setCurrentPosition(prev => {
          if (prev.col <= 0) return prev;

          const newPosition = { col: prev.col - 1, row: prev.row };
          const newCell = grid[newPosition.row][newPosition.col];
          if (!newCell.isWay) return prev;

          moveGridByOneCell('left');
          return newPosition;

        });
        break;
      case 'ArrowRight':
        event.preventDefault();
        deselectActiveElement();
        setCurrentPosition(prev => {
          if (prev.col >= maxCols - 1) return prev;

          const newPosition = { col: prev.col + 1, row: prev.row };
          const newCell = grid[newPosition.row][newPosition.col];
          if (!newCell.isWay) return prev;

          moveGridByOneCell('right');
          return newPosition;

        });
        break;
      case ' ':
        event.preventDefault();

        setCurrentPosition(prev => {
          const currentCell = grid[prev.row][prev.col];
          const currentItems = currentCell.items ?? [];
          const collectibleIndex = currentItems.findIndex(
            (item) => (item.type === 'xp' || item.type === 'interest') && !item.found
          );

          if (collectibleIndex !== -1) {
            const updatedCell = {
              ...currentCell,
              items: currentItems.map((item, index) =>
                index === collectibleIndex ? { ...item, found: true } : item
              ),
            };
            setCurrentItem(updatedCell, prev.row, prev.col);
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
  }, [grid, deselectActiveElement, moveGridByOneCell, setCurrentItem, setCurrentPosition]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Initialiser la position de la grille au montage pour centrer la première case de la dernière ligne sous le character
  useEffect(() => {
    if (grid && grid.length > 0 && !hasInitializedRef.current) {
      hasInitializedRef.current = true;
      // Attendre que le DOM soit chargé
      // Calculer dynamiquement l'index de la dernière ligne
      const timer = setTimeout(() => {
        const initialPosition = { row: 10, col: 1 };
        // Rendre la grille puis positionner la vue sur la case de départ
        setIsInitialized(true);
        setCurrentPosition(initialPosition);
        requestAnimationFrame(() => {
          updateGridPosition(initialPosition.row, initialPosition.col);
        });
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [grid, setCurrentPosition, updateGridPosition]);

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
      <Character />

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
