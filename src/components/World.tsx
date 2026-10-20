import { memo } from 'react';
import { board } from '@/datas/board';
import { Item } from '@/types/game';

interface WorldProps {
  found: string[];
  defeated: Record<string, string>;
  seen: string[];
}

const isCollectible = (item: Item) => item.type === 'xp' || item.type === 'interest';

// La carte entière ; elle glisse sous le personnage grâce à --row et --col (voir .world)
function World({ found, defeated, seen }: WorldProps) {
  return (
    <div className="world" aria-hidden>
      {board.flatMap((cells, row) =>
        cells.map((cell, col) => (
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
            {/* Le noir des cases jamais aperçues */}
            <div className={`fog ${seen.includes(`${row},${col}`) ? 'fog-seen' : ''}`} />
          </div>
        )),
      )}
    </div>
  );
}

export default memo(World);
