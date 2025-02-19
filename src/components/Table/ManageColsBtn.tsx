import classNames from "classnames";
import style from "./style.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Column, ColumnData } from "./types.ts";

interface Props {
  columnsData: ColumnData[];
  setColumnsData: React.Dispatch<React.SetStateAction<ColumnData[]>>;
}

const ManageColsBtn = ({ columnsData, setColumnsData }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleIsClicked = () => setIsClicked((prevState) => !prevState);

  const hideableCols = columnsData.filter((col) => col.isHideable);

  const toggleColVisibility = (column: Column) => {
    setColumnsData((prevState) =>
      prevState.map((col) => {
        if (col.id === column.id) {
          return { ...col, isHidden: !col.isHidden };
        }

        return col;
      }),
    );
  };

  return (
    <th className={classNames(style.buttonWrapper, style.cell, style.header)}>
      <button
        onClick={toggleIsClicked}
        className={classNames({ [style.isActive]: isClicked })}
        type="button"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
      {isClicked && (
        <ul className={style.manageColsWrapper}>
          {hideableCols.map((col) => (
            <li key={col.id}>
              <label>
                <input
                  type="checkbox"
                  checked={!col.isHidden}
                  onChange={() => toggleColVisibility(col)}
                />
                {col.label}
              </label>
            </li>
          ))}
        </ul>
      )}
    </th>
  );
};

export default ManageColsBtn;
