import { Contact } from "contexts/ContactsContext/types.ts";

export interface FormattedContact extends Contact {
  image: string;
  fullName: string;
}
