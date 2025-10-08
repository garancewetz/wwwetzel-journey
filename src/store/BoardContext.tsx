'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import boardData from '../datas/board';
import xpsData from '../datas/xps.json';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  company?: string;
  urlPage?: string;
  created_at: string;
  marketing?: {
    brand: string;
    imageUrl: string;
  };
}

interface FoundItem {
  name: string;
  image: string;
  type: string;
  text?: string;
  projects?: Project[];
}

interface GridItem {
  id: number;
  isWay?: boolean;
  item?: {
    name: string;
    image: string;
    found: boolean;
    type: string;
  };
}

interface BoardContextType {
  grid: GridItem[][];
  foundItems: FoundItem[];
  
  addFoundItem: (item: FoundItem, row: number, col: number) => void;
  clearFoundItems: () => void;
  resetGame: () => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [grid, setGrid] = useState<GridItem[][]>([]);
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);

  // Initialiser la grille avec les données du board.json
  useEffect(() => {
    setGrid(boardData as GridItem[][]);
  }, []);

  const addFoundItem = (item: FoundItem, row: number, col: number) => {
    setFoundItems(prev => {
      // Vérifier si l'item n'est pas déjà dans la liste
      const exists = prev.some(existingItem => existingItem.name === item.name);
      if (!exists) {
        // Enrichir l'item avec les projets si c'est une expérience
        let enrichedItem = { ...item };
        if (item.type === 'xp') {
          // Extraire le nom de la compagnie du nom de l'expérience
          const companyMatch = item.name.match(/^(\w+)\s*-/);
          if (companyMatch) {
            const companyKey = companyMatch[1].toLowerCase();
            const projects = (xpsData as Record<string, Project[]>)[companyKey];
            if (projects) {
              enrichedItem.projects = projects;
            }
          }
        }
        
        // Mettre à jour la grille : marquer comme trouvé seulement si ce n'est PAS un danger
        // Les dangers restent visibles sur la carte même après avoir été collectés
        setGrid(prevGrid => 
          prevGrid.map((gridRow, rowIndex) => 
            rowIndex === row 
              ? gridRow.map((cell, colIndex) => 
                  colIndex === col && cell.item
                    ? { ...cell, item: { ...cell.item, found: item.type === 'danger' ? false : true } }
                    : cell
                )
              : gridRow
          )
        );
        return [...prev, enrichedItem];
      }
      return prev;
    });
  };

  const clearFoundItems = () => {
    setFoundItems([]);
  };

  const resetGame = () => {
    setGrid(boardData as GridItem[][]);
    setFoundItems([]);
  };

  return (
    <BoardContext.Provider value={{ grid, foundItems, addFoundItem, clearFoundItems, resetGame }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
}
