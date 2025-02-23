import { useRef, useState } from "react";
import { Contact, ContactsContextInterface } from "./types.ts";
import { ContactsContext } from "./consts.ts";
import jsonData from "./data.json";

interface Props {
  children: React.ReactNode;
}

interface State {
  rows: Contact[];
  selectedRow?: Contact;
}

export const ContactsProvider = ({ children }: Props) => {
  const [state, setState] = useState<State>({
    rows: jsonData.data,
    // rows: [],
    selectedRow: undefined,
  });

  const refRows = useRef<Contact[]>(jsonData.data);

  const onSelectRow = (selectedRow?: Contact) => {
    setState((prevState) => ({ ...prevState, selectedRow }));
  };

  const updateRows = (rows: Contact[]) => {
    setState((prevState) => ({ ...prevState, rows }));
  };

  const resetRows = () => {
    setState((prevState) => ({ ...prevState, rows: refRows.current }));
  };

  const contextState: ContactsContextInterface = {
    rows: state.rows,
    defaultRows: jsonData.data,
    selectedRow: state.selectedRow,
    onSelectRow,
    updateRows,
    resetRows,
  };

  return (
    <ContactsContext.Provider value={contextState}>
      {children}
    </ContactsContext.Provider>
  );
};
