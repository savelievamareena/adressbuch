import FormPortal from "../molecules/FormPortal.tsx";
import { TextField } from "@mui/material";
import FormButtonsBlock from "../molecules/FormButtonsBlock.tsx";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type ContactCardEntity } from "../../types.ts";
import styles from "./organisms.module.css";

type ContactFormProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedContact: ContactCardEntity;
    setSelectedContact: Dispatch<SetStateAction<ContactCardEntity>>;
};

const ContactForm = ({
    isOpen,
    onClose,
    selectedContact,
    setSelectedContact,
}: ContactFormProps) => {
    if (!isOpen) return null;

    const [validationError, setValidationError] = useState(false);
    const queryClient = useQueryClient();

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedContact(
            (prevData: ContactCardEntity): ContactCardEntity => ({
                ...prevData,
                [name]: value,
            })
        );
    };

    const addContact = async (selectedContact: ContactCardEntity) => {
        const url = selectedContact.id
            ? `http://localhost:3001/contacts/${selectedContact.id}`
            : "http://localhost:3001/contacts";

        const method = selectedContact.id ? "PUT" : "POST";

        const contactData = selectedContact.id
            ? selectedContact
            : { ...selectedContact, id: undefined };

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
        });
        if (!response.ok) {
            throw new Error("Failed to submit the form");
        }
        return await response.json();
    };

    const deleteContact = async (contactId: string) => {
        const response = await fetch(`http://localhost:3001/contacts/${contactId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactId),
        });
        if (!response.ok) {
            throw new Error("Failed to submit the form");
        }
        return await response.json();
    };

    const { mutate, isError, error } = useMutation({
        mutationFn: addContact,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
    });

    const { mutate: deleteMutation, isPending } = useMutation({
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
                        {(isError || validationError) && (
                            <div className={styles.error}>{error?.message ?? "Fill the form"}</div>
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
