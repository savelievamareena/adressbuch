import ContactList from "../organisms/ContactList.tsx";
import styles from "./AddressBookTemplate.module.css";
import { useState } from "react";
import ContactForm from "../organisms/ContactForm.tsx";

const AddressBookTemplate = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };
    return (
        <div className={styles.template_layout}>
            <ContactForm isOpen={isFormOpen} onClose={closeForm} />
            <ContactList handleOpenForm={openForm} />
        </div>
    );
};

export default AddressBookTemplate;
