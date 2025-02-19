import { Column, ColumnData, Row, SortOptions } from "./types.ts";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const getNextSortOptions = (
  column: Column,
  currentSort: SortOptions,
): SortOptions => {
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

export const getSortIcon = (sortOptions: NonNullable<SortOptions>) => {
  switch (sortOptions.sort) {
    case "desc":
      return <FontAwesomeIcon icon={faArrowDown} />;
    case "asc":
      return <FontAwesomeIcon icon={faArrowUp} />;
  }
};

export const getCellValue = (row: Row, column: Column): React.ReactNode => {
  return column.render ? column.render(row) : row[column.id];
};

export const initColumnsData = (columns: Column[]): ColumnData[] => {
  return columns.map((col) => ({ ...col, isHidden: false }));
};

export const getShownCols = (columns: ColumnData[]) => {
  return [...columns].filter((col) => !col.isHidden);
};
