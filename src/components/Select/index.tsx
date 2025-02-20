import { Option } from "./types.ts";
import { useEffect, useRef, useState } from "react";
import style from "./style.module.sass";
import Input from "../Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

interface Props {
  label: string;
  options: Option[];
  onSelect: (value: Option) => void;
}

const Select = ({ label, options, onSelect }: Props) => {
  const [value, setValue] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  const refSelectWrapper = useRef<HTMLDivElement | null>(null);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setText(val);
  };

  const handleMouseDown = (e: MouseEvent) => {
    const isOutside = e.target !== refSelectWrapper.current;
    console.log("target: ", e.target.children);
    console.log("wrapper: ", refSelectWrapper.current);
    console.log("e: ", e);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div className={style.selectWrapper} ref={refSelectWrapper}>
      <input
        className={classNames(style.input, {
          [style.isFilled]: text,
          [style.isOpen]: isOpen,
        })}
        type="text"
        onChange={onTextChange}
        value={text}
        onFocus={() => setIsOpen(true)}
      />
      <span className={style.label}>{label}</span>
      <FontAwesomeIcon icon={faCaretDown} size="sm" />
      {isOpen && <div className={style.optionsWrapper}>options</div>}
    </div>
  );
};

export default Select;
