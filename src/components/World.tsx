import { memo } from 'react';
import { board, COLUMNS } from '@/datas/board';
import { Item } from '@/types/game';

interface WorldProps {
  found: string[];
  defeated: Record<string, string>;
}

const isCollectible = (item: Item) => item.type === 'xp' || item.type === 'interest';

// La carte entière ; elle glisse sous le personnage grâce à --row et --col (voir .world)
function World({ found, defeated }: WorldProps) {
  return (
    <div className="world" style={{ gridTemplateColumns: `repeat(${COLUMNS}, var(--cell))` }} aria-hidden>
      {board.flat().map((cell) => (
        <div key={cell.id} className="relative">
          {cell.path && (
            <svg className="tile">
              <use href={`#${cell.path}`} />
            </svg>
          )}
          {cell.items?.map((item, index) => {
            // Salamèche reste caché dans les hautes herbes ; une fois trouvé, il suit (voir Companion)
            if (item.type === 'companion') return null;
            const isFound = isCollectible(item) && found.includes(item.id!);
            // Une expérience est une maison : sa fenêtre s'allume une fois qu'on y est entré
            if (item.type === 'xp') {
              return (
                <img
                  key={index}
                  src={isFound ? item.image.replace('.svg', '-lit.svg') : item.image}
                  alt=""
                  draggable={false}
                  className="item item-house"
                />
              );
            }
            // Gardien parti sans laisser d'image (il nous a laissé passer)
            const isGone = item.id !== undefined && defeated[item.id] === '';
            const size = item.type === 'danger' || item.type === 'guard' ? 'item-large' : isCollectible(item) ? 'item-small' : '';
            return (
              <img
                key={index}
                src={(item.id && defeated[item.id]) || item.image}
                alt=""
                draggable={false}
                className={`item ${size} ${isFound || isGone ? 'item-found' : ''}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default memo(World);
