import { board } from '@/datas/board';
import { GameState, SavedGame } from './game';

// La partie est gardée dans ce navigateur : on reprend là où on s'était arrêté
const KEY = 'wwwetzel-journey:v3';

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((v) => typeof v === 'string');

export function loadGame(): SavedGame | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    const { position, found, defeated } = saved ?? {};
    if (!board[position?.row]?.[position?.col]?.isWay) return null;
    if (!isStringArray(found)) return null;
    if (typeof defeated !== 'object' || !defeated) return null;
    return { position, found, defeated };
  } catch {
    return null;
  }
}

export function saveGame({ position, found, defeated }: GameState) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ position, found, defeated }));
  } catch {
    // Stockage indisponible (navigation privée…) : on joue sans sauvegarde
  }
}
