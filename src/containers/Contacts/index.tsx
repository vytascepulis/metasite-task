import Table from "../../components/Table";
import jsonData from "./data.json";
import style from "./style.module.sass";
import { Column } from "../../components/Table/types.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ContactInfo from "../../components/ContactInfo";
import FilterBar from "../FilterBar";

const columns: Column[] = [
  {
    id: "name",
    label: "Name",
    isSortable: true,
    isHideable: true,
    render: (row) => `${row.name} ${row.surname[0]!}.`,
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

const Contacts = () => {
  const [state] = useState(jsonData.data);

  const person = jsonData.data[0];

  return (
    <div className={style.content}>
      <FilterBar />
      <div className={style.contactsInner}>
        <Table columns={columns} data={state} />
        <ContactInfo contactId={person.id} />
      </div>
    </div>
  );
};

export default Contacts;
