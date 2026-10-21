'use client'

import { CSSProperties, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { experiences, interests } from '@/datas/items';
import { START, guardNextTo, gameReducer, haloRadius, initialState, isComplete as complete, maxMana, xpCount as countXp } from '@/store/game';
import { STEP_MS, useControls } from '@/store/controls';
import { loadGame, saveGame } from '@/store/save';
import { Direction } from '@/types/game';
import World from './World';
import Inventory from './Inventory';
import Hero from './Hero';
import Companion from './Companion';
import Orb from './Orb';
import Dialog from './Dialog';
import { board } from '@/datas/board';

// Teinte du halo selon l'humeur : chaude quand ça va, froide face à un danger
const MOOD_COLORS = {
  calm: 'rgb(0 0 0 / 0)',
  joy: 'rgb(255 190 110 / 0.14)',
  fear: 'rgb(90 120 255 / 0.16)',
};

export default function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { position, facing, trail, found, defeated, mood, message, mana } = state;
  // Les transitions attendent la reprise de la partie, pour ne pas voir la carte défiler au chargement
  const [ready, setReady] = useState(false);

  const move = useCallback((directions: Direction[]) => dispatch({ type: 'move', directions }), []);
  const activate = useCallback((id: string) => dispatch({ type: 'use', id }), []);
  const joystick = useRef<HTMLDivElement>(null);
  const pointer = useControls(move, joystick);

  const settle = () => window.setTimeout(() => setReady(true), 50);

  // On marche tant que les pas s'enchaînent : le cycle de pas suit
  const [walking, setWalking] = useState(false);
  useEffect(() => {
    setWalking(true);
    const timer = window.setTimeout(() => setWalking(false), STEP_MS + 80);
    return () => window.clearTimeout(timer);
  }, [position]);
  const groundAt = (p: { row: number; col: number }) => board[p.row][p.col].path ?? 'grass';

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

  // « Ding ! » : la colonne dorée, seulement quand on gagne vraiment une expérience (pas à la reprise)
  const lastXp = useRef(xpCount);
  const [levelUp, setLevelUp] = useState(0);
  useEffect(() => {
    if (ready && xpCount > lastXp.current) setLevelUp((n) => n + 1);
    lastXp.current = xpCount;
  }, [xpCount, ready]);
  const isComplete = complete(found);
  const hasMoved = position.row !== START.row || position.col !== START.col;

  // Comment se servir du sac : au premier objet, puis chaque fois qu'un ennemi barre la route
  const hasItems = interests.some((interest) => found.includes(interest.id!));
  const hasUsed = Object.keys(state.uses).length > 0 || Object.keys(defeated).length > 0;
  const blocker = guardNextTo(state);
  const hint = !hasItems ? null : blocker ? 'facing' : hasUsed ? null : 'first';

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
      {found.includes('salameche') && (
        <Companion trail={trail} position={position} walking={walking} ground={groundAt(trail)} />
      )}
      {levelUp > 0 && <div key={levelUp} className="level-up" aria-hidden />}
      <Hero facing={facing} walking={walking} ground={groundAt(position)} />

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

      <p aria-live="polite" className="fixed inset-x-0 top-[max(4.5rem,calc(50%_-_var(--cell)*4.6))] z-30 mx-auto max-w-md px-4 text-base leading-snug sm:text-lg">
        <Dialog message={message} />
      </p>

      {/* Sur écran tactile seulement : il vient se placer sous le doigt */}
      <div ref={joystick} className="joystick" aria-hidden>
        <div className="joystick-knob" />
      </div>

      <Inventory
        found={found}
        onUse={activate}
        hint={hint}
        left={<Orb label="XP" value={xpCount} max={experiences.length} colors={['#f8e890', '#f0c030', '#b88010']} />}
        right={<Orb label="MANA" value={mana} max={maxMana(found)} colors={['#a8d0ff', '#4878f0', '#2848a8']} />}
      />
    </main>
  );
}
