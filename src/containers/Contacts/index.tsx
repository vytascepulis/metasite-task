import style from "./style.module.sass";
import { ContactsProvider } from "contexts/ContactsContext";
import ContactsTable from "./ContactsTable.tsx";
import ContactInfo from "./ContactInfo.tsx";
import FilterBar from "containers/FilterBar";

const Contacts = () => {
  return (
    <ContactsProvider>
      <div className={style.content}>
        <FilterBar />
        <div className={style.contactsInner}>
          <ContactsTable />
          <ContactInfo />
        </div>
      </div>
    </ContactsProvider>
  );
};

export default Contacts;
