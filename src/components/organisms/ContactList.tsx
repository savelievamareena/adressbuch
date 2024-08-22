import AddButton from "../atoms/AddButton.tsx";
import ContactCard from "../molecules/ContactCard.tsx";
import { useQuery } from "@tanstack/react-query";
import { ContactCardEntity } from "../../types.ts";
import styles from "./organisms.module.css";

type ContactListProps = {
    handleOpenForm: () => void;
    setSelectedContact: (card: ContactCardEntity) => void;
};

const ContactList = ({ handleOpenForm, setSelectedContact }: ContactListProps) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["contacts"],
        queryFn: () => fetch("http://localhost:3001/contacts").then((res) => res.json()),
    });

    if (isLoading) return "Loading...";

    if (error) return "Error...";

    return (
        <div>
            <AddButton clickHandler={handleOpenForm} text={"NEUER EINTRAG"} />
            <div className={styles.contacts_grid}>
                {data?.map((card: ContactCardEntity) => {
                    return (
                        <ContactCard
                            key={card.id}
                            id={card.id}
                            firstname={card.firstname}
                            lastname={card.lastname}
                            email={card.email}
                            setSelectedContact={setSelectedContact}
                            clickHandler={handleOpenForm}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ContactList;
