import style from "./style.module.sass";
import jsonData from "../../containers/Contacts/data.json";
import { mockContactImage } from "./utils.ts";

interface Props {
  contactId: string;
}

const ContactInfo = ({ contactId }: Props) => {
  const person = jsonData.data.find((c) => c.id === contactId);

  const formattedPerson = mockContactImage(person!);

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
