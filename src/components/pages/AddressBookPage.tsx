import Header from "../atoms/Header";
import AddressBookTemplate from "../templates/AddressBookTemplate";
import styles from "./pages.module.css";

const AddressBookPage = () => {
    return (
        <main className={styles.layout}>
            <Header />
            <AddressBookTemplate />
        </main>
    );
};

export default AddressBookPage;
