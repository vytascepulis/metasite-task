import classNames from "classnames";
import style from "./style.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Column } from "./types.ts";
import useClickOutside from "hooks/useClickOutside.ts";
import Checkbox from "components/Checkbox";

interface Props<T> {
  columnsData: Column<T>[];
  setColumnsData: React.Dispatch<React.SetStateAction<Column<T>[]>>;
}

const ManageColsBtn = <T,>({ columnsData, setColumnsData }: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const refManageColsWrapper = useRef<HTMLTableHeaderCellElement | null>(null);

  useClickOutside({
    element: refManageColsWrapper.current as HTMLElement,
    callback: () => setIsOpen(false),
  });

  const toggleIsClicked = () => setIsOpen((prevState) => !prevState);

  const hideableCols = columnsData.filter((col) => col.isHideable);

  const toggleColVisibility = <T,>(column: Column<T>) => {
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
    <th
      ref={refManageColsWrapper}
      className={classNames(style.buttonWrapper, style.cell, style.header)}
    >
      <button
        onClick={toggleIsClicked}
        className={classNames({ [style.isActive]: isOpen })}
        type="button"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
      {isOpen && (
        <ul className={style.manageColsWrapper}>
          {hideableCols.map((col) => (
            <li key={col.id}>
              <Checkbox
                name={col.id}
                label={col.label}
                onChecked={() => toggleColVisibility(col)}
                initialValue={!col.isHidden}
              />
            </li>
          ))}
        </ul>
      )}
    </th>
  );
};

export default ManageColsBtn;
