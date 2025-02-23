import Table from "components/Table";
import { Column } from "components/Table/types.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useContacts } from "contexts/ContactsContext";

const columns: Column[] = [
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
  },
  {
    id: "phone",
    label: "Phone",
    style: {
      textAlign: "right",
    },
    isHideable: true,
  },
];

const ContactsTable = () => {
  const { rows } = useContacts();

  return <Table columns={columns} data={rows} />;
};

export default ContactsTable;
