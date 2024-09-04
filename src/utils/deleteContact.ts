export const deleteContact = async (contactId: string) => {
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
