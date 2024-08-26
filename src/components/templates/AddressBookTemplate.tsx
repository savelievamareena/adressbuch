import ContactList from "../organisms/ContactList.tsx";
import styles from "./AddressBookTemplate.module.css";
import { useState } from "react";
import ContactForm from "../organisms/ContactForm.tsx";
import { type ContactCardEntity } from "../../types.ts";

const AddressBookTemplate = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<ContactCardEntity>({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
    });

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setSelectedContact({
            id: "",
            firstname: "",
            lastname: "",
            email: "",
        });
    };
    return (
        <div className={styles.template_layout}>
            <ContactForm
                isOpen={isFormOpen}
                onClose={closeForm}
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
            />
            <ContactList handleOpenForm={openForm} setSelectedContact={setSelectedContact} />
        </div>
    );
};

export default AddressBookTemplate;
