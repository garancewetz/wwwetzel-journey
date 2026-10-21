import { Cell, Item, Position } from '@/types/game';
import {
  andariel, bush, cain, cheese, cloud, colorzXp, curtain, fox, karaoke, lifeguard, mushroom, okeiroXp, openclassroomsXp,
  queer, reading, ruby, salameche, sarahBernhardt, sorbonneXp, sun, threeWXp, tree, troll, uptooXp, wine,
} from './items';

// La carte, vue du dessus. Chaque région s'ouvre par un gardien, que l'on passe avec l'objet trouvé juste avant.
// Sol : T arbre, b buisson, X maison, ~ eau, . herbe, * fleurs, h hautes herbes, = chemin, P place, m boue
const GROUND = [
  'TTXXXTTTTTTTTTTTTTTTT',
  'T~X.X.~Tmmmmmm...TTTT',
  'T~*..*~TmmmmmmTTTTTTT',
  'T~~~=~~XXXT=TTTTTTTTT',
  'TTT.=..X.X.=.....TmmT',
  'TTT.==============mmT',
  'TTT.........=hhhhTmmT',
  'TTTTTTTTTTTT=TTTTTmmT',
  'T.......T...=**bTTmmT',
  'TXXX=========..bTTmmT',
  'TX.X=hhhT....XXXTTmmT',
  'T...=hhhT....X.XTTmmT',
  'TTTT=TTTT.......TTmmT',
  'T**.=....TTTTTTTTTmmT',
  'Th..=XXX.TTTTTTTTTT.T',
  'Thh.=X.X.TTTTTTTXXX.T',
  'T.P==...bTTTTTTTX.X.T',
  'T.**..~~.TTTTTTT*..*T',
  'TTTTTTTTTTTTTTTTTTTTT',
];

// Objets et gardiens, aux mêmes coordonnées. @ : départ ; une expérience est la porte d'une maison
const ITEMS = [
  '.....................',
  '...5..........M.u....',
  '.....................',
  '....L......G.........',
  '........4......q.....',
  '.................N...',
  '......k..............',
  '............C........',
  '......c..............',
  '........F............',
  '..2.......r..........',
  '......z.......3......',
  '....R........w.......',
  '.......a.............',
  '..s................A.',
  '......1..............',
  '..@..............6...',
  '.....................',
  '.....................',
];

const LEGEND: Record<string, Item[]> = {
  // Expériences, dans l'ordre du parcours
  '1': [sorbonneXp], '2': [threeWXp], '3': [uptooXp], '4': [openclassroomsXp], '5': [colorzXp], '6': [okeiroXp],
  // Intérêts
  s: [sun], a: [sarahBernhardt],
  // Caché dans les hautes herbes
  z: [salameche], c: [cheese], r: [reading], w: [wine], k: [karaoke], q: [queer], u: [ruby],
  // Gardiens : R rideau, F renard, C Deckard Cain, G troll, N nuage ; ennemis : L maître nageur, M champignon, A Andariel
  R: [curtain], F: [fox], C: [cain], G: [troll], N: [cloud], L: [lifeguard], M: [mushroom], A: [andariel],
};

const ROAD = '=P';
const SIDES: [string, number, number][] = [['t', -1, 0], ['r', 0, 1], ['b', 1, 0], ['l', 0, -1]];

// Tuile d'un chemin ou d'une place : ses bras partent vers les chemins voisins
function roadTile(row: number, col: number) {
  const sides = SIDES.filter(([, dr, dc]) => ROAD.includes(GROUND[row + dr]?.[col + dc] ?? '')).map(([side]) => side);
  return `${GROUND[row][col] === 'P' ? 'place' : 'road'}-${sides.join('')}`;
}

function cell(ground: string, mark: string, row: number, col: number): Cell {
  const id = row * GROUND[0].length + col;
  const items = LEGEND[mark] ?? [];
  switch (ground) {
    case 'T':
      return { id, path: 'grass', items: [tree] };
    case 'b':
      return { id, path: 'grass', items: [bush] };
    case 'X':
      // sous une maison, dessinée depuis sa porte
      return { id, path: 'grass' };
    case 'h':
      return { id, path: 'tallgrass', isWay: true, items };
    case '*':
      return { id, path: 'flowers', isWay: true, items };
    case '~':
      return { id, path: 'water' };
    case 'm':
      return { id, path: 'mud', isWay: true, items };
    case '=':
    case 'P':
      return { id, path: roadTile(row, col), isWay: true, items };
    default:
      return { id, path: 'grass', isWay: true, items };
  }
}

export const board: Cell[][] = GROUND.map((line, row) => [...line].map((ground, col) => cell(ground, ITEMS[row][col], row, col)));

export const START: Position = (() => {
  const row = ITEMS.findIndex((line) => line.includes('@'));
  return { row, col: ITEMS[row].indexOf('@') };
})();

export const COLUMNS = GROUND[0].length;
