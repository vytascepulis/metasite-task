import style from "./style.module.sass";

interface Props {
  columnsCount: number;
}

const skeletonRowCount = 6;

const TableBodySkeleton = ({ columnsCount }: Props) => {
  return (
    <tbody>
      {Array.from({ length: skeletonRowCount }).map((_, rowId) => (
        <tr key={rowId} className={style.skeletonRow}>
          {Array.from({ length: columnsCount }).map((_, colId) => (
            <td key={colId}>
              <span className={style.skeletonCell} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBodySkeleton;
