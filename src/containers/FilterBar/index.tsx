import style from "./style.module.sass";
import Input from "../../components/Input";
import Select from "../../components/Select";

const FilterBar = () => {
  return (
    <div className={style.filterBarWrapper}>
      <div className={style.inner}>
        <Input label="Name" onChange={(val) => console.log(val)} />
        <Select
          label="City"
          options={[{ value: "value", label: "Label" }]}
          onSelect={(val) => console.log("select: ", val)}
        />
      </div>
    </div>
  );
};

export default FilterBar;
