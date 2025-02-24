import { HashOptions } from "contexts/ContactsContext/types.ts";
import queryString from "query-string";

export const updateHashValues = (options: HashOptions) => {
  const currentHash = queryString.parse(location.hash);
  const newState = { ...currentHash, ...options };

  window.location.hash = queryString.stringify(newState, {
    skipNull: true,
    skipEmptyString: true,
    arrayFormat: "comma",
  });
};

export const getHashValues = (): HashOptions => {
  const parsedString = queryString.parse(window.location.hash, {
    arrayFormat: "comma",
    parseBooleans: true,
  });

  const formattedHiddenColumnIds =
    typeof parsedString.hiddenColumnIds === "string"
      ? [parsedString.hiddenColumnIds]
      : (parsedString.hiddenColumnIds as string[]);

  return {
    sortColumnId: parsedString.sortColumnId as string,
    sortOrder: parsedString.sortOrder as "asc" | "desc",
    filterCity: parsedString.filterCity as string,
    filterName: parsedString.filterName as string,
    filterShowActive: parsedString.filterShowActive as boolean,
    selectedRowId: parsedString.selectedRowId as string,
    hiddenColumnIds: formattedHiddenColumnIds,
  };
};
