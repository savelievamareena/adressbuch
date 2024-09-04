import { ContactCardEntity } from "../types";

export const addContact = async (selectedContact: ContactCardEntity) => {
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

    const result = await response.json();
    console.log(result);

    return result;
};
