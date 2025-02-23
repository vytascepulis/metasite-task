import { Contact } from "contexts/ContactsContext/types.ts";

export interface SortOptions {
  columnId: string;
  order: "asc" | "desc";
}

export interface FormattedContact extends Contact {
  image: string;
  fullName: string;
}
