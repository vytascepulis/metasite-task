import { ContactsContextInterface } from "./types.ts";
import { createContext, useContext } from "react";

export const initialContextValue: ContactsContextInterface = {
  rows: [],
  selectedRow: null,
};

export const ContactsContext =
  createContext<ContactsContextInterface>(initialContextValue);

export const useContacts = () => useContext(ContactsContext);
