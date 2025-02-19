import style from "./style.module.sass";
import { Column, SortOptions } from "./types.ts";
import { useEffect, useState } from "react";
import { getCellValue, getNextSortOptions, getSortIcon } from "./utils.tsx";
import classNames from "classnames";

interface Props {
  columns: Column[];
  data: any[];
}

const Table = ({ columns, data }: Props) => {
  const [tableData, setTableData] = useState(data);
  const [sort, setSort] = useState<SortOptions>(null);

  const handleSort = (column: Column) => {
    let copiedData = [...tableData];
    const currentSort = getNextSortOptions(column, sort);

    if (!currentSort) {
      copiedData = data;
    }

    if (currentSort?.sort === "desc") {
      copiedData.sort((a, b) =>
        getCellValue(a, column)! < getCellValue(b, column)! ? -1 : 1,
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
          {columns.map((column) => (
            <th
              key={column.id}
              className={classNames(style.cell, style.header)}
              style={column.style}
            >
              {column.isSortable && (
                <button onClick={() => handleSort(column)}>
                  {column.label}
                  {sort?.columnId === column.id && getSortIcon(sort)}
                </button>
              )}
              {!column.isSortable && column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => (
          <tr key={row.id} className={style.row}>
            {columns.map((column) => (
              <td key={column.id} className={style.cell} style={column.style}>
                {column.render?.(row) ?? row[column.id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
