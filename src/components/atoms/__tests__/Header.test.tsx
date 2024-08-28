import { render, screen } from "@testing-library/react";
import Header from "../Header";
import "@testing-library/jest-dom";

describe("Header Component", () => {
    test("renders with correct text", () => {
        render(<Header />);
        const headerText = screen.getByText(/ADRESSBUCH/i);

        expect(headerText).toBeInTheDocument();
    });

    test("has correct class names", () => {
        render(<Header />);
        const header = screen.getByRole("banner");
        const headerText = screen.getByText(/ADRESSBUCH/i);

        expect(header).toHaveClass("header");
        expect(headerText).toHaveClass("header_text");
    });
});
