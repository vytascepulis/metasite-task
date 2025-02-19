import Table from "../Table";
import jsonData from "./data.json";
import "./style.sass";
import { Column } from "../Table/types.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const columns: Column[] = [
  {
    id: "name",
    label: "Name",
    isSortable: true,
    render: (row) => `${row.name} ${row.surname[0]!}.`,
  },
  {
    id: "city",
    label: "City",
    isSortable: true,
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
  },
  {
    id: "phone",
    label: "Phone",
    style: {
      textAlign: "right",
    },
  },
];

const Content = () => {
  const [state, setState] = useState(jsonData.data);

  return (
    <div className="content">
      <button type="button" onClick={() => setState([jsonData.data[0]])}>
        click
      </button>
      <div className="inner">
        <Table columns={columns} data={state} />
      </div>
    </div>
  );
};

export default Content;
