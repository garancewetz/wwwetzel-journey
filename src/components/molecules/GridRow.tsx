import GridCell from '../atoms/GridCell';

interface GridRowProps {
  row: { id: number, isWay?: boolean, item?: { name: string, image: string, found: boolean } }[];
  rowIndex: number;
  heightCell: number;
}

export default function GridRow({ row, rowIndex, heightCell }: GridRowProps) {
  let gridCols;
  switch(row.length) {
    case 10:
      gridCols = `grid-cols-10`;
      break;
    case 11:
      gridCols = `grid-cols-11`;
      break;
    case 12:
      gridCols = `grid-cols-12`;
      break;

  }
  return (
    <ul className={`grid ${gridCols}`}>
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
