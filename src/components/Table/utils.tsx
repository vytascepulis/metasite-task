import { Column, SortOptions } from "./types.ts";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const getNextSortOptions = <T,>(
  column: Column<T>,
  currentSort: SortOptions<T> | null,
): SortOptions<T> | null => {
  if (currentSort?.columnId !== column.id) {
    return {
      columnId: column.id,
      sort: "desc",
    };
  }

  switch (currentSort.sort) {
    case "desc":
      return {
        ...currentSort,
        sort: "asc",
      };
    case "asc":
      return null;
  }
};

export const getSortIcon = <T,>(sortOptions: SortOptions<T> | null) => {
  switch (sortOptions?.sort) {
    case "desc":
      return <FontAwesomeIcon icon={faArrowDown} />;
    case "asc":
      return <FontAwesomeIcon icon={faArrowUp} />;
    default:
      return null;
  }
};

export const getCellValue = <T,>(
  row: T,
  column: Column<T>,
): React.ReactNode => {
  return column.render ? column.render(row) : row[column.id];
};

export const getShownCols = <T,>(columns: Column<T>[]) => {
  return [...columns].filter((col) => !col.isHidden);
};
