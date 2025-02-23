import style from "./style.module.sass";
import { useState } from "react";

interface Props {
  label: React.ReactNode;
  name: string;
  onChecked: (checked: boolean) => void;
  initialValue?: boolean;
  value?: boolean;
}

const Checkbox = ({ label, name, onChecked, initialValue, value }: Props) => {
  const [isChecked, setIsChecked] = useState(Boolean(initialValue));

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onChecked(checked);
  };

  return (
    <label className={style.checkboxWrapper}>
      <input
        type="checkbox"
        checked={value ?? isChecked}
        onChange={handleOnChange}
        id={name}
      />
      <label className={style.customCheckbox} htmlFor={name}></label>
      {label}
    </label>
  );
};

export default Checkbox;
