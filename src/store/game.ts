import { board, START } from '@/datas/board';
import crossed from '@/datas/crossed';
import { experiences, interests } from '@/datas/items';
import { Direction, Item, Position } from '@/types/game';

export { START };

const STEPS: Record<Direction, [number, number]> = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

export const COLLECTIBLES_COUNT = experiences.length + interests.length;

// joy : un objet, une expérience, un gardien passé ; fear : face à un ennemi
export type Mood = 'calm' | 'joy' | 'fear';

// Après quelques pas sans événement, l'humeur redevient calme
const MOOD_STEPS = 8;

// Mana : la force de vaincre un ennemi. Chaque expérience l'agrandit et la recharge,
// et elle revient en marchant (jamais de blocage)
const MANA_STEPS = 6;
export const SPELL_COST = 3;
export const maxMana = (found: string[]) => 3 + xpCount(found) * 2;

export interface GameState {
  position: Position;
  // ids des expériences et des objets ramassés
  found: string[];
  // gardien ou ennemi passé -> sa nouvelle image ('' : il est parti)
  defeated: Record<string, string>;
  mood: Mood;
  moodSteps: number;
  // key change à chaque message, même si le texte est identique
  message: { text: string; key: number } | null;
  // combien de fois chaque intérêt a servi : ses répliques alternent
  uses: Record<string, number>;
  mana: number;
  manaSteps: number;
  // gardien contre lequel on vient de buter : on ne répète pas son texte à chaque pas
  bumped: string | null;
}

export type SavedGame = Pick<GameState, 'position' | 'found' | 'defeated' | 'mana'>;

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
    uses: {},
    mana: maxMana([]),
    manaSteps: 0,
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

const isGuard = (item: Item) => item.type === 'danger' || item.type === 'guard';

const guardIn = (state: GameState, { row, col }: Position) =>
  board[row]?.[col]?.items?.find((item) => isGuard(item) && !(item.id! in state.defeated));

// Le gardien qui barre le chemin, juste à côté du personnage
export function guardNextTo(state: GameState) {
  for (const [dRow, dCol] of Object.values(STEPS)) {
    const guard = guardIn(state, { row: state.position.row + dRow, col: state.position.col + dCol });
    if (guard) return guard;
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

        // Un gardien barre le passage tant qu'on ne lui a pas offert le bon objet
        const guard = guardIn(state, position);
        if (guard) {
          if (state.bumped === guard.id) return state;
          return say({ ...state, bumped: guard.id! }, guard.text ?? guard.name, guard.type === 'danger' ? 'fear' : undefined);
        }

        const found = state.found;
        const regen = state.mana < maxMana(found) && state.manaSteps + 1 >= MANA_STEPS;
        const next: GameState = {
          ...state,
          position,
          bumped: null,
          moodSteps: state.moodSteps + 1,
          mood: state.moodSteps + 1 >= MOOD_STEPS ? 'calm' : state.mood,
          mana: regen ? state.mana + 1 : state.mana,
          manaSteps: regen ? 0 : state.manaSteps + 1,
        };

        // On ramasse en passant dessus
        const collectible = cell.items?.find((item) => isCollectible(item) && !found.includes(item.id!));
        if (collectible) {
          const nextFound = [...found, collectible.id!];
          if (collectible.type === 'xp') {
            return say(
              { ...next, found: nextFound, mana: maxMana(nextFound) },
              `${collectible.name}\n+1 XP · mana rechargée`,
              'joy',
            );
          }
          return say({ ...next, found: nextFound }, collectible.text ?? collectible.name, 'joy');
        }

        return next;
      }
      return state;
    }

    case 'use': {
      const item = interests.find((interest) => interest.id === action.id);
      if (!item || !state.found.includes(action.id)) return state;

      const guard = guardNextTo(state);
      if (!guard) {
        const count = state.uses[item.id!] ?? 0;
        const lines = item.uses ?? [`${item.name}. Qu'est-ce que je peux bien en faire ?`];
        return say({ ...state, uses: { ...state.uses, [item.id!]: count + 1 } }, lines[count % lines.length], 'joy');
      }

      const isEnemy = guard.type === 'danger';
      if (item.id !== guard.key) {
        const reaction = crossed[guard.id!]?.find((r) => r.id === item.id);
        return say(state, reaction?.text ?? guard.refuse ?? `${item.name} ? Ça ne marche pas.`, isEnemy ? 'fear' : undefined);
      }
      // Vaincre un ennemi demande de la mana ; un gardien amical cède au bon objet
      if (isEnemy && state.mana < SPELL_COST) {
        return say(state, `${item.name} vacille... Il me manque de la mana. Une nouvelle expérience me donnerait de la force.`, 'fear');
      }
      return say(
        {
          ...state,
          mana: isEnemy ? state.mana - SPELL_COST : state.mana,
          defeated: { ...state.defeated, [guard.id!]: guard.after ?? '' },
          bumped: null,
        },
        guard.solved ?? '',
        'joy',
      );
    }

    case 'restore':
      return { ...fresh(), ...action.saved };

    case 'restart':
      return fresh();
  }
}
