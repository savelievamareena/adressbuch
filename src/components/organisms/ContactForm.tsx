import FormPortal from "../molecules/FormPortal";
import { TextField } from "@mui/material";
import FormButtonsBlock from "../molecules/FormButtonsBlock";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type ContactCardEntity } from "../../types";
import styles from "./organisms.module.css";
import { addContact } from "../../utils/addContact";
import { deleteContact } from "../../utils/deleteContact";

type ContactFormProps = {
    onClose: () => void;
    selectedContact: ContactCardEntity;
    setSelectedContact: Dispatch<SetStateAction<ContactCardEntity>>;
};

const ContactForm = ({ onClose, selectedContact, setSelectedContact }: ContactFormProps) => {
    const [validationError, setValidationError] = useState(false);
    const queryClient = useQueryClient();

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValidationError(false);
        const { name, value } = e.target;
        setSelectedContact(
            (prevData: ContactCardEntity): ContactCardEntity => ({
                ...prevData,
                [name]: value,
            })
        );
    };

    const { mutate, isError, error } = useMutation({
        mutationFn: addContact,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
    });

    const {
        mutate: deleteMutation,
        isPending,
        isError: deleteIsError,
    } = useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
    });

    const submitHandler = () => {
        if (!selectedContact.firstname || !selectedContact.lastname || !selectedContact.email) {
            setValidationError(true);
        } else {
            mutate(selectedContact);
            onClose();
        }
    };

    return (
        <FormPortal>
            <div className={styles.overlay}>
                <div className={styles.form_container}>
                    <h2>Neuer Eintrag</h2>
                    <form className={styles.form_fields}>
                        <div className={styles.name_row}>
                            <TextField
                                data-testid="firstname"
                                id="outlined-basic"
                                label="Vorname"
                                variant="outlined"
                                size="small"
                                value={selectedContact.firstname}
                                onChange={changeHandler}
                                name="firstname"
                                required
                                fullWidth
                            />
                            <TextField
                                data-testid="lastname"
                                id="outlined-basic"
                                label="Nachname"
                                variant="outlined"
                                size="small"
                                value={selectedContact.lastname}
                                onChange={changeHandler}
                                name="lastname"
                                required
                                fullWidth
                            />
                        </div>
                        <div>
                            <TextField
                                data-testid="email"
                                id="outlined-basic"
                                label="E-Mail"
                                variant="outlined"
                                size="small"
                                value={selectedContact.email}
                                onChange={changeHandler}
                                name="email"
                                required
                                fullWidth
                            />
                        </div>
                        {(isError || validationError || deleteIsError) && (
                            <div className={styles.error}>
                                {deleteIsError && "Deletion Error"}
                                {error?.message ?? "Please, fill all the fields"}
                            </div>
                        )}
                        <FormButtonsBlock
                            isPending={isPending}
                            selectedContact={selectedContact}
                            closeHandler={onClose}
                            submitHandler={submitHandler}
                            deleteHandler={() => {
                                deleteMutation(selectedContact.id);
                            }}
                        />
                    </form>
                </div>
            </div>
        </FormPortal>
    );
};

export default ContactForm;
