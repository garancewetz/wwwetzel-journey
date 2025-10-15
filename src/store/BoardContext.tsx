'use client'

import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { board } from '@/datas/board';
import BoardCell, { BoardItem, Item } from '@/types/boardCell';

interface ActionObj {
  text: string;
  enemy: BoardItem | null;
  weapon: BoardItem | null;
  action: string | null;
  image: string | null;
}

interface BoardContextType {
  grid: BoardCell[][];
  currentCell: BoardCell | null;
  currentPosition: { row: number; col: number };
  action: ActionObj | null;

  updateItemImage: (itemName: string, newImage: string, row: number, col: number) => void;
  setCurrentPosition: Dispatch<SetStateAction<{ row: number; col: number }>>;
  setAction: (action: ActionObj | null) => void;
  setCurrentItem: (cell: BoardCell, row: number, col: number) => void;
  getFoundItems: () => Item[];
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [grid, setGrid] = useState<BoardCell[][]>([]);
  const [currentCell, setCurrentCell] = useState<BoardCell | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{ row: number; col: number }>({ row: 0, col: 0 });
  const [action, setAction] = useState<ActionObj | null>(null);

  console.log("--- CURRENT CELL ---", currentCell);
  // Initialiser la grille avec les données du board.json
  useEffect(() => {
    setGrid(board as BoardCell[][]);
  }, []);

  useEffect(() => {
    if (grid && grid.length > 0) {
      setCurrentCell(grid[currentPosition?.row][currentPosition?.col]);
    }
  }, [currentPosition]);

  const setCurrentItem = (cell: BoardCell, row: number, col: number) => {
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = cell;
      return newGrid;
    });
  };

  const getFoundItems = () => {
    const flatGrid = grid.flat() as BoardCell[];
    return flatGrid.flatMap(cell =>
      cell.items?.filter(item => item.found) || []
    );
  };

  const updateItemImage = (itemName: string, newImage: string, row: number, col: number) => {
    setGrid(prevGrid =>
      prevGrid.map((gridRow, rowIndex) =>
        rowIndex === row
          ? gridRow.map((cell, colIndex) =>
            colIndex === col && cell.items
              ? {
                ...cell,
                items: cell.items.map(cellItem =>
                  cellItem.name === itemName
                    ? { ...cellItem, image: newImage }
                    : cellItem
                )
              }
              : cell
          )
          : gridRow
      )
    );
  };

  const contextValue: BoardContextType = {
    grid,
    currentCell,
    currentPosition,
    action,
    updateItemImage,
    setCurrentPosition,
    setAction,
    setCurrentItem,
    getFoundItems
  };

  return (
    <BoardContext.Provider value={contextValue}>
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
