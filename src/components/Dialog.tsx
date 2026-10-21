import { CSSProperties, Fragment } from 'react';
import { interests } from '@/datas/items';
import { Item } from '@/types/game';
import Star from './Star';

// Couleurs de rareté de Diablo II, assombries pour se lire sur la boîte claire
const RARITY: Record<NonNullable<Item['rarity']>, string> = {
  normal: '#183018',
  magic: '#3048c8',
  rare: '#a08000',
  set: '#1c8a34',
  unique: '#9a6a18',
};

const words = interests.flatMap((item) => (item.words ?? []).map((word) => ({ word, color: RARITY[item.rarity ?? 'normal'] })));
words.sort((a, b) => b.word.length - a.word.length);
// Mots entiers seulement : « vin » ne se colore pas dans « devine »
const pattern = new RegExp(`(?<!\\p{L})(${words.map(({ word }) => word.replace(/[-\s]/g, '[-\\s]')).join('|')})(?!\\p{L})`, 'giu');

// Les noms d'objets, en couleur de rareté
function Colored({ text }: { text: string }) {
  return text.split(pattern).map((part, index) => {
    const match = index % 2 === 1 && words.find(({ word }) => word.toLowerCase() === part.toLowerCase());
    return match ? (
      <span key={index} className="font-semibold" style={{ color: match.color }}>
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    );
  });
}

interface DialogProps {
  message: { text: string; key: number; error?: boolean; star?: Item['track'] } | null;
}

export default function Dialog({ message }: DialogProps) {
  if (!message) return null;
  const style = { '--duration': `${Math.max(5000, message.text.length * 85)}ms` } as CSSProperties;

  // Comme le message d'erreur de World of Warcraft : en rouge, sans boîte
  if (message.error) {
    const [first, ...rest] = message.text.split('\n');
    return (
      <span key={message.key} className="wow-error message" style={style}>
        <span className="block text-xl text-[#ff2020] sm:text-2xl">{first}</span>
        {rest.length > 0 && <span className="mt-1 block text-sm text-white/80">{rest.join(' ')}</span>}
      </span>
    );
  }

  return (
    <span key={message.key} className="dialog message whitespace-pre-line" style={style}>
      {/* Une expérience : son étoile, et s'il s'agit d'une formation ou d'une expérience pro */}
      {message.star && (
        <span className="mb-1 flex items-center gap-2 text-sm opacity-70">
          <Star track={message.star} className="size-4" />
          {message.star === 'formation' ? 'Formation' : 'Expérience pro'}
        </span>
      )}
      <Colored text={message.text} />
    </span>
  );
}
