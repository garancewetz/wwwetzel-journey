import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GridCellProps {
  value: string;
  rowIndex: number;
  colIndex: number;
  items?: { type: string, name: string, image: string, found: boolean }[];
  heightCell: number;
  cell: { id: number, isWay?: boolean, items?: { type: string, name: string, image: string, found: boolean }[], path?: string };
}

export default function GridCell({ value, rowIndex, colIndex, items, heightCell, cell }: GridCellProps) {
  return (
    <li className="relative  flex justify-center items-center aspect-square"
    style={{ height: `${heightCell}px` }} >
      {cell.path  && (
        <svg className="absolute inset-0 w-full h-full object-cover">
          <use href={`#${cell.path}`} />
        </svg>
      )}
      <AnimatePresence>
        {items && items.map((item, index) => {
          const isTreasureType = item.type === 'xp' || item.type === 'interest';
          const isDanger = item.type === 'danger';
          
          return item.image && !item.found && (
            <motion.div
              key={`item-${rowIndex}-${colIndex}-${index}`}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${item.type === 'obstacle' || item.type === 'surprise' ? 'min-w-7/10' : ''}`}
              initial={{ scale: 1 }}
              animate={isTreasureType ? {
                scale: [1, 1.7, 1],
              } : isDanger ? {
                y: [0, 10, 0]
              } : {}}
              exit={{
                zIndex: 10,
                scale: [1, 3, 0],
                opacity: [1, 1, 0],
                transition: {
                  duration: 0.5,
                  ease: "easeOut"
                }
              }}
              transition={isTreasureType ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              } : isDanger ? {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              } : {}}
            >
              <Image 
                src={item.image} 
                alt={item.name} 
                width={item.type === 'obstacle' || item.type === 'danger' || item.type === 'surprise' ? 100 : 30} 
                height={item.type === 'obstacle' || item.type === 'danger' || item.type === 'surprise' ? 100 : 30} 
                className={`${isTreasureType ? 'filter drop-shadow-lg' : ''} `}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
      <input 
        type="text" 
        defaultValue={value}
        className={`w-full h-full text-center text-gray-800 outline-none `}
        readOnly
        data-row={rowIndex}
        data-col={colIndex}
      />
    </li>
  );
}
