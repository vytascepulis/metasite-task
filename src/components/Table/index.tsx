import style from "./style.module.sass";
import { Column } from "./types.ts";

interface Props {
  columns: Column[];
  rows: any[];
}

const Table = ({ columns, rows }: Props) => {
  return (
    <table className={style.tableWrapper}>
      <thead>
        <tr className={style.row}>
          {columns.map((column) => (
            <th key={column.id} className={style.col} style={column.style}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className={style.row}>
            {columns.map((column) => (
              <td key={column.id} className={style.col} style={column.style}>
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
