import { useState } from "react";
import { Contact } from "./types.ts";
import { ContactsContext } from "./consts.ts";
import jsonData from "./data.json";

interface Props {
  children: React.ReactNode;
}

interface State {
  rows: Contact[];
  selectedRow: null;
}

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
