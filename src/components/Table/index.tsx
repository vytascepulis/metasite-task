import style from "./style.module.sass";
import { Column, Row } from "./types.ts";
import { getShownCols, getSortIcon } from "./utils.tsx";
import classNames from "classnames";
import ManageColsBtn from "components/Table/ManageColsBtn.tsx";
import TableBodySkeleton from "components/Table/TableBodySkeleton.tsx";

interface Props<T> {
  columns: Column<T>[];
  data: Row<T>[];
  isDataLoading?: boolean;
  onSelectRow?: (row: Row<T>) => void;
  selectedRow?: Row<T>;
  onSortChange?: (column: Column<T>) => void;
  onColumnToggle?: (column: Column<T>) => void;
}

const Table = <T,>({
  columns,
  data,
  isDataLoading,
  onSelectRow,
  selectedRow,
  onSortChange,
  onColumnToggle,
}: Props<T>) => {
  return (
    <table className={style.tableWrapper}>
      <thead>
        <tr className={style.row}>
          {getShownCols(columns).map((column) => (
            <th
              key={column.id}
              className={classNames(style.cell, style.header)}
              style={column.style}
            >
              {column.isSortable && onSortChange && (
                <button
                  className={style.sortButton}
                  onClick={() => onSortChange?.(column)}
                >
                  {column.label}
                  {getSortIcon(column.sortOrder)}
                </button>
              )}
              {!column.isSortable && <span>{column.label}</span>}
            </th>
          ))}
          <ManageColsBtn columns={columns} onColumnToggle={onColumnToggle} />
        </tr>
      </thead>
      {!data.length && !isDataLoading && (
        <tbody>
          <tr>
            <td colSpan={getShownCols(columns).length} className={style.noData}>
              No data
            </td>
          </tr>
        </tbody>
      )}
      {isDataLoading && (
        <TableBodySkeleton columnsCount={getShownCols(columns).length} />
      )}
      {Boolean(data.length) && !isDataLoading && (
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className={classNames(style.row, {
                [style.isSelected]: selectedRow?.id === row.id,
              })}
              onClick={() => onSelectRow?.(row)}
            >
              {getShownCols(columns).map((column) => (
                <td key={column.id} className={style.cell} style={column.style}>
                  {column.render?.(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default Table;
