import { Cell, Item, Position } from '@/types/game';
import {
  andariel, bush, cain, cheese, colorzXp, curtain, fox, karaoke, lifeguard, mushroom, okeiroXp, openclassroomsXp,
  queer, reading, ruby, salameche, sarahBernhardt, sorbonneXp, sun, threeWXp, tree, uptooXp, wine,
} from './items';

// La carte, vue du dessus. Chaque région s'ouvre par un gardien ; son objet a été ramassé plus tôt, parfois bien plus tôt.
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
  'T.P==....TTTTTTTX.X.T',
  'T.**..~~.TTTTTTT*..*T',
  'TTTTTTTTTTTTTTTTTTTTT',
];

// Objets et gardiens, aux mêmes coordonnées. @ : départ ; une expérience est la porte d'une maison
const ITEMS = [
  '.....................',
  '...5.q........M.u....',
  '.....................',
  '....L................',
  '........4............',
  '.....................',
  '.....................',
  '............C........',
  '.s...................',
  '........F............',
  '..2..................',
  '.r....z.......3......',
  '....R....k.....w.....',
  '.....................',
  '...................A.',
  '.c....1..............',
  '..@..............6...',
  '........a............',
  '.....................',
];

const LEGEND: Record<string, Item[]> = {
  // Expériences, dans l'ordre du parcours
  '1': [sorbonneXp], '2': [threeWXp], '3': [uptooXp], '4': [openclassroomsXp], '5': [colorzXp], '6': [okeiroXp],
  // Intérêts
  s: [sun], a: [sarahBernhardt],
  // Caché dans les hautes herbes
  z: [salameche], c: [cheese], r: [reading], w: [wine], k: [karaoke], q: [queer], u: [ruby],
  // Gardiens : R rideau, F renard, C Deckard Cain ; ennemis : L maître nageur, M champignon, A Andariel
  R: [curtain], F: [fox], C: [cain], L: [lifeguard], M: [mushroom], A: [andariel],
};

// Une forêt tout autour, plus large que le plus grand halo : la lumière tombe toujours sur un rond entier
const PAD = 5;
const surround = (lines: string[], fill: string) => {
  const edge = fill.repeat(lines[0].length + PAD * 2);
  return [
    ...Array<string>(PAD).fill(edge),
    ...lines.map((line) => fill.repeat(PAD) + line + fill.repeat(PAD)),
    ...Array<string>(PAD).fill(edge),
  ];
};
const ground = surround(GROUND, 'T');
const marks = surround(ITEMS, '.');

const ROAD = '=P';
const SIDES: [string, number, number][] = [['t', -1, 0], ['r', 0, 1], ['b', 1, 0], ['l', 0, -1]];

// Tuile d'un chemin ou d'une place : ses bras partent vers les chemins voisins
function roadTile(row: number, col: number) {
  const sides = SIDES.filter(([, dr, dc]) => ROAD.includes(ground[row + dr]?.[col + dc] ?? '')).map(([side]) => side);
  return `${ground[row][col] === 'P' ? 'place' : 'road'}-${sides.join('')}`;
}

function cell(kind: string, mark: string, row: number, col: number): Cell {
  const id = row * ground[0].length + col;
  const items = LEGEND[mark] ?? [];
  switch (kind) {
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

export const board: Cell[][] = ground.map((line, row) => [...line].map((kind, col) => cell(kind, marks[row][col], row, col)));

export const START: Position = (() => {
  const row = marks.findIndex((line) => line.includes('@'));
  return { row, col: marks[row].indexOf('@') };
})();

export const COLUMNS = ground[0].length;

// Les régions, comme les panneaux de lieu de Pokémon : [nom, première ligne, dernière ligne, première colonne, dernière colonne]
const REGIONS: [string, number, number, number, number][] = [
  ['Prairie', 13, 17, 1, 8],
  ['Bosquet', 8, 11, 1, 7],
  ['Clairière', 8, 12, 9, 15],
  ['Carrefour', 4, 6, 3, 16],
  ['Plage', 1, 2, 1, 6],
  ['Passage du nord', 1, 2, 8, 16],
  ["Repaire d'Andariel", 4, 14, 18, 19],
  ['Sanctuaire', 15, 17, 16, 19],
];

// Le nom du lieu ; null sur les cases de passage (gardiens, portes), où l'on garde le précédent
export function regionAt({ row, col }: Position) {
  const found = REGIONS.find(([, r0, r1, c0, c1]) => row - PAD >= r0 && row - PAD <= r1 && col - PAD >= c0 && col - PAD <= c1);
  return found?.[0] ?? null;
}
