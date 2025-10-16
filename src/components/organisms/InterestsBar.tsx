import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useBoard } from '../../store/BoardContext';
import BoardCell, { BoardItem } from '@/types/boardCell';
import crossed from '@/datas/crossed';
import { interests } from '@/datas/items';

interface InterestsBarProps {
  foundInterests: BoardItem[];
}

interface ActionObj {
  text: string;
  enemy: BoardItem | null;
  weapon: BoardItem | null;
  action: string | null;
  image: string | null;
}

export default function InterestsBar({ foundInterests }: InterestsBarProps) {
  const { grid, currentCell, currentPosition, setAction, setCurrentItem } = useBoard();
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
      const isDanger = currentCell?.items && currentCell?.items[0].type === "danger";
      if (currentCell?.items && !currentCell?.items[0].found && isDanger) {
        const dangerName = currentCell.items[0].id;
        const crossedData = crossed[dangerName as keyof typeof crossed];
        const interaction = crossedData?.find((item) => item.id === foundItem.id);

        // Si l'interaction a une image, mettre à jour l'image de la cellule
        if (interaction?.image) {
          console.log("--- CURRENT CELL ---", currentCell);
          const newCell: BoardCell = {
            ...currentCell,
            items: [
              { ...currentCell.items[0], image: interaction.image }
            ]
          }
          setCurrentItem(newCell, currentPosition.row, currentPosition.col);
        }

        const actionObj: ActionObj = {
          text: interaction?.text || `Olala, un combat ? Je veux vraiment attaquer ${currentCell?.items[0].name} avec ${foundItem.name} ?`,
          enemy: interaction?.image ? { ...currentCell.items[0], image: interaction.image } : currentCell.items[0],
          weapon: foundItem,
          action: "attack",
          image: interaction?.image || null
        }
        setAction(actionObj as ActionObj);
      } else {
        const actionObj: ActionObj = {
          text: `${foundItem.name}. Qu'est-ce que je peux bien en faire ?`,
          enemy: null,
          weapon: foundItem,
          action: null,
          image: null
        }
        setAction(actionObj as ActionObj);
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
  }, [foundInterests, interests, currentCell, currentPosition, setAction]);

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

