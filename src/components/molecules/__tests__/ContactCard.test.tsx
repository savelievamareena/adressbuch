import { render, screen, fireEvent } from "@testing-library/react";
import ContactCard from "../ContactCard";
import "@testing-library/jest-dom";

describe("ContactCard Component", () => {
    const mockSetSelectedContact = jest.fn();
    const mockClickHandler = jest.fn();

    const defaultProps = {
        id: "1",
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        setSelectedContact: mockSetSelectedContact,
        clickHandler: mockClickHandler,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly with given props", () => {
        render(<ContactCard {...defaultProps} />);

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    });

    test("calls setSelectedContact and clickHandler on click", () => {
        render(<ContactCard {...defaultProps} />);

        const card = screen.getByText("John Doe");
        fireEvent.click(card);

        expect(mockSetSelectedContact).toHaveBeenCalledWith({
            id: "1",
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
        });

        expect(mockClickHandler).toHaveBeenCalledTimes(1);
    });
});
