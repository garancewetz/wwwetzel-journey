interface OrbProps {
  label: string;
  value: number;
  max: number;
  // clair, moyen, sombre
  colors: [string, string, string];
}

const SIZE = 16;
const RADIUS = 7;

// Une orbe à la Diablo, en pixels : elle se remplit par le bas
export default function Orb({ label, value, max, colors }: OrbProps) {
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
    <figure className="flex flex-col items-center gap-1" aria-label={`${label} ${value}/${max}`}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-10 sm:size-16" shapeRendering="crispEdges" aria-hidden>
        {pixels.map(({ x, y, fill }) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fill} />
        ))}
      </svg>
      <figcaption className="whitespace-nowrap text-[10px] tracking-widest text-white/60">
        {label} {value}/{max}
      </figcaption>
    </figure>
  );
}
