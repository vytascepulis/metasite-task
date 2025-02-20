import { Option } from "./types.ts";
import { useRef, useState } from "react";
import style from "./style.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside.ts";

interface Props {
  label: string;
  options: Option[];
  onSelect: (value: Option | null) => void;
}

const Select = ({ label, options, onSelect }: Props) => {
  const [value, setValue] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  const refSelectWrapper = useRef<HTMLDivElement | null>(null);

  const onClickOutside = () => {
    setIsOpen(false);
    setText(value?.label ?? "");
  };

  useClickOutside({
    element: refSelectWrapper.current as HTMLElement,
    callback: onClickOutside,
  });

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setText(val);

    if (!val) {
      setValue(null);
      onSelect(null);
    }
  };

  const onOptionSelect = (option: Option) => {
    setValue(option);
    setText(option.label);
    setIsOpen(false);

    if (option.value !== value?.value) {
      onSelect(option);
    }
  };

  const handleClearValue = () => {
    setValue(null);
    setText("");
    onSelect(null);
  };

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().startsWith(text.toLowerCase()),
  );

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
      <FontAwesomeIcon
        icon={faCaretDown}
        size="sm"
        className={style.caretSvg}
      />
      {value && (
        <button className={style.clearIcon} onClick={handleClearValue}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
      {isOpen && (
        <div className={style.optionsWrapper}>
          {filteredOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => onOptionSelect(option)}
            >
              {option.label}
            </button>
          ))}
          {filteredOptions.length === 0 && (
            <span className={style.noOptions}>No options found</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
