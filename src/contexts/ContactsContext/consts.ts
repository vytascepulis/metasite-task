import { ContactsContextInterface } from "./types.ts";
import { createContext, useContext } from "react";

export const initialContextValue: ContactsContextInterface = {
  rows: [],
  defaultRows: [],
  selectedRow: undefined,
  onSelectRow: () => {},
  updateRows: () => {},
  resetRows: () => {},
  isDataLoading: true,
};

export const ContactsContext =
  createContext<ContactsContextInterface>(initialContextValue);

export const useContacts = () => useContext(ContactsContext);
