import { createContext, useContext, useState } from "react";
import { Contact, ContactsContextInterface } from "./types.ts";
import { initialContextValue } from "./consts.ts";
import jsonData from "./data.json";

interface Props {
  children: React.ReactNode;
}

interface State {
  rows: Contact[];
  selectedRow: null;
}

const ContactsContext =
  createContext<ContactsContextInterface>(initialContextValue);

export const ContactsProvider = ({ children }: Props) => {
  const [state] = useState<State>({
    rows: jsonData.data,
    // rows: [],
    selectedRow: null,
  });

  const contextState = { ...state };

  return (
    <ContactsContext.Provider value={contextState}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => useContext(ContactsContext);
