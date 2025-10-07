import GridCell from '../atoms/GridCell';

interface GridRowProps {
  row: { id: number, isWay?: boolean, item?: { name: string, image: string, found: boolean } }[];
  rowIndex: number;
  heightCell: number;
}

export default function GridRow({ row, rowIndex, heightCell }: GridRowProps) {

  return (
    <ul className={`flex `}>
      {row.map((cell, colIndex) => (
        <GridCell
          heightCell={heightCell}
          key={cell.id}
          value={`${cell.id}`}
          item={cell.item}
          cell={cell}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      ))}
    </ul>
  );
}
