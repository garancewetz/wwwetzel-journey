import { useEffect, useState } from 'react';
import { STEP_MS } from '@/store/controls';
import { Direction, Position } from '@/types/game';

interface HeroProps {
  facing: Direction;
  position: Position;
}

// Le personnage : il regarde dans la direction demandée et ne joue son cycle de pas que pendant qu'il marche
export default function Hero({ facing, position }: HeroProps) {
  const [walking, setWalking] = useState(false);

  useEffect(() => {
    setWalking(true);
    const timer = window.setTimeout(() => setWalking(false), STEP_MS + 80);
    return () => window.clearTimeout(timer);
  }, [position]);

  const sheet = facing === 'up' || facing === 'down' ? facing : 'side';

  return (
    <div className={`hero ${walking ? 'hero-walking' : ''}`} data-facing={facing}>
      <img src={`/hero/${sheet}.svg`} alt="Garance" draggable={false} />
    </div>
  );
}
