import { Fragment, memo } from 'react';
import { board, COLUMNS } from '@/datas/board';
import { asset } from '@/lib/asset';
import { Item } from '@/types/game';

interface WorldProps {
  found: string[];
  defeated: Record<string, string>;
}

const isCollectible = (item: Item) => item.type === 'xp' || item.type === 'interest';

// La carte entière ; elle glisse sous le personnage avec son calque (voir .pan dans Game)
function World({ found, defeated }: WorldProps) {
  return (
    <div className="world" style={{ gridTemplateColumns: `repeat(${COLUMNS}, var(--cell))` }}>
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
            // Comme les objets cachés de Pokémon : dans les hautes herbes, on ne le voit qu'en marchant dessus
            if (cell.path === 'tallgrass' && isCollectible(item) && !isFound) return null;
            // Une expérience est une maison : sa fenêtre s'allume une fois qu'on y est entré
            if (item.type === 'xp') {
              return (
                <img
                  key={index}
                  src={asset(isFound ? item.image.replace('.svg', '-lit.svg') : item.image)}
                  alt=""
                  draggable={false}
                  className="item item-house"
                />
              );
            }
            // Gardien parti sans laisser d'image (il nous a laissé passer)
            const isGone = item.id !== undefined && defeated[item.id] === '';
            const isGuard = item.type === 'danger' || item.type === 'guard';
            const size = isGuard ? 'item-large' : isCollectible(item) ? 'item-small' : '';
            return (
              <Fragment key={index}>
                <img
                  src={asset((item.id && defeated[item.id]) || item.image)}
                  alt=""
                  draggable={false}
                  className={`item ${size} ${isFound || isGone ? 'item-found' : ''}`}
                />
                {/* Comme un donneur de quête dans World of Warcraft, tant qu'il attend son objet */}
                {isGuard && !(item.id! in defeated) && <QuestMark />}
              </Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// Le « ! » jaune des quêtes, en pixels
function QuestMark() {
  return (
    <svg className="quest-mark" viewBox="0 0 5 11" shapeRendering="crispEdges" aria-hidden>
      <rect x="0" y="0" width="5" height="8" fill="#183018" />
      <rect x="0" y="8" width="5" height="3" fill="#183018" />
      <rect x="1" y="1" width="3" height="6" fill="#f8d030" />
      <rect x="1" y="1" width="1" height="6" fill="#fff4a0" />
      <rect x="1" y="9" width="3" height="1" fill="#f8d030" />
    </svg>
  );
}

export default memo(World);
