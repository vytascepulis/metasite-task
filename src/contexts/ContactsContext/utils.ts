import { Contact, HashOptions } from "contexts/ContactsContext/types.ts";
import queryString from "query-string";
import { Column } from "components/Table/types.ts";

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

export const formatDataByHash = (
  data: Contact[],
  columns: Column<Contact>[],
) => {
  const {
    sortColumnId,
    sortOrder,
    filterShowActive,
    filterCity,
    filterName,
    hiddenColumnIds,
  } = getHashValues();

  let copiedData = [...data];
  let copiedColumns = [...columns];

  if (filterCity) {
    copiedData = copiedData.filter((r) =>
      r.city.toLowerCase().startsWith(filterCity),
    );
  }

  if (filterName) {
    copiedData = copiedData.filter((r) =>
      r.name.toLowerCase().startsWith(filterName),
    );
  }

  if (filterShowActive) {
    copiedData = copiedData.filter((r) => r.isActive);
  }

  copiedColumns = copiedColumns.map((c) => {
    if (hiddenColumnIds?.includes(c.id)) {
      return {
        ...c,
        isHidden: true,
        sortOrder: undefined,
      };
    }

    return {
      ...c,
      isHidden: false,
      sortOrder: c.id === sortColumnId ? sortOrder : undefined,
    };
  });

  if (sortColumnId && hiddenColumnIds?.includes(sortColumnId)) {
    updateHashValues({
      sortOrder: undefined,
      sortColumnId: undefined,
    });
  }

  if (sortColumnId && sortOrder && !hiddenColumnIds?.includes(sortColumnId)) {
    const sortedColumn = columns.find((c) => c.id === sortColumnId);

    if (sortedColumn && sortOrder === "desc") {
      copiedData.sort((a, b) =>
        sortedColumn.render(a)! < sortedColumn.render(b)! ? -1 : 1,
      );
    }

    if (sortedColumn && sortOrder === "asc") {
      copiedData.sort((a, b) =>
        sortedColumn.render(a)! > sortedColumn.render(b)! ? -1 : 1,
      );
    }
  }

  return { data: copiedData, columns: copiedColumns };
};
