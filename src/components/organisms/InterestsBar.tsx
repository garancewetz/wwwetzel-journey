import Image from 'next/image';
import { useBoard } from '../../store/BoardContext';

interface FoundItem {
  name: string;
  image: string;
  type: string;
  text?: string;
}

interface InterestsBarProps {
  foundInterests: FoundItem[];
}

export default function InterestsBar({ foundInterests }: InterestsBarProps) {
  const { grid } = useBoard();
  const flattenedGrid = grid.flat();
  const foundInterestsCount = flattenedGrid.filter((item) => item.item?.type === "interest").length;

  return (
    <div className={`${foundInterests.length > 0 ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 border-t border-x rounded-t border-gray-600 flex items-center fixed right-1/2 translate-x-1/2 w-1/2 bottom-0 bg-gray-900 z-10`}>
      <div className="my-auto grid grid-cols-1">
        <Image className="row-span-full col-span-full" src="/bagpack.svg" alt="bagpack" width={60} height={60} />
        <span className="row-span-full col-span-full text-white self-center justify-self-center font-bold ">
            {foundInterests.length}/{foundInterestsCount}
        </span>
      </div>
      <ul className="flex items-center h-full space-x-4 ml-5">
        {foundInterests.map((item, index) => (
          <li key={`${index}-${item.name}`} className="relative group aspect-square flex items-center justify-center">
            <span className="font-bold text-xs -top-1 -left-1 absolute bg-black rounded p-0.25 aspect-square w-4 flex items-center justify-center">{index+1}</span>
            <Image 
              src={item.image} 
              alt={item.name} 
              width={40} 
              height={40}
              className="object-contain"
            />
            <span className="text-white text-sm absolute -top-full pl-2 w-max opacity-0 group-hover:opacity-100">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

