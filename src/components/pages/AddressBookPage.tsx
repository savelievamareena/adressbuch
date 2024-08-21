import Header from "../atoms/Header.tsx";
import AddressBookTemplate from "../templates/AddressBookTemplate.tsx";
import styles from "./AddressBookPage.module.css"

const AddressBookPage = () => {
    return (
        <main className={styles.layout}>
            <Header />
            <AddressBookTemplate/>
        </main>
    );
};

export default AddressBookPage;
