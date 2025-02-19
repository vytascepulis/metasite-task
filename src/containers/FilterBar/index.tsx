import style from "./style.module.sass";
import Input from "../../components/Input";

const FilterBar = () => {
  return (
    <div className={style.filterBarWrapper}>
      <div className={style.inner}>
        <Input label="test label" onChange={(val) => console.log(val)} />
      </div>
    </div>
  );
};

export default FilterBar;
