import style from "./style.module.sass";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "components/Input";
import Select from "components/Select";
import Checkbox from "components/Checkbox";
import Button from "components/Button";
import { useRef } from "react";
import { useContacts } from "contexts/ContactsContext/consts.tsx";
import { Filters } from "contexts/ContactsContext/types.ts";
import {
  getHashValues,
  updateHashValues,
} from "contexts/ContactsContext/utils.ts";

const FilterBar = () => {
  const { updateRows, defaultRows } = useContacts();

  const cities = Array.from(new Set(defaultRows.map((d) => d.city)));
  const citiesOptions = cities.map((c) => ({
    label: c,
    value: c.toLowerCase(),
  }));

  const { filterCity, filterName, filterShowActive } = getHashValues();
  const filters = useRef<Filters>({
    city: filterCity || "",
    name: filterName || "",
    showActive: Boolean(filterShowActive),
  });

  const handleOnChange = (key: keyof Filters, value: string | boolean) => {
    filters.current = { ...filters.current, [key]: value };
  };

  const handleFilter = () => {
    updateHashValues({
      filterCity: filters.current.city,
      filterName: filters.current.name,
      filterShowActive: !filters.current.showActive ? undefined : true,
    });

    updateRows();
  };

  const initialSelection = citiesOptions.find(
    (option) => option.value === getHashValues().filterCity,
  );

  return (
    <div className={style.filterBarWrapper}>
      <div className={style.inner}>
        <Input
          label="Name"
          onChange={(val) => handleOnChange("name", val)}
          initialValue={getHashValues().filterName}
        />
        <Select
          label="City"
          options={citiesOptions}
          onSelect={(val) => handleOnChange("city", val?.value || "")}
          initialSelection={initialSelection}
        />
        <Checkbox
          name="showActive"
          label={
            <span className={style.showActiveLabel}>
              Only show active <FontAwesomeIcon icon={faEye} size="lg" />
            </span>
          }
          onChecked={(val) => handleOnChange("showActive", val)}
          initialValue={Boolean(getHashValues().filterShowActive)}
        />
        <Button className={style.filterButton} onClick={handleFilter}>
          Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
