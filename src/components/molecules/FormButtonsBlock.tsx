import AddButton from "../atoms/AddButton.tsx";
import styles from "./molecules.module.css";
import { type ContactCardEntity } from "../../types.ts";

type FormButtonsBlockProps = {
    closeHandler: () => void;
    submitHandler: () => void;
    selectedContact: null | ContactCardEntity;
    deleteHandler: () => void;
};

const FormButtonsBlock = ({
    closeHandler,
    submitHandler,
    selectedContact,
    deleteHandler,
}: FormButtonsBlockProps) => {
    const formSubmitHandler = () => {
        submitHandler();
        closeHandler();
    };

    const formDeleteHandler = () => {
        deleteHandler();
        closeHandler();
    };

    return (
        <div className={styles.form_buttons}>
            <div>
                {selectedContact?.id && (
                    <AddButton
                        text="LOSCHEN"
                        clickHandler={formDeleteHandler}
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
