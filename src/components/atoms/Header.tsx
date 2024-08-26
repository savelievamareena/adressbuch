import styles from "./atoms.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <span className={styles.header_text}>ADRESSBUCH</span>
        </header>
    );
};

export default Header;
