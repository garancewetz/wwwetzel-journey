import { asset } from '@/lib/asset';
import { Direction } from '@/types/game';

interface HeroProps {
  facing: Direction;
  walking: boolean;
  // dans les hautes herbes ou dans l'eau, on ne voit plus que le haut du corps
  ground: string;
}

export const sheetFor = (facing: Direction) => (facing === 'up' || facing === 'down' ? facing : 'side');

// Le personnage : il regarde dans la direction demandée et ne joue son cycle de pas que pendant qu'il marche
export default function Hero({ facing, walking, ground }: HeroProps) {
  return (
    <div className={`sprite hero ${walking ? 'walking' : ''}`} data-facing={facing}>
      <img src={asset(`/hero/${sheetFor(facing)}.svg`)} alt="Garance" draggable={false} />
      <Cover ground={ground} />
    </div>
  );
}

export function Cover({ ground }: { ground: string }) {
  if (ground !== 'tallgrass' && ground !== 'water') return null;
  return (
    <svg className={ground === 'water' ? 'in-water' : 'in-grass'} aria-hidden>
      <use href={`#${ground}`} />
    </svg>
  );
}
