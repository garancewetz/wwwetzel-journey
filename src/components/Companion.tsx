import { CSSProperties } from 'react';
import { asset } from '@/lib/asset';
import { Direction, Position } from '@/types/game';
import { Cover } from './Hero';

interface CompanionProps {
  trail: Position;
  position: Position;
  walking: boolean;
  ground: string;
}

// Salamèche marche un pas derrière, sur la case que l'on vient de quitter
export default function Companion({ trail, position, walking, ground }: CompanionProps) {
  const facing: Direction = position.col < trail.col ? 'left' : 'right';
  return (
    <div className="layer" aria-hidden>
      <div
        className={`sprite follower ${walking ? 'walking' : ''}`}
        data-facing={facing}
        style={{ '--trow': trail.row, '--tcol': trail.col } as CSSProperties}
      >
        <img src={asset('/companion/salameche.svg')} alt="" draggable={false} />
        <Cover ground={ground} />
      </div>
    </div>
  );
}
