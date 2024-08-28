import { render, screen, fireEvent } from "@testing-library/react";
import FormButtonsBlock from "../FormButtonsBlock";
import "@testing-library/jest-dom";

describe("FormButtonsBlock Component", () => {
    const mockCloseHandler = jest.fn();
    const mockSubmitHandler = jest.fn();
    const mockDeleteHandler = jest.fn();

    const defaultProps = {
        closeHandler: mockCloseHandler,
        submitHandler: mockSubmitHandler,
        selectedContact: null,
        deleteHandler: mockDeleteHandler,
        isPending: false,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly with given props", () => {
        render(<FormButtonsBlock {...defaultProps} />);

        expect(screen.getByText("Abbrechen")).toBeInTheDocument();
        expect(screen.getByText("Speichern")).toBeInTheDocument();
        expect(screen.queryByText("LOSCHEN")).toBeNull();
    });

    test("renders delete button when selectedContact has an id", () => {
        render(
            <FormButtonsBlock
                {...defaultProps}
                selectedContact={{
                    id: "1",
                    firstname: "John",
                    lastname: "Doe",
                    email: "john.doe@example.com",
                }}
            />
        );

        expect(screen.getByText("LOSCHEN")).toBeInTheDocument();
    });

    test('calls submitHandler and closeHandler when "Speichern" is clicked', () => {
        render(<FormButtonsBlock {...defaultProps} />);

        fireEvent.click(screen.getByText("Speichern"));

        expect(mockSubmitHandler).toHaveBeenCalledTimes(1);
    });

    test('calls deleteHandler and closeHandler when "LOSCHEN" is clicked', () => {
        render(
            <FormButtonsBlock
                {...defaultProps}
                selectedContact={{
                    id: "1",
                    firstname: "John",
                    lastname: "Doe",
                    email: "john.doe@example.com",
                }}
            />
        );

        fireEvent.click(screen.getByText("LOSCHEN"));

        expect(mockDeleteHandler).toHaveBeenCalledTimes(1);
        expect(mockCloseHandler).toHaveBeenCalledTimes(1);
    });

    test('disables "Speichern" button when isPending is true', () => {
        render(<FormButtonsBlock {...defaultProps} isPending={true} />);

        const saveButton = screen.getByText("Speichern");
        expect(saveButton).toBeDisabled();
    });
});
