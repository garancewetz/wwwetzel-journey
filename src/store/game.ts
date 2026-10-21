import { board, regionAt, START } from '@/datas/board';
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

// La fin : les six étoiles, une par maison (les objets et Salamèche se trouvent en chemin)
export const isComplete = (found: string[]) => experiences.every((item) => found.includes(item.id!));

// joy : un objet, une expérience, un gardien passé ; fear : face à un ennemi
export type Mood = 'calm' | 'joy' | 'fear';

// Après quelques pas sans événement, l'humeur redevient calme
const MOOD_STEPS = 8;

// Mana : un objet utilisé en coûte 1, vaincre un ennemi 3 ; essayer un objet qui ne marche pas face à un gardien
// est gratuit (on peut tous les essayer). Chaque expérience l'agrandit et la recharge,
// et elle revient en marchant (jamais de blocage)
const MANA_STEPS = 6;
const USE_COST = 1;
export const SPELL_COST = 3;
const NO_MANA = 'Pas assez de mana.\nElle revient en marchant, ou avec une nouvelle expérience.';
export const maxMana = (found: string[]) => 3 + xpCount(found) * 2;

export interface GameState {
  position: Position;
  // dernière direction demandée : le personnage regarde par là, même quand il bute
  facing: Direction;
  // case précédente : le compagnon y marche, un pas derrière
  trail: Position;
  // ids des expériences et des objets ramassés
  found: string[];
  // gardien ou ennemi passé -> sa nouvelle image ('' : il est parti)
  defeated: Record<string, string>;
  mood: Mood;
  moodSteps: number;
  // key change à chaque message, même si le texte est identique ; error : le message rouge de WoW
  message: { text: string; key: number; error?: boolean } | null;
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

const isCollectible = (item: Item) => item.type === 'xp' || item.type === 'interest' || item.type === 'companion';

export const xpCount = (found: string[]) => experiences.filter((xp) => found.includes(xp.id!)).length;

// La lumière gagnée, de 0 au départ à 1 avec les six étoiles
export const lightProgress = (found: string[]) => xpCount(found) / experiences.length;


function fresh(): GameState {
  return {
    position: START,
    facing: 'down',
    trail: START,
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

function say(state: GameState, text: string, mood?: Mood, error?: boolean): GameState {
  return {
    ...state,
    message: { text, key: (state.message?.key ?? 0) + 1, error },
    ...(mood && { mood, moodSteps: 0 }),
  };
}

const FEMININE = ['Prairie', 'Clairière', 'Plage'];

// Où se trouve la dernière maison qu'il reste à visiter
function lastStarRegion(found: string[]) {
  const missing = experiences.find((xp) => !found.includes(xp.id!));
  for (const [row, cells] of board.entries()) {
    const col = cells.findIndex((cell) => cell.items?.some((item) => item.id === missing?.id));
    const region = col !== -1 ? regionAt({ row, col }) : null;
    if (region) return `${/^[AEIOUÉ]/.test(region) ? "l'" : FEMININE.includes(region) ? 'la ' : 'le '}${region}`;
  }
  return 'le bout du chemin';
}

// À la reprise, le compagnon se pose sur une case voisine (de préférence derrière), pas sous le personnage
function besideOf(position: Position): Position {
  for (const direction of ['down', 'left', 'right', 'up'] as Direction[]) {
    const [dRow, dCol] = STEPS[direction];
    const near = { row: position.row + dRow, col: position.col + dCol };
    const cell = board[near.row]?.[near.col];
    if (cell?.isWay && !cell.items?.some((item) => item.type === 'danger' || item.type === 'guard')) return near;
  }
  return position;
}

export const canSwim = (state: GameState) => 'lifeguard' in state.defeated;

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
      const facing = action.directions[0];
      if (facing !== state.facing) state = { ...state, facing };
      for (const direction of action.directions) {
        const [dRow, dCol] = STEPS[direction];
        const position = { row: state.position.row + dRow, col: state.position.col + dCol };
        const cell = board[position.row]?.[position.col];
        // Comme avec Surf : une fois que le maître nageur nous a appris, on nage
        const swims = cell?.path === 'water' && canSwim(state);
        if (!cell?.isWay && !swims) continue;

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
          trail: state.position,
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
            const stars = xpCount(nextFound);
            const left = experiences.length - stars;
            const end = left === 1 ? `\nPlus qu'une étoile... elle brille quelque part vers ${lastStarRegion(nextFound)}.` : '';
            return say(
              { ...next, found: nextFound, mana: maxMana(nextFound) },
              `Ding ! Une étoile dans la maison ! ★ ${stars}/${experiences.length}\n${collectible.name}\n+1 XP · mana rechargée${end}`,
              'joy',
            );
          }
          return say({ ...next, found: nextFound }, collectible.text ?? collectible.name, 'joy');
        }

        // La première brasse
        if (swims && !state.uses.swim) {
          return say({ ...next, uses: { ...next.uses, swim: 1 } }, 'Je nage ! Comme avec Surf, en moins rapide.', 'joy');
        }
        return next;
      }
      return state;
    }

    case 'use': {
      const item = interests.find((interest) => interest.id === action.id);
      if (!item || !state.found.includes(action.id)) return state;

      const guard = guardNextTo(state);
      const isEnemy = guard?.type === 'danger';
      const wins = guard !== undefined && item.id === guard.key;
      // Utiliser un objet coûte 1 mana, vaincre un ennemi 3 ; un mauvais essai face à un gardien ne coûte rien
      const cost = wins ? (isEnemy ? SPELL_COST : USE_COST) : guard ? 0 : USE_COST;
      if (state.mana < cost) return say(state, NO_MANA, 'fear', true);
      state = { ...state, mana: state.mana - cost };

      if (!guard) {
        const count = state.uses[item.id!] ?? 0;
        const lines = item.uses ?? [`${item.name}. Qu'est-ce que je peux bien en faire ?`];
        return say({ ...state, uses: { ...state.uses, [item.id!]: count + 1 } }, lines[count % lines.length], 'joy');
      }

      if (!wins) {
        const reaction = crossed[guard.id!]?.find((r) => r.id === item.id);
        return say(state, reaction?.text ?? guard.refuse ?? `${item.name} ? Ça ne marche pas.`, isEnemy ? 'fear' : undefined);
      }
      return say(
        {
          ...state,
          defeated: { ...state.defeated, [guard.id!]: guard.after ?? '' },
          bumped: null,
        },
        guard.solved ?? '',
        'joy',
      );
    }

    case 'restore':
      return { ...fresh(), ...action.saved, trail: besideOf(action.saved.position) };

    case 'restart':
      return fresh();
  }
}
