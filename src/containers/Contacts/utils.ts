import { Contact, SortOptions } from "contexts/ContactsContext/types.ts";
import { Column } from "components/Table/types.ts";
import { FormattedContact } from "containers/Contacts/types.ts";

export const mockContactImage = (contact: Contact): FormattedContact => {
  return {
    ...contact,
    image: "/userpic.png",
    fullName: `${contact.name} ${(contact.surname as string)[0]}.`,
  };
};

export const getNextSortOptions = (
  column: Column<Contact>,
): SortOptions | null => {
  if (column.sortOrder === "asc") {
    return null;
  }

  return {
    columnId: column.id,
    order: !column.sortOrder ? "desc" : "asc",
  };
};
