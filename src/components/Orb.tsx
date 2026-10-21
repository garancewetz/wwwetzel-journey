import { useEffect, useRef, useState } from 'react';

interface OrbProps {
  label: string;
  value: number;
  max: number;
  // clair, moyen, sombre
  colors: [string, string, string];
}

const SIZE = 16;
const RADIUS = 7;

// Une orbe à la Diablo, en pixels : elle se remplit par le bas, et montre chaque gain ou dépense
export default function Orb({ label, value, max, colors }: OrbProps) {
  const previous = useRef(value);
  const [delta, setDelta] = useState<{ amount: number; key: number } | null>(null);

  useEffect(() => {
    const amount = value - previous.current;
    previous.current = value;
    if (amount) setDelta((last) => ({ amount, key: (last?.key ?? 0) + 1 }));
  }, [value]);

  const level = Math.round((value / max) * (RADIUS * 2));
  const pixels: { x: number; y: number; fill: string }[] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const d = Math.hypot(x - 7.5, y - 7.5);
      if (d > RADIUS + 0.5) continue;
      const rim = d > RADIUS - 0.5;
      const filled = y >= SIZE - 1 - level;
      const shine = (x === 5 && y === 4) || (x === 4 && y === 5) || (x === 5 && y === 5);
      pixels.push({
        x,
        y,
        fill: rim ? '#183018' : shine ? '#ffffff' : filled ? (y < SIZE - level + 1 ? colors[0] : x > 9 ? colors[2] : colors[1]) : '#1c2430',
      });
    }
  }

  return (
    <figure className="relative flex flex-col items-center gap-1" aria-label={`${label} ${value}/${max}`}>
      {delta && (
        <span key={`d${delta.key}`} className="orb-delta absolute -top-5 text-sm" style={{ color: colors[0] }} aria-hidden>
          {delta.amount > 0 ? `+${delta.amount}` : delta.amount}
        </span>
      )}
      <svg
        key={delta?.key ?? 0}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className={`size-10 sm:size-16 ${delta ? 'orb-flash' : ''}`}
        shapeRendering="crispEdges"
        aria-hidden
      >
        {pixels.map(({ x, y, fill }) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fill} />
        ))}
      </svg>
      <figcaption className="whitespace-nowrap text-xs tracking-widest text-white/70">
        {label} {value}/{max}
      </figcaption>
    </figure>
  );
}
