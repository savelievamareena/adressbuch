import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "../ContactForm";
import "@testing-library/jest-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
}));

describe("ContactForm Component", () => {
    const mockOnClose = jest.fn();
    const mockSetSelectedContact = jest.fn();

    const defaultProps = {
        onClose: mockOnClose,
        selectedContact: {
            id: "1",
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
        },
        setSelectedContact: mockSetSelectedContact,
    };

    const mockMutate = jest.fn();
    const mockDeleteMutate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useQueryClient as jest.Mock).mockReturnValue({
            invalidateQueries: jest.fn(),
        });

        (useMutation as jest.Mock).mockImplementation(({ mutationFn }) => {
            if (mutationFn.name === "addContact") {
                return { mutate: mockMutate, isError: false, error: null };
            }
            if (mutationFn.name === "deleteContact") {
                return { mutate: mockDeleteMutate, isPending: false };
            }
            return { mutate: jest.fn(), isError: false, error: null };
        });
    });

    test("displays validation error when required fields are empty", () => {
        render(
            <ContactForm
                {...defaultProps}
                selectedContact={{ id: "1", firstname: "", lastname: "", email: "" }}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: "Speichern" }));

        expect(screen.getByText("Please, fill all the fields")).toBeInTheDocument();
    });

    test("calls submitHandler and mutate when form is submitted with valid data", async () => {
        render(<ContactForm {...defaultProps} />);

        fireEvent.click(screen.getByRole("button", { name: "Speichern" }));

        await waitFor(() => expect(mockMutate).toHaveBeenCalledWith(defaultProps.selectedContact));
        expect(mockOnClose).toHaveBeenCalled();
    });

    test("calls deleteHandler and deleteMutation when delete button is clicked", async () => {
        render(<ContactForm {...defaultProps} />);

        fireEvent.click(screen.getByRole("button", { name: "LOSCHEN" }));

        await waitFor(() =>
            expect(mockDeleteMutate).toHaveBeenCalledWith(defaultProps.selectedContact.id)
        );
    });

    test("shows error message on mutation failure", async () => {
        const errorMessage = "Failed to submit the form";

        (useMutation as jest.Mock).mockImplementation(({ mutationFn }) => {
            if (mutationFn.name === "addContact") {
                return { mutate: mockMutate, isError: true, error: { message: errorMessage } };
            }
            return { mutate: jest.fn(), isError: false, error: null };
        });

        render(<ContactForm {...defaultProps} />);

        fireEvent.click(screen.getByRole("button", { name: "Speichern" }));

        await waitFor(() => expect(screen.getByText(errorMessage)).toBeInTheDocument());
    });

    // test("calls setSelectedContact on input change", () => {
    //     render(<ContactForm {...defaultProps} />);
    //
    //     fireEvent.change(screen.getByTestId("firstname-input"), {
    //         target: { value: "Jane" },
    //     });
    //
    //     expect(mockSetSelectedContact).toHaveBeenCalledWith({
    //         ...defaultProps.selectedContact,
    //         firstname: "Jane",
    //     });
    //
    //     fireEvent.change(screen.getByLabelText("lastname"), {
    //         target: { value: "Doe", name: "lastname" },
    //     });
    //
    //     expect(mockSetSelectedContact).toHaveBeenCalledWith({
    //         ...defaultProps.selectedContact,
    //         lastname: "Doe",
    //     });
    //
    //     fireEvent.change(screen.getByLabelText("email"), {
    //         target: { value: "jane.doe@example.com", name: "email" },
    //     });
    //
    //     expect(mockSetSelectedContact).toHaveBeenCalledWith({
    //         ...defaultProps.selectedContact,
    //         email: "jane.doe@example.com",
    //     });
    // });

    test("does not call mutate if form is closed without submitting", () => {
        render(<ContactForm {...defaultProps} />);

        fireEvent.click(screen.getByRole("button", { name: "Abbrechen" }));

        expect(mockMutate).not.toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalled();
    });

    test("handles delete mutation failure correctly", async () => {
        const deleteErrorMessage = "Deletion Error";

        (useMutation as jest.Mock).mockImplementation(({ mutationFn }) => {
            if (mutationFn.name === "deleteContact") {
                return {
                    mutate: mockDeleteMutate,
                    isError: true,
                    deleteIsError: true,
                    error: { message: deleteErrorMessage },
                };
            }
            return { mutate: jest.fn(), isError: false, deleteIsError: false, error: null };
        });

        render(<ContactForm {...defaultProps} />);

        fireEvent.click(screen.getByRole("button", { name: "LOSCHEN" }));

        await waitFor(() => {
            expect(
                screen.getByText((content) => content.includes(deleteErrorMessage))
            ).toBeInTheDocument();
        });
    });

    test("renders correctly with isPending true", () => {
        (useMutation as jest.Mock).mockImplementation(({ mutationFn }) => {
            if (mutationFn.name === "deleteContact") {
                return {
                    mutate: mockDeleteMutate,
                    isPending: true,
                };
            }
            return { mutate: jest.fn(), isError: false, error: null };
        });

        render(<ContactForm {...defaultProps} />);
        expect(screen.getByRole("button", { name: "LOSCHEN" })).toBeDisabled();
    });
});
