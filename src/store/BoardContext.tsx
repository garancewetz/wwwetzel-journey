'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { board, experiences, interests } from '@/datas/board';
import xpsData from '@/datas/xps.json';
import Project from '@/types/project';
import BoardCell, { Item } from '@/types/boardCell';

interface BoardContextType {
  grid: BoardCell[][];
  experiences: Item[];
  interests: Item[];
  foundItems: Item[];
  currentCell: BoardCell | null;

  addFoundItem: (item: Item, row: number, col: number) => void;
  clearFoundItems: () => void;
  resetGame: () => void;
  setCurrentCell: (cell: BoardCell | null) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [grid, setGrid] = useState<BoardCell[][]>([]);
  const [foundItems, setFoundItems] = useState<Item[]>([]);
  const [currentCell, setCurrentCell] = useState<BoardCell | null>(null);

  // Initialiser la grille avec les données du board.json
  useEffect(() => {
    setGrid(board as BoardCell[][]);
  }, []);

  const addFoundItem = (item: Item, row: number, col: number) => {
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
                colIndex === col && cell.items
                  ? {
                    ...cell,
                    items: cell.items.map(cellItem =>
                      cellItem.name === item.name
                        ? { ...cellItem, found: item.type === 'danger' ? false : true }
                        : cellItem
                    )
                  }
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
    setGrid(board as BoardCell[][]);
    setFoundItems([]);
    setCurrentCell(null);
  };

  return (
    <BoardContext.Provider value={{
      grid, experiences, interests, foundItems, currentCell,
      addFoundItem, clearFoundItems, resetGame, setCurrentCell
    }}>
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
