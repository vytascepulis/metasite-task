import style from "./style.module.sass";

const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.inner}>
        <a className={style.link} href="/">
          CONTACTIFY
        </a>
      </div>
    </div>
  );
};

export default Header;
