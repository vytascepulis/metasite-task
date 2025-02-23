import style from "./style.module.sass";
import { Column } from "./types.ts";
import { getShownCols, getSortIcon } from "./utils.tsx";
import classNames from "classnames";
import ManageColsBtn from "components/Table/ManageColsBtn.tsx";

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  onSelectRow?: (row: T) => void;
  onSortChange?: (column: Column<T>) => void;
  onColumnToggle?: (column: Column<T>) => void;
}

const Table = <T,>({
  columns,
  data,
  onSelectRow,
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
        {data.map((row, idx) => (
          <tr
            // key={typeof row.id === "string" ? row.id : idx}
            key={idx}
            className={style.row}
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
