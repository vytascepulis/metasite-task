import style from "./style.module.sass";
import classNames from "classnames";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
}

const Button = ({ children, className, ...rest }: Props) => {
  return (
    <button
      {...rest}
      type="button"
      className={classNames(className, style.button)}
    >
      {children}
    </button>
  );
};

export default Button;
