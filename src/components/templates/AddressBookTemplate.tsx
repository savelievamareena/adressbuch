import ContactList from "../organisms/ContactList";
import styles from "./templates.module.css";
import { useState } from "react";
import ContactForm from "../organisms/ContactForm";
import { type ContactCardEntity } from "../../types";

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
            {isFormOpen && (
                <ContactForm
                    onClose={closeForm}
                    selectedContact={selectedContact}
                    setSelectedContact={setSelectedContact}
                />
            )}
            <ContactList handleOpenForm={openForm} setSelectedContact={setSelectedContact} />
        </div>
    );
};

export default AddressBookTemplate;
