import { memo } from 'react';
import { board } from '@/datas/board';
import { Item } from '@/types/game';

interface WorldProps {
  found: string[];
  defeated: Record<string, string>;
}

const isCollectible = (item: Item) => item.type === 'xp' || item.type === 'interest';

// La carte entière ; elle glisse sous le personnage grâce à --row et --col (voir .world)
function World({ found, defeated }: WorldProps) {
  return (
    <div className="world" aria-hidden>
      {board.flat().map((cell) => (
        <div key={cell.id} className="relative">
          {cell.path && (
            <svg className="tile">
              <use href={`#${cell.path}`} />
            </svg>
          )}
          {cell.items?.map((item, index) => {
            const isFound = isCollectible(item) && found.includes(item.id!);
            // Danger parti sans laisser d'image (il nous a laissé passer)
            const isGone = item.id !== undefined && defeated[item.id] === '';
            return (
              <img
                key={index}
                src={(item.id && defeated[item.id]) || item.image}
                alt=""
                draggable={false}
                className={`item ${isCollectible(item) ? 'item-small' : 'item-large'} ${isFound || isGone ? 'item-found' : ''}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default memo(World);
