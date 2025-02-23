import style from "./style.module.sass";
import { mockContactImage } from "./utils.ts";
import { useContacts } from "contexts/ContactsContext/consts";

const ContactInfo = () => {
  const { selectedRow, rows } = useContacts();

  const person = rows.find((c) => c.id === selectedRow?.id);
  const formattedPerson = mockContactImage(person);

  if (!formattedPerson) {
    return null;
  }

  return (
    <div className={style.contactInfoWrapper}>
      <div className={style.pictureWrapper}>
        <img src={formattedPerson.image} alt={formattedPerson.fullName} />
      </div>
      <div className={style.nameWrapper}>{formattedPerson.fullName}</div>
      <div className={style.detailsWrapper}>
        {formattedPerson.name && (
          <>
            <span>Name:</span>
            <span>{formattedPerson.fullName}</span>
          </>
        )}
        {formattedPerson.city && (
          <>
            <span>City:</span>
            <span>{formattedPerson.city}</span>
          </>
        )}
        {formattedPerson.email && (
          <>
            <span>Email:</span>
            <span>
              <a href={`mailto:${formattedPerson.email}`}>
                {formattedPerson.email}
              </a>
            </span>
          </>
        )}
        {formattedPerson.phone && (
          <>
            <span>Phone:</span>
            <span>{formattedPerson.phone}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
