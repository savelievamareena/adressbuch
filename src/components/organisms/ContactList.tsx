import AddButton from "../atoms/AddButton.tsx";
import { useQuery } from "@tanstack/react-query";
import ContactCard from "../molecules/ContactCard.tsx";
import styles from "./organisms.module.css";

type ContactCard = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
};

type ContactListProps = {
    handleOpenForm: () => void;
};

const ContactList = ({ handleOpenForm }: ContactListProps) => {
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
                {data?.map((card: ContactCard) => {
                    return (
                        <ContactCard
                            key={card.id}
                            firstname={card.firstname}
                            lastname={card.lastname}
                            email={card.email}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ContactList;
