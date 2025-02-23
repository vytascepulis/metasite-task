import Table from "components/Table";
import { Column } from "components/Table/types.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useContacts } from "contexts/ContactsContext/consts";
import { Contact } from "contexts/ContactsContext/types.ts";
import { useState } from "react";
import { SortOptions } from "containers/Contacts/types.ts";
import { getNextSortOptions } from "containers/Contacts/utils.ts";

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
  const { rows, onSelectRow, updateRows, resetRows } = useContacts();

  const [sort, setSort] = useState<SortOptions | null>(null);
  const [columns, setColumns] = useState<Column<Contact>[]>(initialColumns);

  const onSortChange = (column: Column<Contact>) => {
    const nextSort = getNextSortOptions(column, sort);
    setSort(nextSort);

    setColumns((prevState) => {
      return prevState.map((c) => {
        const sortOrder =
          c.id === nextSort?.columnId ? nextSort.order : undefined;
        return { ...c, sortOrder };
      });
    });

    if (!nextSort) {
      resetRows();
      return;
    }

    const copiedRows = [...rows];

    if (nextSort.order === "desc") {
      copiedRows.sort((a, b) =>
        column.render(a)! < column.render(b)! ? -1 : 1,
      );
    }

    if (nextSort.order === "asc") {
      copiedRows.sort((a, b) =>
        column.render(a)! > column.render(b)! ? -1 : 1,
      );
    }

    updateRows(copiedRows);
  };

  const onColumnToggle = (column: Column<Contact>) => {
    if (sort?.columnId === column.id && !column.isHidden) {
      resetRows();
      setSort(null);
    }

    setColumns((prevState) => {
      return prevState.map((c) => {
        if (c.id === column.id) {
          return {
            ...c,
            isHidden: !c.isHidden,
            sortOrder: !c.isHidden ? undefined : c.sortOrder,
          };
        }

        return c;
      });
    });
  };

  return (
    <Table
      columns={columns}
      data={rows}
      onSelectRow={onSelectRow}
      onSortChange={onSortChange}
      onColumnToggle={onColumnToggle}
    />
  );
};

export default ContactsTable;
