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

    if (error) return "Error...";

    return (
        <div className={styles.address_book}>
            <div className={styles.add_button}>
                <AddButton clickHandler={handleOpenForm} text={"NEUER EINTRAG"} />
            </div>
            {isLoading ? (
                <div>"...Loading"</div>
            ) : (
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
            )}
            <button className={styles.floating_button} onClick={handleOpenForm}>
                +
            </button>
        </div>
    );
};

export default ContactList;
