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
import { board, regionAt } from '@/datas/board';

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
  // Le panneau du lieu s'affiche quand on change de région
  const region = regionAt(position);
  const [place, setPlace] = useState<{ name: string; key: number } | null>(null);
  useEffect(() => {
    if (region) setPlace((last) => (last?.name === region ? last : { name: region, key: (last?.key ?? 0) + 1 }));
  }, [region]);

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
        {/* Le but du jeu : une étoile par maison */}
        <Stars count={xpCount} total={experiences.length} />
        <p className={`mt-1 text-xs text-white/50 transition-opacity duration-700 ${hasMoved ? 'opacity-0' : 'opacity-100'}`}>
          Trouve les six étoiles ·{' '}
          <span className="pointer-coarse:hidden">les flèches pour marcher</span>
          <span className="hidden pointer-coarse:inline">garde le doigt appuyé et glisse</span>
        </p>
      </header>

      {/* Le nom du lieu, comme les panneaux de Pokémon */}
      {place && (
        <div key={place.key} className="place-sign dialog fixed top-[max(1rem,env(safe-area-inset-top))] left-4 z-40 !w-auto px-3 py-1.5 text-sm">
          {place.name}
        </div>
      )}

      <div aria-live="polite" className="fixed inset-x-0 top-[max(5.25rem,calc(env(safe-area-inset-top)+4.5rem))] z-30 mx-auto max-w-md px-4 text-base leading-snug sm:text-lg">
        {isComplete ? (
          // La fin reste affichée
          <div className="dialog">
            <p>Les six étoiles brillent ! Le parcours est complet.</p>
            <p className="mt-1">Merci pour la balade.</p>
            <button type="button" onClick={restart} className="mt-3 rounded border-2 border-[#183018] px-3 py-1 hover:bg-[#183018] hover:text-[#f8f8f0]">
              Rejouer
            </button>
          </div>
        ) : (
          <Dialog message={message} />
        )}
      </div>

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

// Six étoiles en pixels : pleines quand on a trouvé la maison
const STAR = [
  '....#....',
  '...###...',
  '...###...',
  '#########',
  '.#######.',
  '..#####..',
  '..##.##..',
  '.##...##.',
  '.#.....#.',
];

function Stars({ count, total }: { count: number; total: number }) {
  return (
    <div className="mt-1.5 flex justify-center gap-2" aria-label={`${count} étoiles sur ${total}`}>
      {Array.from({ length: total }, (_, index) => (
        <svg key={index} viewBox="0 0 9 9" className="size-[18px] sm:size-[27px]" shapeRendering="crispEdges" aria-hidden>
          {STAR.flatMap((line, y) =>
            [...line].map((pixel, x) =>
              pixel === '#' ? (
                <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={index < count ? (y < 3 ? '#fff4a0' : '#f8d030') : '#3c3c44'} />
              ) : null,
            ),
          )}
        </svg>
      ))}
    </div>
  );
}
