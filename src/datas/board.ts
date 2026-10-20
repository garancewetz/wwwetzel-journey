import { Cell, Item, Position } from '@/types/game';
import {
  andariel, cain, cheese, cloud, colorzXp, curtain, fox, karaoke, lifeguard, mushroom, okeiroXp, openclassroomsXp,
  queer, reading, ruby, sarahBernhardt, sorbonneXp, sun, surpriseTree, threeWXp, tree, troll, uptooXp, wine,
} from './items';

// La carte, vue du dessus. Chaque région s'ouvre par un gardien, que l'on passe avec l'objet trouvé juste avant.
// Sol : T arbre, ~ eau, . herbe, = chemin, P place, m boue
const GROUND = [
  'TTTTTTTTTTTTTTTTTTTTT',
  'T~....~Tmmmmmm...TTTT',
  'T~....~TmmmmmmTTTTTTT',
  'T~~~=~~TTTT=TTTTTTTTT',
  'TTT.=......=.....TmmT',
  'TTT.==============mmT',
  'TTT.........=....TmmT',
  'TTTTTTTTTTTT=TTTTTmmT',
  'T.......T...=.TTTTmmT',
  'T...=========..TTTmmT',
  'T...=...T.......TTmmT',
  'T...=.T.T.......TTmmT',
  'TTTT=TTTT.......TTmmT',
  'T...=....TTTTTTTTTmmT',
  'T...=....TTTTTTTTT.TT',
  'T...=....TTTTTTTT.=.T',
  'T.P==...TTTTTTTTT.P.T',
  'T.....~~.TTTTTTT....T',
  'TTTTTTTTTTTTTTTTTTTTT',
];

// Objets et gardiens, aux mêmes coordonnées. @ : départ
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
  '..............3......',
  '....R........w.......',
  '.......a.............',
  '..s...............A..',
  '......1..............',
  '..@...............6..',
  '.....................',
  '.....................',
];

const LEGEND: Record<string, Item[]> = {
  // Expériences, dans l'ordre du parcours
  '1': [sorbonneXp], '2': [threeWXp], '3': [uptooXp], '4': [openclassroomsXp], '5': [colorzXp], '6': [okeiroXp],
  // Intérêts
  s: [sun], a: [sarahBernhardt, surpriseTree], c: [cheese], r: [reading], w: [wine], k: [karaoke], q: [queer], u: [ruby],
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
