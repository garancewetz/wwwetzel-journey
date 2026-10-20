'use client'

import { CSSProperties, useCallback, useEffect, useReducer, useRef } from 'react';
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
  const joystick = useRef<HTMLDivElement>(null);
  const pointer = useControls(move, joystick);

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

      {/* Les points d'expérience : apparaissent à la première expérience trouvée */}
      <div
        aria-label={`${xpCount} XP sur ${experiences.length}`}
        className={`fixed top-[max(1rem,env(safe-area-inset-top))] left-4 z-40 text-[11px] tracking-widest text-white/70 transition-opacity duration-700 ${xpCount ? 'opacity-100' : 'opacity-0'}`}
      >
        XP {xpCount}/{experiences.length}
        <div className="mt-1 h-0.5 w-16 bg-white/15">
          <div className="h-full bg-amber-200/80 transition-[width] duration-700" style={{ width: `${(xpCount / experiences.length) * 100}%` }} />
        </div>
      </div>

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

      <Inventory found={found} onUse={activate} />
    </main>
  );
}
