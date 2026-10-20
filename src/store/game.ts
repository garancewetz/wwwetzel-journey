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

// joy : un objet, une expérience, un danger vaincu ; fear : face à un danger
export type Mood = 'calm' | 'joy' | 'fear';

// Après quelques pas sans événement, l'humeur redevient calme
const MOOD_STEPS = 8;

export interface GameState {
  position: Position;
  // ids des expériences et des objets ramassés
  found: string[];
  // danger neutralisé -> sa nouvelle image ('' : il est parti)
  defeated: Record<string, string>;
  mood: Mood;
  moodSteps: number;
  // key change à chaque message, même si le texte est identique
  message: { text: string; key: number } | null;
  // danger contre lequel on vient de buter : on ne répète pas son texte à chaque pas
  bumped: string | null;
}

export type SavedGame = Pick<GameState, 'position' | 'found' | 'defeated'>;

export type GameAction =
  // Plusieurs directions : la première praticable l'emporte (on glisse le long des obstacles)
  | { type: 'move'; directions: Direction[] }
  | { type: 'use'; id: string }
  | { type: 'restore'; saved: SavedGame }
  | { type: 'restart' };

const isCollectible = (item: Item) => item.type === 'xp' || item.type === 'interest';

export const xpCount = (found: string[]) => experiences.filter((xp) => found.includes(xp.id!)).length;

// Rayon du halo, en cases : il grandit un peu à chaque expérience
export const haloRadius = (found: string[]) => 1.25 + xpCount(found) * 0.125;


function fresh(): GameState {
  return {
    position: START,
    found: [],
    defeated: {},
    mood: 'calm',
    moodSteps: 0,
    message: null,
    bumped: null,
  };
}

export const initialState = fresh();

function say(state: GameState, text: string, mood?: Mood): GameState {
  return {
    ...state,
    message: { text, key: (state.message?.key ?? 0) + 1 },
    ...(mood && { mood, moodSteps: 0 }),
  };
}

const dangerIn = (state: GameState, { row, col }: Position) =>
  board[row]?.[col]?.items?.find((item) => item.type === 'danger' && !(item.id! in state.defeated));

// Le danger qui barre le chemin, juste à côté du personnage
function dangerNextTo(state: GameState) {
  for (const [dRow, dCol] of Object.values(STEPS)) {
    const danger = dangerIn(state, { row: state.position.row + dRow, col: state.position.col + dCol });
    if (danger) return danger;
  }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'move': {
      for (const direction of action.directions) {
        const [dRow, dCol] = STEPS[direction];
        const position = { row: state.position.row + dRow, col: state.position.col + dCol };
        const cell = board[position.row]?.[position.col];
        if (!cell?.isWay) continue;

        // Un danger barre le passage tant qu'on ne l'a pas neutralisé
        const danger = dangerIn(state, position);
        if (danger) {
          if (state.bumped === danger.id) return state;
          return say({ ...state, bumped: danger.id! }, danger.text ?? danger.name, 'fear');
        }

        const found = state.found;
        const next: GameState = {
          ...state,
          position,
          bumped: null,
          moodSteps: state.moodSteps + 1,
          mood: state.moodSteps + 1 >= MOOD_STEPS ? 'calm' : state.mood,
        };

        // On ramasse en passant dessus
        const collectible = cell.items?.find((item) => isCollectible(item) && !found.includes(item.id!));
        if (collectible) {
          const nextFound = [...found, collectible.id!];
          const text = collectible.type === 'xp' ? `${collectible.name}\n+1 XP` : collectible.text ?? collectible.name;
          return say({ ...next, found: nextFound }, text, 'joy');
        }

        return next;
      }
      return state;
    }

    case 'use': {
      const item = interests.find((interest) => interest.id === action.id);
      if (!item || !state.found.includes(action.id)) return state;

      const danger = dangerNextTo(state);
      if (!danger) return say(state, `${item.name}. Qu'est-ce que je peux bien en faire ?`);

      const reaction = crossed[danger.id!]?.find((r) => r.id === item.id);
      if (reaction && (reaction.image || reaction.defeats)) {
        return say(
          { ...state, defeated: { ...state.defeated, [danger.id!]: reaction.image ?? '' }, bumped: null },
          reaction.text,
          'joy',
        );
      }
      return say(state, reaction?.text ?? `Je veux vraiment attaquer ${danger.name} avec ${item.name} ?`, 'fear');
    }

    case 'restore':
      return { ...fresh(), ...action.saved };

    case 'restart':
      return fresh();
  }
}
