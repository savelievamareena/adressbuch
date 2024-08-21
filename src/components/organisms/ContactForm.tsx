import FormPortal from "../molecules/FormPortal.tsx";
import { TextField } from "@mui/material";
import FormButtonsBlock from "../molecules/FormButtonsBlock.tsx";
import styles from "./organisms.module.css";

type ContactFormProps = {
    isOpen: boolean;
    onClose: () => void;
};

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
    if (!isOpen) return null;

    return (
        <FormPortal>
            <div className={styles.overlay}>
                <div className={styles.form_container}>
                    <h2>Neuer Eintrag</h2>
                    <form className={styles.form_fields}>
                        <div className={styles.name_row}>
                            <TextField
                                id="outlined-basic"
                                label="Vorname"
                                variant="outlined"
                                size="small"
                                required
                                fullWidth
                            />
                            <TextField
                                id="outlined-basic"
                                label="Nachname"
                                variant="outlined"
                                size="small"
                                required
                                fullWidth
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-basic"
                                label="E-Mail"
                                variant="outlined"
                                size="small"
                                required
                                fullWidth
                            />
                        </div>
                        <FormButtonsBlock closeHandler={onClose} />
                    </form>
                </div>
            </div>
        </FormPortal>
    );
};

export default ContactForm;
