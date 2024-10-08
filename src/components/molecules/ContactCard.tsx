import styles from "./molecules.module.css";
import { ContactCardEntity } from "../../types";

type ContactCardProps = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    setSelectedContact: (card: ContactCardEntity) => void;
    clickHandler: () => void;
};

const ContactCard = ({
    id,
    firstname,
    lastname,
    email,
    setSelectedContact,
    clickHandler,
}: ContactCardProps) => {
    return (
        <div
            className={styles.card}
            key={id}
            onClick={() => {
                setSelectedContact({
                    id: id,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                });
                clickHandler();
            }}
        >
            <div className={styles.name}>
                {firstname} {lastname}
            </div>
            <div className={styles.email}>{email}</div>
        </div>
    );
};

export default ContactCard;
