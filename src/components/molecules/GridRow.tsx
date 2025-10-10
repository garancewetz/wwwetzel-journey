import GridCell from '../atoms/GridCell';

interface GridRowProps {
  row: { id: number, isWay?: boolean, items?: { type: string, name: string, image: string, found: boolean }[], path?: string }[];
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
          items={cell.items}
          cell={cell}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      ))}
    </ul>
  );
}
