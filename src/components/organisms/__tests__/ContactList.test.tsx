import { render, screen, fireEvent } from "@testing-library/react";
import ContactList from "../ContactList";
import "@testing-library/jest-dom";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
    useQuery: jest.fn(),
}));

describe("ContactList Component", () => {
    const mockHandleOpenForm = jest.fn();
    const mockSetSelectedContact = jest.fn();

    const contactsData = [
        { id: "1", firstname: "John", lastname: "Doe", email: "john.doe@example.com" },
        { id: "2", firstname: "Jane", lastname: "Smith", email: "jane.smith@example.com" },
    ];

    beforeEach(() => {
        (useQuery as jest.Mock).mockReturnValue({
            data: contactsData,
            isLoading: false,
            error: null,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly with fetched data", () => {
        render(
            <ContactList
                handleOpenForm={mockHandleOpenForm}
                setSelectedContact={mockSetSelectedContact}
            />
        );

        expect(screen.getByText("NEUER EINTRAG")).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    test("displays loading state", () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: [],
            isLoading: true,
            error: null,
        });

        render(
            <ContactList
                handleOpenForm={mockHandleOpenForm}
                setSelectedContact={mockSetSelectedContact}
            />
        );

        expect(screen.getByText("...Loading")).toBeInTheDocument();
    });

    test("displays error state", () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            error: new Error("Failed to fetch data"),
        });

        render(
            <ContactList
                handleOpenForm={mockHandleOpenForm}
                setSelectedContact={mockSetSelectedContact}
            />
        );

        expect(screen.getByText("Error...")).toBeInTheDocument();
    });

    test("calls handleOpenForm when AddButton is clicked", () => {
        render(
            <ContactList
                handleOpenForm={mockHandleOpenForm}
                setSelectedContact={mockSetSelectedContact}
            />
        );

        fireEvent.click(screen.getByText("NEUER EINTRAG"));
        fireEvent.click(screen.getByText("+"));

        expect(mockHandleOpenForm).toHaveBeenCalledTimes(2);
    });

    test("renders contact cards correctly", () => {
        render(
            <ContactList
                handleOpenForm={mockHandleOpenForm}
                setSelectedContact={mockSetSelectedContact}
            />
        );

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
});
