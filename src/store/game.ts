import { board } from '@/datas/board';
import crossed from '@/datas/crossed';
import { experiences, interests } from '@/datas/items';
import { Direction, Item, Position } from '@/types/game';

export const START: Position = { row: 10, col: 1 };

const STEPS: Record<Direction, [number, number]> = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

export const COLLECTIBLES_COUNT = experiences.length + interests.length;

export interface GameState {
  position: Position;
  // ids des expériences et des objets ramassés
  found: string[];
  // danger neutralisé -> sa nouvelle image
  defeated: Record<string, string>;
  // key change à chaque message, même si le texte est identique
  message: { text: string; key: number } | null;
}

export type GameAction =
  // Plusieurs directions : la première praticable l'emporte (on glisse le long des obstacles)
  | { type: 'move'; directions: Direction[] }
  | { type: 'use'; id: string };

export const initialState: GameState = {
  position: START,
  found: [],
  defeated: {},
  message: null,
};

const isCollectible = (item: Item) => item.type === 'xp' || item.type === 'interest';

function say(state: GameState, text: string): GameState {
  return { ...state, message: { text, key: (state.message?.key ?? 0) + 1 } };
}

function dangerAt(state: GameState, { row, col }: Position) {
  return board[row][col].items?.find((item) => item.type === 'danger' && !state.defeated[item.id!]);
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'move': {
      const position = action.directions
        .map((direction) => {
          const [dRow, dCol] = STEPS[direction];
          return { row: state.position.row + dRow, col: state.position.col + dCol };
        })
        .find(({ row, col }) => board[row]?.[col]?.isWay);
      if (!position) return state;

      const next = { ...state, position };
      const items = board[position.row][position.col].items ?? [];

      // On ramasse en passant dessus
      const collectible = items.find((item) => isCollectible(item) && !state.found.includes(item.id!));
      if (collectible) {
        const text = collectible.type === 'xp' ? `${collectible.name}\n+1 XP` : collectible.text ?? collectible.name;
        return say({ ...next, found: [...state.found, collectible.id!] }, text);
      }

      const danger = dangerAt(state, position);
      if (danger?.text) return say(next, danger.text);

      return next;
    }

    case 'use': {
      const item = interests.find((interest) => interest.id === action.id);
      if (!item || !state.found.includes(action.id)) return state;

      const danger = dangerAt(state, state.position);
      if (!danger) return say(state, `${item.name}. Qu'est-ce que je peux bien en faire ?`);

      const reaction = crossed[danger.id!]?.find((r) => r.id === item.id);
      if (reaction?.image) {
        return say({ ...state, defeated: { ...state.defeated, [danger.id!]: reaction.image } }, reaction.text);
      }
      return say(state, reaction?.text ?? `Je veux vraiment attaquer ${danger.name} avec ${item.name} ?`);
    }
  }
}
