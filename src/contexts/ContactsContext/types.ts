export interface Contact {
  id: string;
  name: string;
  surname: string;
  city: string;
  email: string;
  phone: string;
  isActive: boolean;
}

export interface ContactsContextInterface {
  rows: Contact[];
  defaultRows: Contact[];
  selectedRow?: Contact;
  onSelectRow: (row?: Contact) => void;
  updateRows: (rows: Contact[]) => void;
  resetRows: () => void;
  isDataLoading: boolean;
}
