import Table from "../Table";
import jsonData from "./data.json";
import "./style.sass";
import { Column } from "../Table/types.ts";

const columns: Column[] = [
  {
    id: "name",
    label: "Name",
    isSortable: true,
    render: (row: any) => (
      <>
        {row.name} {row.surname[0]}.
      </>
    ),
  },
  {
    id: "city",
    label: "City",
    isSortable: true,
  },
  {
    id: "activity",
    label: "Activity",
    style: {
      width: 70,
    },
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
  return (
    <div className="content">
      <div className="inner">
        <Table columns={columns} rows={jsonData.data} />
      </div>
    </div>
  );
};

export default Content;
