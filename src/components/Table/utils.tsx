import { Column, SortOrder } from "./types.ts";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const getSortIcon = (sortOrder?: SortOrder) => {
  switch (sortOrder) {
    case "desc":
      return <FontAwesomeIcon icon={faArrowDown} />;
    case "asc":
      return <FontAwesomeIcon icon={faArrowUp} />;
    default:
      return null;
  }
};

export const getShownCols = <T,>(columns: Column<T>[]) => {
  return [...columns].filter((col) => !col.isHidden);
};
