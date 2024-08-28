import { render, screen, fireEvent } from "@testing-library/react";
import AddButton from "../AddButton";
import "@testing-library/jest-dom";

describe("AddButton Component", () => {
    test("renders with default props", () => {
        render(<AddButton clickHandler={() => {}} text="Click Me" />);
        const button = screen.getByRole("button", { name: /click me/i });

        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });

    test("renders with custom props", () => {
        render(
            <AddButton clickHandler={() => {}} text="Submit" color="secondary" variant="outlined" />
        );
        const button = screen.getByRole("button", { name: /submit/i });

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("MuiButton-outlinedSecondary");
    });

    test("handles click events", () => {
        const handleClick = jest.fn();
        render(<AddButton clickHandler={handleClick} text="Click Me" />);
        const button = screen.getByRole("button", { name: /click me/i });

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("renders in a disabled state when isPending is true", () => {
        render(<AddButton clickHandler={() => {}} text="Loading" isPending />);
        const button = screen.getByRole("button", { name: /loading/i });

        expect(button).toBeDisabled();
    });
});
