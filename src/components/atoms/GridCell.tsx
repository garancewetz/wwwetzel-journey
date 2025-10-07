import Image from "next/image";
import { motion } from "framer-motion";

interface GridCellProps {
  value: string;
  rowIndex: number;
  colIndex: number;
  item?: { type: string, name: string, image: string, found: boolean };
  isActive?: boolean;
  heightCell: number;
  cell: { id: number, isWay?: boolean, item?: { type: string, name: string, image: string, found: boolean } };
}

export default function GridCell({ value, rowIndex, colIndex, item, heightCell, cell }: GridCellProps) {
  const isTreasureType = item?.type === 'xp' || item?.type === 'interest';
  
  return (
    <li className="relative border border-gray-900 flex justify-center items-center"
    style={{ height: `${heightCell}px` }} >
      {item && item.image && !item.found && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={isTreasureType ? {
            y: [0, -3, 0],
            boxShadow: [
              "0 0 0px rgba(255, 215, 0, 0)",
              "0 0 10px rgba(255, 215, 0, 0.6)",
              "0 0 0px rgba(255, 215, 0, 0)"
            ]
          } : {}}
          transition={isTreasureType ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        >
          <Image 
            src={item.image} 
            alt={item.name} 
            width={item.type === 'obstacle' ? 100 : 30} 
            height={item.type === 'obstacle' ? 100 : 30} 
            className={`${isTreasureType ? 'filter drop-shadow-lg' : ''}`}
          />
        </motion.div>
      )}
      <input 
        type="text" 
        defaultValue={value}
        className={`w-full h-full text-center text-gray-800 ${cell.isWay ? 'border border-yellow-200' : ''} ${item?.type === 'obstacle' ? 'border border-red-500' : ''}`}
        readOnly
        data-row={rowIndex}
        data-col={colIndex}
      />
    </li>
  );
}
