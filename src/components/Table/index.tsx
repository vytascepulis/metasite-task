import style from "./style.module.sass";
import { Column, SortOptions } from "./types.ts";
import { useEffect, useState } from "react";
import {
  getCellValue,
  getNextSortOptions,
  getShownCols,
  getSortIcon,
} from "./utils.tsx";
import classNames from "classnames";
import ManageColsBtn from "./ManageColsBtn.tsx";

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  onSelectRow?: (row: T) => void;
  initialSort: SortOptions<T> | null;
  onSortChange?: (sort: SortOptions<T>) => void;
}

const Table = <T,>({ columns, data, onSelectRow, initialSort }: Props<T>) => {
  const [tableData, setTableData] = useState(data);
  const [columnsData, setColumnsData] = useState<Column<T>[]>(columns);
  const [sort, setSort] = useState<SortOptions<T> | null>(initialSort);

  const isHideableCols = Boolean(columns.find((c) => c.isHideable));

  const handleSort = (column: Column<T>) => {
    let copiedData = [...tableData];
    const currentSort = getNextSortOptions(column, sort);

    if (!currentSort) {
      copiedData = data;
    }

    if (currentSort?.sort === "desc") {
      copiedData.sort((a, b) =>
        getCellValue<T>(a, column)! < getCellValue(b, column)! ? -1 : 1,
      );
    }

    if (currentSort?.sort === "asc") {
      copiedData.sort((a, b) =>
        getCellValue(a, column)! > getCellValue(b, column)! ? -1 : 1,
      );
    }

    setSort(currentSort);
    setTableData(copiedData);
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <table className={style.tableWrapper}>
      <thead>
        <tr className={style.row}>
          {getShownCols(columnsData).map((column) => (
            <th
              key={column.id}
              className={classNames(style.cell, style.header)}
              style={column.style}
            >
              {column.isSortable && (
                <button
                  className={style.sortButton}
                  onClick={() => handleSort(column)}
                >
                  {column.label}
                  {sort?.columnId === column.id && getSortIcon(sort)}
                </button>
              )}
              {!column.isSortable && <span>{column.label}</span>}
            </th>
          ))}
          {isHideableCols && (
            <ManageColsBtn
              columnsData={columnsData}
              setColumnsData={setColumnsData}
            />
          )}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, idx) => (
          <tr
            key={typeof row.id === "string" ? row.id : idx}
            className={style.row}
            onClick={() => onSelectRow?.(row)}
          >
            {getShownCols(columnsData).map((column) => (
              <td key={column.id} className={style.cell} style={column.style}>
                {column.render?.(row) ?? row[column.id]}
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
