import style from "./style.module.sass";
import Input from "../../components/Input";
import Select from "../../components/Select";
import jsonData from "../Contacts/data.json";
import Checkbox from "../../components/Checkbox";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button";

const FilterBar = () => {
  const cities = Array.from(new Set(jsonData.data.map((d) => d.city)));
  const data = cities.map((c) => ({
    label: c,
    value: c.toLowerCase().replaceAll(" ", "-"),
  }));
  return (
    <div className={style.filterBarWrapper}>
      <div className={style.inner}>
        <Input label="Name" onChange={(val) => console.log(val)} />
        <Select
          label="City"
          options={data}
          onSelect={(val) => console.log("select: ", val)}
        />
        <Checkbox
          name="showActive"
          label={
            <span className={style.showActiveLabel}>
              Show active <FontAwesomeIcon icon={faEye} size="lg" />
            </span>
          }
          onChecked={(val) => console.log("checked: ", val)}
          initialValue={true}
        />
        <Button
          className={style.filterButton}
          onClick={() => console.log("filter click")}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
