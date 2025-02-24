import Table from "components/Table";
import { Column } from "components/Table/types.ts";
import { useContacts } from "contexts/ContactsContext/consts.tsx";
import { Contact } from "contexts/ContactsContext/types.ts";
import { getNextSortOptions } from "containers/Contacts/utils.ts";
import { updateHashValues } from "contexts/ContactsContext/utils.ts";

const ContactsTable = () => {
  const { rows, columns, onSelectRow, updateRows, selectedRow, isDataLoading } =
    useContacts();

  const onSortChange = (column: Column<Contact>) => {
    const nextSort = getNextSortOptions(column);

    updateHashValues({
      sortColumnId: nextSort?.columnId,
      sortOrder: nextSort?.order,
    });

    updateRows();
  };

  const onColumnToggle = (column: Column<Contact>) => {
    let hiddenCols = columns.filter((c) => c.isHidden).map((c) => c.id);

    if (hiddenCols.includes(column.id)) {
      hiddenCols = hiddenCols.filter((c) => c !== column.id);
    } else {
      hiddenCols.push(column.id);
    }

    updateHashValues({
      hiddenColumnIds: hiddenCols,
    });

    updateRows();
  };

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
