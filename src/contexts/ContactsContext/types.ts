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
  selectedRow: Contact | null;
  onSelectRow: (row: Contact) => void;
  updateRows: (rows: Contact[]) => void;
  resetRows: () => void;
}
