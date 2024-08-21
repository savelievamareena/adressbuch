import styles from "./molecules.module.css";

type ContactCardProps = {
    firstname: string;
    lastname: string;
    email: string;
};

const ContactCard = ({ firstname, lastname, email }: ContactCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.name}>
                {firstname} {lastname}
            </div>
            <div>{email}</div>
        </div>
    );
};

export default ContactCard;
