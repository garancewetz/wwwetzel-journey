import { describe, expect, it } from 'vitest';
import { followFinger, stickDirections } from './controls';

describe('stickDirections', () => {
  it('ne bouge pas dans la zone morte', () => {
    expect(stickDirections(5, -8)).toEqual([]);
  });

  it('suit l’axe dominant, avec la direction secondaire pour longer un mur', () => {
    expect(stickDirections(30, 0)).toEqual(['right']);
    expect(stickDirections(-10, 35)).toEqual(['down']);
    expect(stickDirections(30, -20)).toEqual(['right', 'up']);
  });

  it('garde la direction en cours autour de la diagonale', () => {
    // Juste après 45° : on reste à droite si on allait à droite, en haut si on allait en haut
    expect(stickDirections(28, -30, 'right')[0]).toBe('right');
    expect(stickDirections(30, -28, 'up')[0]).toBe('up');
  });

  it('change d’axe une fois la diagonale nettement dépassée', () => {
    expect(stickDirections(20, -38, 'right')[0]).toBe('up');
    expect(stickDirections(38, -20, 'up')[0]).toBe('right');
  });

  it('fait demi-tour sur le même axe sans attendre', () => {
    expect(stickDirections(-30, 5, 'right')).toEqual(['left']);
  });
});

describe('followFinger', () => {
  it('laisse le centre en place dans le rayon', () => {
    expect(followFinger({ x: 100, y: 100 }, { x: 120, y: 110 })).toEqual({ anchor: { x: 100, y: 100 }, dx: 20, dy: 10 });
  });

  it('tire le centre derrière le doigt au-delà du rayon', () => {
    const { anchor, dx, dy } = followFinger({ x: 100, y: 100 }, { x: 200, y: 100 });
    expect(anchor).toEqual({ x: 160, y: 100 });
    expect(Math.hypot(dx, dy)).toBeCloseTo(40);
  });

  it('permet de repartir dans l’autre sens après un long glissé', () => {
    const { anchor } = followFinger({ x: 100, y: 100 }, { x: 300, y: 100 });
    // Le doigt recule de 60px (et non jusqu'au point de départ, 200px plus loin) : le personnage repart à gauche
    const back = followFinger(anchor, { x: 240, y: 100 });
    expect(stickDirections(back.dx, back.dy, 'right')).toEqual(['left']);
  });
});
