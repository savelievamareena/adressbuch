import AddButton from "../atoms/AddButton.tsx";
import styles from "./molecules.module.css";

type FormButtonsBlockProps = {
    closeHandler: () => void;
};

const FormButtonsBlock = ({ closeHandler }: FormButtonsBlockProps) => {
    return (
        <div className={styles.buttons}>
            {}
            <AddButton
                text="Abbrechen"
                clickHandler={closeHandler}
                variant="outlined"
                color={"secondary"}
            />
            <AddButton text="Speichern" clickHandler={closeHandler} />
        </div>
    );
};

export default FormButtonsBlock;
