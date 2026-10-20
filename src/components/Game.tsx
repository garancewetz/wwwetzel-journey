'use client'

import { CSSProperties, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { experiences, interests } from '@/datas/items';
import { COLLECTIBLES_COUNT, START, guardNextTo, gameReducer, haloRadius, initialState, maxMana, xpCount as countXp } from '@/store/game';
import { useControls } from '@/store/controls';
import { loadGame, saveGame } from '@/store/save';
import { Direction } from '@/types/game';
import World from './World';
import Inventory from './Inventory';

// Teinte du halo selon l'humeur : chaude quand ça va, froide face à un danger
const MOOD_COLORS = {
  calm: 'rgb(0 0 0 / 0)',
  joy: 'rgb(255 190 110 / 0.14)',
  fear: 'rgb(90 120 255 / 0.16)',
};

export default function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { position, found, defeated, mood, message, mana } = state;
  // Les transitions attendent la reprise de la partie, pour ne pas voir la carte défiler au chargement
  const [ready, setReady] = useState(false);

  const move = useCallback((directions: Direction[]) => dispatch({ type: 'move', directions }), []);
  const activate = useCallback((id: string) => dispatch({ type: 'use', id }), []);
  const joystick = useRef<HTMLDivElement>(null);
  const pointer = useControls(move, joystick);

  const settle = () => window.setTimeout(() => setReady(true), 50);

  useEffect(() => {
    const saved = loadGame();
    if (saved) dispatch({ type: 'restore', saved });
    settle();
  }, []);

  useEffect(() => {
    if (ready) saveGame(state);
  }, [ready, state]);

  const restart = () => {
    setReady(false);
    dispatch({ type: 'restart' });
    settle();
  };

  // Touches 1 à 8 : utiliser un objet du sac
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const interest = interests[Number(event.key) - 1];
      if (interest) activate(interest.id!);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activate]);

  const xpCount = countXp(found);
  const isComplete = found.length === COLLECTIBLES_COUNT;
  const hasMoved = position.row !== START.row || position.col !== START.col;

  // Comment se servir du sac : au premier objet, puis chaque fois qu'un ennemi barre la route
  const hasItems = interests.some((interest) => found.includes(interest.id!));
  const hasUsed = Object.keys(state.uses).length > 0 || Object.keys(defeated).length > 0;
  const facing = guardNextTo(state);
  const hint = !hasItems ? null : facing ? 'facing' : hasUsed ? null : 'first';

  return (
    <main
      className="game"
      data-ready={ready}
      style={
        {
          '--row': position.row,
          '--col': position.col,
          '--halo': haloRadius(found),
          '--mood': MOOD_COLORS[mood],
        } as CSSProperties
      }
      {...pointer}
    >
      <World found={found} defeated={defeated} />
      <div className="mood" />
      <div className="halo" />
      <img src="/garance.svg" alt="Garance" draggable={false} className="character" />

      {/* XP et mana : apparaissent au premier objet trouvé */}
      <dl
        className={`fixed top-[max(1rem,env(safe-area-inset-top))] left-4 z-40 space-y-2 text-[11px] tracking-widest text-white/70 transition-opacity duration-700 ${found.length ? 'opacity-100' : 'opacity-0'}`}
      >
        <Stat label="XP" value={xpCount} max={experiences.length} color="bg-amber-200/80" />
        <Stat label="Mana" value={mana} max={maxMana(found)} color="bg-sky-400/80" />
      </dl>

      <header className="fixed inset-x-0 top-0 z-30 px-4 pt-[max(1rem,env(safe-area-inset-top))] text-center">
        <h1 className="text-sm tracking-widest text-white/70">wwwetzel journey</h1>
        <p className={`mt-1 text-xs text-white/40 transition-opacity duration-700 ${hasMoved && !isComplete ? 'opacity-0' : 'opacity-100'}`}>
          {isComplete ? (
            <>
              Merci pour la balade.{' '}
              <button type="button" onClick={restart} className="underline decoration-white/20 underline-offset-4 hover:text-white/70">
                Recommencer
              </button>
            </>
          ) : (
            <>
              <span className="pointer-coarse:hidden">Les flèches pour marcher</span>
              <span className="hidden pointer-coarse:inline">Garde le doigt appuyé et glisse pour marcher</span>
            </>
          )}
        </p>
      </header>

      <p aria-live="polite" className="fixed inset-x-0 top-[18%] z-30 mx-auto max-w-md px-6 text-center text-sm leading-relaxed text-white/85 [text-shadow:0_1px_3px_#000]">
        {message && (
          <span
            key={message.key}
            className="message whitespace-pre-line"
            style={{ '--duration': `${Math.max(4000, message.text.length * 70)}ms` } as CSSProperties}
          >
            {message.text}
          </span>
        )}
      </p>

      {/* Sur écran tactile seulement : il vient se placer sous le doigt */}
      <div ref={joystick} className="joystick" aria-hidden>
        <div className="joystick-knob" />
      </div>

      <Inventory found={found} onUse={activate} hint={hint} />
    </main>
  );
}

function Stat({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div>
      <dt className="inline uppercase">{label}</dt> <dd className="inline">{value}/{max}</dd>
      <div className="mt-1 h-0.5 w-16 bg-white/15" aria-hidden>
        <div className={`h-full ${color} transition-[width] duration-700`} style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  );
}
