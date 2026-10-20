import { memo } from 'react';
import { board } from '@/datas/board';
import { Item } from '@/types/game';

interface WorldProps {
  found: string[];
  defeated: Record<string, string>;
  // Calque des cases découvertes, posé au-dessus du noir ; absent pour la carte de base
  lit?: string[];
}

const isCollectible = (item: Item) => item.type === 'xp' || item.type === 'interest';

// La carte entière ; elle glisse sous le personnage grâce à --row et --col (voir .world)
function World({ found, defeated, lit }: WorldProps) {
  return (
    <div className={`world ${lit ? 'world-lit' : ''}`} aria-hidden>
      {board.flatMap((cells, row) =>
        cells.map((cell, col) => (
          <div key={cell.id} className="relative">
            {(!lit || lit.includes(`${row},${col}`)) && (
              <div className={lit ? 'lit-cell' : undefined}>
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
            )}
          </div>
        )),
      )}
    </div>
  );
}

export default memo(World);
