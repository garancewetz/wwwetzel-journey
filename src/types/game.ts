export type ItemType = 'xp' | 'interest' | 'obstacle' | 'danger';

export interface Item {
  // Seuls les objets avec lesquels on interagit ont un id (xp, interest, danger)
  id?: string;
  type: ItemType;
  name: string;
  image: string;
  text?: string;
}

export interface Cell {
  id: number;
  isWay?: boolean;
  path?: string;
  items?: Item[];
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Position {
  row: number;
  col: number;
}
