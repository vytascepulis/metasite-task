import { useEffect, useRef, useState } from "react";
import { Contact, ContactsContextInterface } from "./types.ts";
import { ContactsContext, initialColumns } from "./consts.tsx";
import useFetch from "hooks/useFetch.ts";
import {
  formatDataByHash,
  getHashValues,
  updateHashValues,
} from "contexts/ContactsContext/utils.ts";
import { Column } from "components/Table/types.ts";

interface Props {
  children: React.ReactNode;
}

interface State {
  rows: Contact[];
  columns: Column<Contact>[];
  selectedRow?: Contact;
}

export const ContactsProvider = ({ children }: Props) => {
  const [state, setState] = useState<State>({
    rows: [],
    columns: initialColumns,
    selectedRow: undefined,
  });

  const { handleFetch, isLoading } = useFetch<Contact[]>();

  const refRows = useRef<Contact[]>([]);

  const onSelectRow = (selectedRow?: Contact) => {
    setState((prevState) => ({ ...prevState, selectedRow }));
    updateHashValues({ selectedRowId: selectedRow?.id });
  };

  const updateRows = (rows?: Contact[]) => {
    const { data, columns } = formatDataByHash(
      rows || refRows.current,
      state.columns,
    );

    setState((prevState) => ({ ...prevState, rows: data, columns }));
  };

  const contextState: ContactsContextInterface = {
    rows: state.rows,
    columns: state.columns,
    defaultRows: refRows.current,
    selectedRow: state.selectedRow,
    onSelectRow,
    updateRows,
    isDataLoading: isLoading,
  };

  useEffect(() => {
    handleFetch({
      endpoint: "/contacts",
      onUpdate: (data) => {
        updateRows(data);
        refRows.current = data;

        const foundRow = data.find(
          (d) => d.id === getHashValues().selectedRowId,
        );

        setState((prevState) => ({ ...prevState, selectedRow: foundRow }));
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
