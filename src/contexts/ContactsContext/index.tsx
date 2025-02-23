import { useEffect, useRef, useState } from "react";
import { Contact, ContactsContextInterface } from "./types.ts";
import { ContactsContext } from "./consts.ts";
import useFetch from "hooks/useFetch.ts";

interface Props {
  children: React.ReactNode;
}

interface State {
  rows: Contact[];
  selectedRow?: Contact;
}

export const ContactsProvider = ({ children }: Props) => {
  const [state, setState] = useState<State>({
    rows: [],
    selectedRow: undefined,
  });

  const { handleFetch, isLoading } = useFetch<Contact[]>();

  const refRows = useRef<Contact[]>([]);

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
    defaultRows: refRows.current,
    selectedRow: state.selectedRow,
    onSelectRow,
    updateRows,
    resetRows,
    isDataLoading: isLoading,
  };

  useEffect(() => {
    handleFetch({
      endpoint: "/contacts",
      onUpdate: (data) => {
        updateRows(data);
        refRows.current = data;
      },
      onError: (error) => console.error(error),
    });
  }, []);

  return (
    <ContactsContext.Provider value={contextState}>
      {children}
    </ContactsContext.Provider>
  );
};
