import style from "./style.module.sass";
import { Column, Row } from "./types.ts";
import { getShownCols, getSortIcon } from "./utils.tsx";
import classNames from "classnames";
import ManageColsBtn from "components/Table/ManageColsBtn.tsx";

interface Props<T> {
  columns: Column<T>[];
  data: Row<T>[];
  onSelectRow?: (row: Row<T>) => void;
  selectedRow?: Row<T>;
  onSortChange?: (column: Column<T>) => void;
  onColumnToggle?: (column: Column<T>) => void;
}

const Table = <T,>({
  columns,
  data,
  onSelectRow,
  selectedRow,
  onSortChange,
  onColumnToggle,
}: Props<T>) => {
  const isHideableCols = Boolean(columns.find((c) => c.isHideable));

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
          {isHideableCols && onColumnToggle && (
            <ManageColsBtn columns={columns} onColumnToggle={onColumnToggle} />
          )}
        </tr>
      </thead>
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
            {isHideableCols && <td></td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
