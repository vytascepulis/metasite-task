import { Contact } from "contexts/ContactsContext/types.ts";
import { Column } from "components/Table/types.ts";
import { SortOptions } from "containers/Contacts/types.ts";

export const mockContactImage = (contact?: Contact) => {
  if (!contact) return null;

  return {
    ...contact,
    image: "/public/userpic.png",
    fullName: `${contact.name} ${(contact.surname as string)[0]}.`,
  };
};

export const getNextSortOptions = (
  column: Column<Contact>,
  currentSort: SortOptions | null,
): SortOptions | null => {
  if (currentSort?.columnId !== column.id) {
    return {
      columnId: column.id,
      order: "desc",
    };
  }

  switch (currentSort.order) {
    case "desc":
      return {
        ...currentSort,
        order: "asc",
      };
    case "asc":
      return null;
  }
};
