'use client'

import { CSSProperties, useCallback, useEffect, useReducer } from 'react';
import { experiences, interests } from '@/datas/items';
import { COLLECTIBLES_COUNT, START, gameReducer, initialState } from '@/store/game';
import { useControls } from '@/store/controls';
import { Direction } from '@/types/game';
import World from './World';
import Inventory from './Inventory';

export default function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { position, found, defeated, message } = state;

  const move = useCallback((directions: Direction[]) => dispatch({ type: 'move', directions }), []);
  const activate = useCallback((id: string) => dispatch({ type: 'use', id }), []);
  const pointer = useControls(move);

  // Touches 1 à 8 : utiliser un objet du sac
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const interest = interests[Number(event.key) - 1];
      if (interest) activate(interest.id!);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activate]);

  const xpCount = experiences.filter((xp) => found.includes(xp.id!)).length;
  const isComplete = found.length === COLLECTIBLES_COUNT;
  const hasMoved = position.row !== START.row || position.col !== START.col;

  // Le halo s'agrandit à chaque expérience ; à la fin, la nuit se lève
  const halo = isComplete ? '150vmax' : `calc(var(--cell) * ${1.25 + xpCount * 0.125})`;

  return (
    <main
      className="game"
      style={{ '--row': position.row, '--col': position.col, '--halo': halo } as CSSProperties}
      {...pointer}
    >
      <World found={found} defeated={defeated} />
      <div className="halo" />
      <img src="/garance.svg" alt="Garance" draggable={false} className="character" />

      <header className="fixed inset-x-0 top-0 z-30 bg-linear-to-b from-black via-black/70 to-transparent px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-10 text-center">
        <h1 className="text-sm tracking-widest text-white/70">wwwetzel journey</h1>
        <p className={`mt-1 text-xs text-white/40 transition-opacity duration-700 ${hasMoved && !isComplete ? 'opacity-0' : 'opacity-100'}`}>
          {isComplete ? (
            'Tout est éclairé. Merci pour la balade.'
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
            className="message"
            style={{ '--duration': `${Math.max(4000, message.text.length * 70)}ms` } as CSSProperties}
          >
            {message.text}
          </span>
        )}
      </p>

      <Inventory found={found} onUse={activate} />
    </main>
  );
}
