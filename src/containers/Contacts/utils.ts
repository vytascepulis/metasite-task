import { Contact } from "contexts/ContactsContext/types.ts";

export const mockContactImage = (contact?: Contact) => {
  if (!contact) return null;

  return {
    ...contact,
    image: "/public/userpic.png",
    fullName: `${contact.name} ${(contact.surname as string)[0]}.`,
  };
};
