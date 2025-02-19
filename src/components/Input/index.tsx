import style from "./style.module.sass";
import { useState } from "react";
import classNames from "classnames";

interface Props {
  label: string;
  onChange: (value: string) => void;
}

const Input = ({ label, onChange }: Props) => {
  const [value, setValue] = useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    onChange(val);
    setValue(val);
  };

  return (
    <div className={style.inputWrapper}>
      <input
        className={classNames(style.input, { [style.isFilled]: value })}
        type="text"
        onChange={handleOnChange}
        value={value}
      />
      <span className={style.label}>{label}</span>
    </div>
  );
};

export default Input;
