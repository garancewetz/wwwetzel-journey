import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { Direction } from '@/types/game';

// Durée d'un pas : la transition CSS de la carte (--step) suit la même valeur
export const STEP_MS = 220;

const ARROWS: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

// Au doigt : en dessous de DEAD_ZONE on ne bouge pas ; la pastille du joystick reste dans RADIUS
const DEAD_ZONE = 14;
const RADIUS = 40;

type Step = (directions: Direction[]) => void;

// Le joystick est mis à jour directement dans le DOM : pas de rendu React à chaque mouvement du doigt
function showJoystick(element: HTMLElement | null, drag: { x: number; y: number } | null, dx = 0, dy = 0) {
  if (!element) return;
  element.dataset.active = drag ? 'true' : 'false';
  element.style.setProperty('--jx', drag ? `${drag.x}px` : '');
  element.style.setProperty('--jy', drag ? `${drag.y}px` : '');
  element.style.setProperty('--kx', `${dx}px`);
  element.style.setProperty('--ky', `${dy}px`);
}

function createControls(step: Step, joystick: { current: HTMLElement | null }) {
  const keys: Direction[] = [];
  let drag: { id: number; x: number; y: number; directions: Direction[] } | null = null;
  // Un appui bref entre deux pas n'est pas perdu
  let queued: Direction[] = [];
  let timer: number | undefined;

  const current = (): Direction[] => {
    if (drag?.directions.length) return drag.directions;
    return [...keys].reverse();
  };

  function tick() {
    const directions = current().length ? current() : queued;
    queued = [];
    if (!directions.length) {
      timer = undefined;
      return;
    }
    step(directions);
    timer = window.setTimeout(tick, STEP_MS);
  }

  function wake(directions: Direction[]) {
    if (timer === undefined) tick();
    else queued = directions;
  }

  const onKeyDown = (event: KeyboardEvent) => {
    const direction = ARROWS[event.key];
    if (!direction) return;
    event.preventDefault();
    if (keys.includes(direction)) return;
    keys.push(direction);
    wake([direction]);
  };

  const onKeyUp = (event: KeyboardEvent) => {
    const index = keys.indexOf(ARROWS[event.key]);
    if (index !== -1) keys.splice(index, 1);
  };

  const release = () => {
    keys.length = 0;
    drag = null;
    showJoystick(joystick.current, null);
  };

  const endDrag = (event: PointerEvent) => {
    if (drag?.id !== event.pointerId) return;
    drag = null;
    showJoystick(joystick.current, null);
  };

  return {
    attach() {
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);
      window.addEventListener('blur', release);
      return () => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
        window.removeEventListener('blur', release);
        window.clearTimeout(timer);
        timer = undefined;
      };
    },

    // Comme dans Hole.io : le joystick vient sous le doigt, on garde appuyé et on glisse
    pointer: {
      onPointerDown(event: PointerEvent) {
        if (drag || event.button > 0) return;
        if ((event.target as Element).closest('button')) return;
        drag = { id: event.pointerId, x: event.clientX, y: event.clientY, directions: [] };
        event.currentTarget.setPointerCapture(event.pointerId);
        showJoystick(joystick.current, drag);
      },
      onPointerMove(event: PointerEvent) {
        if (drag?.id !== event.pointerId) return;
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        const distance = Math.hypot(dx, dy);
        const clamp = Math.min(1, RADIUS / distance);
        showJoystick(joystick.current, drag, dx * clamp, dy * clamp);
        if (distance < DEAD_ZONE) {
          drag.directions = [];
          return;
        }
        const horizontal: Direction = dx > 0 ? 'right' : 'left';
        const vertical: Direction = dy > 0 ? 'down' : 'up';
        const [main, minor] = Math.abs(dx) > Math.abs(dy) ? [horizontal, vertical] : [vertical, horizontal];
        const minorAmount = Math.min(Math.abs(dx), Math.abs(dy));
        drag.directions = minorAmount > DEAD_ZONE ? [main, minor] : [main];
        wake(drag.directions);
      },
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  };
}

export function useControls(step: Step, joystick: { current: HTMLElement | null }) {
  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  });

  const [controls] = useState(() => createControls((directions) => stepRef.current(directions), joystick));
  useEffect(() => controls.attach(), [controls]);

  return controls.pointer;
}
