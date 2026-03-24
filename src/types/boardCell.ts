export interface Item {
  id: string;
  name: string;
  image: string;
  type: string;
  text?: string;
}

export interface BoardItem extends Item {
  found: boolean;
}

interface BoardCell {
  id: number;
  isWay?: boolean;
  items?: BoardItem[];
}

export default BoardCell;