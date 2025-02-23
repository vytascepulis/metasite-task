import style from "./style.module.sass";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "components/Input";
import Select from "components/Select";
import Checkbox from "components/Checkbox";
import Button from "components/Button";
import { useRef } from "react";
import { useContacts } from "contexts/ContactsContext/consts.ts";

interface Filters {
  name: string;
  city: string;
  showActive: boolean;
}

const FilterBar = () => {
  const { updateRows, defaultRows } = useContacts();

  const cities = Array.from(new Set(defaultRows.map((d) => d.city)));

  const data = cities.map((c) => ({
    label: c,
    value: c.toLowerCase(),
  }));

  const filters = useRef<Filters>({
    city: "",
    name: "",
    showActive: false,
  });

  const handleOnChange = (key: keyof Filters, value: string | boolean) => {
    filters.current = { ...filters.current, [key]: value };
  };

  const handleFilter = () => {
    let copiedRows = [...defaultRows];

    if (filters.current.city) {
      copiedRows = copiedRows.filter((r) =>
        r.city.toLowerCase().startsWith(filters.current.city),
      );
    }

    if (filters.current.name) {
      copiedRows = copiedRows.filter((r) =>
        r.name.toLowerCase().startsWith(filters.current.name),
      );
    }

    if (filters.current.showActive) {
      copiedRows = copiedRows.filter((r) => r.isActive);
    }

    updateRows(copiedRows);
  };

  return (
    <div className={style.filterBarWrapper}>
      <div className={style.inner}>
        <Input label="Name" onChange={(val) => handleOnChange("name", val)} />
        <Select
          label="City"
          options={data}
          onSelect={(val) => handleOnChange("city", val?.value || "")}
        />
        <Checkbox
          name="showActive"
          label={
            <span className={style.showActiveLabel}>
              Only show active <FontAwesomeIcon icon={faEye} size="lg" />
            </span>
          }
          onChecked={(val) => handleOnChange("showActive", val)}
          initialValue={filters.current.showActive}
        />
        <Button className={style.filterButton} onClick={handleFilter}>
          Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
