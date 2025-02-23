import style from "containers/Contacts/style.module.sass";

const detailsLinesCount = 4;

const ContactInfoSkeleton = () => {
  return (
    <div className={style.contactInfoWrapper}>
      <div className={style.pictureWrapper}>
        <span className={style.skeleton} />
      </div>
      <div className={style.nameWrapper}>
        <span className={style.skeleton} style={{ width: "50%", height: 25 }} />
      </div>
      <div className={style.detailsWrapper}>
        {Array.from({ length: detailsLinesCount }, (_, idx) => (
          <span
            key={idx}
            className={style.skeleton}
            style={{
              width: "60%",
              height: 16,
              gridColumn: "1/3",
              justifySelf: "center",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactInfoSkeleton;
