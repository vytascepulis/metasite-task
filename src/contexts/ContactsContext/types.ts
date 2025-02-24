import { Column } from "components/Table/types.ts";

export interface Contact {
  id: string;
  name: string;
  surname: string;
  city: string;
  email: string;
  phone: string;
  isActive: boolean;
}

export interface SortOptions {
  columnId: string;
  order: "asc" | "desc";
}

export interface Filters {
  name: string;
  city: string;
  showActive: boolean;
}

export type HashOptions = Partial<{
  sortColumnId: SortOptions["columnId"];
  sortOrder: SortOptions["order"];
  filterName: Filters["name"];
  filterCity: Filters["city"];
  filterShowActive: Filters["showActive"];
  selectedRowId: Contact["id"] | undefined;
  hiddenColumnIds: Column<Contact>["id"][];
}>;

export interface ContactsContextInterface {
  rows: Contact[];
  defaultRows: Contact[];
  selectedRow?: Contact;
  onSelectRow: (row?: Contact) => void;
  updateRows: (rows: Contact[]) => void;
  resetRows: () => void;
  isDataLoading: boolean;
}
