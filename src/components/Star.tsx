import { Item } from '@/types/game';

// Une étoile en pixels : bleu clair pour une formation, dorée pour une expérience pro
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

export const STAR_COLORS = {
  formation: ['#e0f0ff', '#88c0f8'],
  pro: ['#fff4a0', '#f8d030'],
} as const;

interface StarProps {
  track: NonNullable<Item['track']>;
  lit?: boolean;
  className?: string;
}

export default function Star({ track, lit = true, className }: StarProps) {
  const [light, base] = STAR_COLORS[track];
  return (
    <svg viewBox="0 0 9 9" className={className} shapeRendering="crispEdges" aria-hidden>
      {STAR.flatMap((line, y) =>
        [...line].map((pixel, x) =>
          pixel === '#' ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={lit ? (y < 3 ? light : base) : '#3c3c44'} />
          ) : null,
        ),
      )}
    </svg>
  );
}
