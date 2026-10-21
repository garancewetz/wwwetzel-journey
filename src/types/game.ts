// danger : un ennemi, le vaincre coûte de la mana ; guard : un gardien amical, il suffit du bon objet
// companion : un compagnon trouvé en chemin, qui suit le personnage
export type ItemType = 'xp' | 'interest' | 'obstacle' | 'danger' | 'guard' | 'companion';

export interface Item {
  // Seuls les objets avec lesquels on interagit ont un id (xp, interest, danger)
  id?: string;
  type: ItemType;
  name: string;
  image: string;
  text?: string;
  // Intérêts : ce qui se passe quand on les utilise loin des ennemis (les répliques alternent)
  uses?: string[];
  // Dangers et gardiens : l'intérêt qui les fait céder, ce qui se dit alors, leur image ensuite (sinon ils disparaissent)
  key?: string;
  solved?: string;
  after?: string;
  // Gardiens : la réponse à tout autre objet
  refuse?: string;
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
