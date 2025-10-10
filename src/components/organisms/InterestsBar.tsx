import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useBoard } from '../../store/BoardContext';
import { BoardItem } from '@/types/boardCell';


interface InterestsBarProps {
  foundInterests: BoardItem[];
}

export default function InterestsBar({ foundInterests }: InterestsBarProps) {
  const { grid, interests, currentCell, setAction } = useBoard();
  const flattenedGrid = grid.flat();
  const [animatingItems, setAnimatingItems] = useState<Set<number>>(new Set());

  const allInterests = flattenedGrid
    .flatMap((cell) => cell.items?.filter((item) => item.type === "interest") || [])
    .map((item) => ({ name: item.name, image: item.image }));

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const keyNumber = parseInt(event.key);
      const foundItem = foundInterests.find(item => item?.name === interests[keyNumber - 1]?.name);
      if (!foundItem) return
      // Déclencher l'animation sur l'item avec ce numéro
      setAnimatingItems(prev => new Set(prev).add(keyNumber - 1));
      if (currentCell?.items && !currentCell?.items[0].found) {
        console.log("là j'envoie");
        setAction(`Olala, un combat ? Je veux vraiment attaquer ${currentCell?.items[0].name} avec ${foundItem.name} ?`);
      } else {
        setAction(`${foundItem.name}. Qu'est-ce que je peux bien en faire ?`)
      }
      // Arrêter l'animation après 600ms
      setTimeout(() => {
        setAnimatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(keyNumber - 1);
          return newSet;
        });
      }, 600);


    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [foundInterests, interests]);

  return (
    <div className={`${foundInterests.length > 0 ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 border-t border-x rounded-t border-gray-600 flex items-center fixed right-1/2 translate-x-1/2 w-fit bottom-0 bg-gray-900 z-10 py-2 px-4`}>
      <div className="my-auto grid grid-cols-1 w-12 h-12">
        <Image className="row-span-full col-span-ful " src="/bagpack.svg" alt="bagpack" width={60} height={60} />
        <span className="row-span-full col-span-full text-white self-center justify-self-center font-bold ">
          {foundInterests.length}/{allInterests.length}
        </span>
      </div>
      <ul className="flex items-center h-full space-x-4 ml-5">
        {interests.map((interest, index) => {
          const foundItem = foundInterests.find((item) => item.name === interest.name);
          const isAnimating = animatingItems.has(index);

          return (
            <motion.li
              key={`${index}-${interest.name}`}
              className="relative group aspect-square flex items-center justify-center "
              animate={isAnimating ? {
                y: -20,
                scale: 1.2
              } : {
                y: 0,
                scale: 1
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              {foundItem ? (
                <div className="w-10 h-10">
                  <span className="font-bold text-xs -top-1 -left-1 absolute bg-black rounded p-0.25 aspect-square w-4 flex items-center justify-center">{interests.indexOf(interest) + 1}</span>
                  <Image
                    src={foundItem.image}
                    alt={foundItem.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <span className="text-white text-sm absolute -top-full pl-2 w-max opacity-0 group-hover:opacity-100">{foundItem.name}</span>
                </div>
              ) : (
                <div className="w-10 h-10 bg-gray-600 rounded"></div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

