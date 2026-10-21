import { describe, expect, it } from 'vitest';
import { board } from '@/datas/board';
import { experiences, interests } from '@/datas/items';
import { Direction, Item, Position } from '@/types/game';
import { GameState, gameReducer, initialState, isComplete, maxMana } from './game';

const STEPS: [Direction, number, number][] = [['up', -1, 0], ['down', 1, 0], ['left', 0, -1], ['right', 0, 1]];
const isGuard = (item: Item) => item.type === 'danger' || item.type === 'guard';

function cellOf(id: string): Position {
  for (const [row, cells] of board.entries()) {
    const col = cells.findIndex((cell) => cell.items?.some((item) => item.id === id));
    if (col !== -1) return { row, col };
  }
  throw new Error(`${id} absent de la carte`);
}

// Une case libre à côté d'un gardien, et la direction pour aller vers lui
function besideGuard(id: string): { position: Position; toward: Direction } {
  const guard = cellOf(id);
  for (const [direction, dRow, dCol] of STEPS) {
    const position = { row: guard.row - dRow, col: guard.col - dCol };
    const cell = board[position.row]?.[position.col];
    if (cell?.isWay && !cell.items?.some(isGuard)) return { position, toward: direction };
  }
  throw new Error(`pas de case libre à côté de ${id}`);
}

const at = (state: Partial<GameState>): GameState => ({ ...initialState, ...state });

describe('la carte', () => {
  it('se termine : chaque gardien finit par céder et les six étoiles sont trouvables', () => {
    const keyOf = new Map<string, string>();
    board.flat().forEach((cell) => cell.items?.filter(isGuard).forEach((item) => keyOf.set(`${item.id}`, item.key!)));
    const have = new Set<string>();
    const opened = new Set<string>();
    let progress = true;
    while (progress) {
      progress = false;
      const seen = new Set([`${initialState.position.row},${initialState.position.col}`]);
      const queue = [initialState.position];
      while (queue.length) {
        const { row, col } = queue.shift()!;
        board[row][col].items?.forEach((item) => {
          if (item.id && !isGuard(item) && !have.has(item.id)) {
            have.add(item.id);
            progress = true;
          }
        });
        for (const [, dRow, dCol] of STEPS) {
          const next = { row: row + dRow, col: col + dCol };
          const cell = board[next.row]?.[next.col];
          const swim = cell?.path === 'water' && opened.has('lifeguard');
          if (!cell || (!cell.isWay && !swim) || seen.has(`${next.row},${next.col}`)) continue;
          const guard = cell.items?.find(isGuard);
          if (guard && !opened.has(guard.id!)) {
            if (have.has(guard.key!)) {
              opened.add(guard.id!);
              progress = true;
            }
            continue;
          }
          seen.add(`${next.row},${next.col}`);
          queue.push(next);
        }
      }
    }
    expect([...keyOf.keys()].filter((id) => !opened.has(id))).toEqual([]);
    expect(experiences.filter((xp) => !have.has(xp.id!))).toEqual([]);
    expect(interests.filter((item) => !have.has(item.id!))).toEqual([]);
  });
});

describe('les gardiens', () => {
  const { position, toward } = besideGuard('curtain');

  it('barrent la route', () => {
    const state = gameReducer(at({ position }), { type: 'move', directions: [toward] });
    expect(state.position).toEqual(position);
    expect(state.message?.text).toMatch(/rideau/);
  });

  it("laissent essayer les mauvais objets gratuitement, et cèdent au bon pour 1 mana", () => {
    const start = at({ position, found: ['sun', 'sarahBernhardt'], mana: 3 });
    const wrong = gameReducer(start, { type: 'use', id: 'sun' });
    expect(wrong.mana).toBe(3);
    expect(wrong.defeated).toEqual({});
    const right = gameReducer(start, { type: 'use', id: 'sarahBernhardt' });
    expect(right.mana).toBe(2);
    expect('curtain' in right.defeated).toBe(true);
  });
});

describe('les ennemis', () => {
  const { position } = besideGuard('mushroom');

  it('demandent 3 mana, et le disent quand elle manque', () => {
    const poor = gameReducer(at({ position, found: ['sun'], mana: 2 }), { type: 'use', id: 'sun' });
    expect(poor.message?.error).toBe(true);
    expect(poor.defeated).toEqual({});
    const rich = gameReducer(at({ position, found: ['sun'], mana: 3 }), { type: 'use', id: 'sun' });
    expect(rich.mana).toBe(0);
    expect(rich.defeated.mushroom).toBe('/dangers/mushroomXsun.svg');
  });
});

describe('les étoiles', () => {
  it("rechargent la mana en entrant dans une maison", () => {
    const door = cellOf('sorbonne');
    const below = { row: door.row + 1, col: door.col };
    const state = gameReducer(at({ position: below, mana: 0 }), { type: 'move', directions: ['up'] });
    expect(state.found).toContain('sorbonne');
    expect(state.mana).toBe(maxMana(state.found));
    expect(state.message?.text).toBe('Sorbonne Nouvelle · Master de lettres · 2015');
  });

  it('font la fin, et seulement elles', () => {
    expect(isComplete(experiences.map((xp) => xp.id!))).toBe(true);
    expect(isComplete([...experiences.slice(1).map((xp) => xp.id!), ...interests.map((item) => item.id!)])).toBe(false);
  });
});
