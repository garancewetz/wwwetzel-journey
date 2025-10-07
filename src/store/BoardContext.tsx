'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import boardData from '../datas/board.json';

interface FoundItem {
  name: string;
  image: string;
  type: string;
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
        // Mettre à jour la grille pour marquer l'item comme trouvé
        setGrid(prevGrid => 
          prevGrid.map((gridRow, rowIndex) => 
            rowIndex === row 
              ? gridRow.map((cell, colIndex) => 
                  colIndex === col && cell.item
                    ? { ...cell, item: { ...cell.item, found: true } }
                    : cell
                )
              : gridRow
          )
        );
        return [...prev, item];
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
