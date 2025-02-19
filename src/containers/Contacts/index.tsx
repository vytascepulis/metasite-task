import Table from "../../components/Table";
import jsonData from "./data.json";
import "./style.sass";
import { Column } from "../../components/Table/types.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
    label: <FontAwesomeIcon icon={faEye} />,
    style: {
      width: 50,
      textAlign: "center",
    },
    render: (row) => (row.isActive ? <FontAwesomeIcon icon={faEye} /> : null),
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

  return (
    <div className="content">
      <div className="inner">
        <Table columns={columns} data={state} />
      </div>
    </div>
  );
};

export default Contacts;
