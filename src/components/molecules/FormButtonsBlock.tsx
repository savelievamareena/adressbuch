import AddButton from "../atoms/AddButton.tsx";
import styles from "./molecules.module.css";
import { type ContactCardEntity } from "../../types.ts";

type FormButtonsBlockProps = {
    closeHandler: () => void;
    submitHandler: () => void;
    selectedContact: null | ContactCardEntity;
};

const FormButtonsBlock = ({
    closeHandler,
    submitHandler,
    selectedContact,
}: FormButtonsBlockProps) => {
    const formSubmitHandler = () => {
        submitHandler();
        closeHandler();
    };

    return (
        <div className={styles.form_buttons}>
            <div>
                {selectedContact?.email && (
                    <AddButton
                        text="LOSCHEN"
                        clickHandler={closeHandler}
                        variant="text"
                        color="error"
                    />
                )}
            </div>
            <div className={styles.form_right_buttons}>
                <AddButton
                    text="Abbrechen"
                    clickHandler={closeHandler}
                    variant="outlined"
                    color={"secondary"}
                />
                <AddButton text="Speichern" clickHandler={formSubmitHandler} />
            </div>
        </div>
    );
};

export default FormButtonsBlock;
