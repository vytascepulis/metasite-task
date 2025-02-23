import style from "./style.module.sass";
import { mockContactImage } from "./utils.ts";
import { useContacts } from "contexts/ContactsContext/consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Contact } from "contexts/ContactsContext/types.ts";
import useFetch from "hooks/useFetch.ts";
import { FormattedContact } from "containers/Contacts/types.ts";
import ContactInfoSkeleton from "containers/Contacts/ContactInfoSkeleton.tsx";

const ContactInfo = () => {
  const { selectedRow, onSelectRow } = useContacts();
  const { handleFetch, isLoading } = useFetch<Contact>({ withCache: true });
  const [contact, setContact] = useState<FormattedContact | null>(null);

  useEffect(() => {
    if (selectedRow) {
      handleFetch({
        endpoint: `/contacts/${selectedRow?.id}`,
        onUpdate: (data) => {
          const formattedContact = mockContactImage(data);
          setContact(formattedContact);
        },
        onError: (error) => console.error(error),
      });
    }
  }, [selectedRow]);

  if (!selectedRow) {
    return null;
  }

  if (isLoading || !contact) {
    return <ContactInfoSkeleton />;
  }

  return (
    <div className={style.contactInfoWrapper}>
      <button className={style.clearIcon} onClick={() => onSelectRow()}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className={style.pictureWrapper}>
        <img src={contact.image} alt={contact.fullName} />
      </div>
      <div className={style.nameWrapper}>{contact.fullName}</div>
      <div className={style.detailsWrapper}>
        {contact.name && (
          <>
            <span>Name:</span>
            <span>{contact.fullName}</span>
          </>
        )}
        {contact.city && (
          <>
            <span>City:</span>
            <span>{contact.city}</span>
          </>
        )}
        {contact.email && (
          <>
            <span>Email:</span>
            <span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </span>
          </>
        )}
        {contact.phone && (
          <>
            <span>Phone:</span>
            <span>{contact.phone}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
