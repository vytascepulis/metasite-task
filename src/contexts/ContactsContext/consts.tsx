import { Contact, ContactsContextInterface } from "./types.ts";
import { createContext, useContext } from "react";
import { Column } from "components/Table/types.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export const initialContextValue: ContactsContextInterface = {
  rows: [],
  columns: [],
  defaultRows: [],
  selectedRow: undefined,
  onSelectRow: () => {},
  updateRows: () => {},
  isDataLoading: true,
};

export const ContactsContext =
  createContext<ContactsContextInterface>(initialContextValue);

export const useContacts = () => useContext(ContactsContext);

export const initialColumns: Column<Contact>[] = [
  {
    id: "name",
    label: "Name",
    isSortable: true,
    isHideable: true,
    render: (row) => `${row.name} ${(row.surname as string)[0]}.`,
  },
  {
    id: "city",
    label: "City",
    isSortable: true,
    isHideable: true,
    render: (row) => row.city,
  },
  {
    id: "activity",
    label: <FontAwesomeIcon icon={faEye} size="lg" />,
    style: {
      width: 50,
      textAlign: "center",
    },
    render: (row) =>
      row.isActive ? <FontAwesomeIcon icon={faEye} size="lg" /> : null,
  },
  {
    id: "email",
    label: "Email",
    isHideable: true,
    render: (row) => row.email,
  },
  {
    id: "phone",
    label: "Phone",
    style: {
      textAlign: "right",
    },
    isHideable: true,
    render: (row) => row.phone,
  },
];
