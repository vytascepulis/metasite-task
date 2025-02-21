import { Contact } from "./types.ts";

export const mockContactImage = (contact: Contact) => {
  return {
    ...contact,
    image: "/public/userpic.png",
    fullName: `${contact.name} ${contact.surname[0]}.`,
  };
};
