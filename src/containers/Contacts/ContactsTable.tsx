import Table from "components/Table";
import { Column } from "components/Table/types.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useContacts } from "contexts/ContactsContext/consts";
import { Contact, SortOptions } from "contexts/ContactsContext/types.ts";
import { useEffect, useRef, useState } from "react";
import { getNextSortOptions } from "containers/Contacts/utils.ts";
import {
  getHashValues,
  updateHashValues,
} from "contexts/ContactsContext/utils.ts";

const initialColumns: Column<Contact>[] = [
  {
    id: "name",
    label: "Name",
    isSortable: true,
    isHideable: true,
    render: (row) => `${row.name} ${(row.surname as string)[0]}.`,
  },
  {
    id: "city",
    label: "City",
    isSortable: true,
    isHideable: true,
    render: (row) => row.city,
  },
  {
    id: "activity",
    label: <FontAwesomeIcon icon={faEye} size="lg" />,
    style: {
      width: 50,
      textAlign: "center",
    },
    render: (row) =>
      row.isActive ? <FontAwesomeIcon icon={faEye} size="lg" /> : null,
  },
  {
    id: "email",
    label: "Email",
    isHideable: true,
    render: (row) => row.email,
  },
  {
    id: "phone",
    label: "Phone",
    style: {
      textAlign: "right",
    },
    isHideable: true,
    render: (row) => row.phone,
  },
];

const ContactsTable = () => {
  const {
    rows,
    onSelectRow,
    updateRows,
    resetRows,
    selectedRow,
    isDataLoading,
  } = useContacts();

  const [sort, setSort] = useState<SortOptions | null>(null);
  const [columns, setColumns] = useState<Column<Contact>[]>(initialColumns);

  const refIsHashInit = useRef(false);

  const handleSortRows = (sortOptions: SortOptions) => {
    const copiedRows = [...rows];
    const column = columns.find((c) => c.id === sortOptions.columnId);

    if (!column) return;

    if (sortOptions.order === "desc") {
      copiedRows.sort((a, b) =>
        column.render(a)! < column.render(b)! ? -1 : 1,
      );
    }

    if (sortOptions.order === "asc") {
      copiedRows.sort((a, b) =>
        column.render(a)! > column.render(b)! ? -1 : 1,
      );
    }

    updateRows(copiedRows);

    setColumns((prevState) => {
      return prevState.map((c) => {
        const sortOrder =
          c.id === sortOptions.columnId ? sortOptions.order : undefined;
        return { ...c, sortOrder };
      });
    });
  };

  const onSortChange = (column: Column<Contact>) => {
    const nextSort = getNextSortOptions(column, sort);
    setSort(nextSort);

    updateHashValues({
      sortColumnId: nextSort?.columnId,
      sortOrder: nextSort?.order,
    });

    if (!nextSort) {
      resetRows();
      setColumns((prevState) => {
        return prevState.map((c) => ({
          ...c,
          sortOrder: undefined,
        }));
      });
      return;
    }

    handleSortRows(nextSort);
  };

  const onColumnToggle = (column: Column<Contact>) => {
    if (sort?.columnId === column.id && !column.isHidden) {
      resetRows();
      setSort(null);
    }

    setColumns((prevState) => {
      const newState = prevState.map((c) => {
        if (c.id === column.id) {
          return {
            ...c,
            isHidden: !c.isHidden,
            sortOrder: !c.isHidden ? undefined : c.sortOrder,
          };
        }

        return c;
      });

      const hiddenCols = newState.filter((c) => c.isHidden).map((c) => c.id);

      const { sortColumnId } = getHashValues();
      const isSortedHidden = Boolean(
        sortColumnId && hiddenCols.includes(sortColumnId),
      );

      const sortOptions = isSortedHidden
        ? { sortColumnId: undefined, sortOrder: undefined }
        : {};

      updateHashValues({
        ...sortOptions,
        hiddenColumnIds: hiddenCols,
      });

      return newState;
    });
  };

  useEffect(() => {
    const hashValues = getHashValues();

    if (!refIsHashInit.current && rows.length) {
      if (hashValues.hiddenColumnIds?.length) {
        setColumns((prevState) =>
          prevState.map((c) => {
            if (hashValues.hiddenColumnIds?.includes(c.id)) {
              return { ...c, isHidden: true };
            }

            return c;
          }),
        );
      }

      if (hashValues.selectedRowId) {
        const selectedRow = rows.find((r) => r.id === hashValues.selectedRowId);
        onSelectRow(selectedRow);
      }

      if (hashValues.sortColumnId && hashValues.sortOrder) {
        setSort({
          columnId: hashValues.sortColumnId,
          order: hashValues.sortOrder,
        });

        handleSortRows({
          order: hashValues.sortOrder,
          columnId: hashValues.sortColumnId,
        });
      }

      refIsHashInit.current = true;
    }
  }, [rows]);

  return (
    <Table
      columns={columns}
      data={rows}
      onSelectRow={onSelectRow}
      selectedRow={selectedRow}
      onSortChange={onSortChange}
      onColumnToggle={onColumnToggle}
      isDataLoading={isDataLoading}
    />
  );
};

export default ContactsTable;
