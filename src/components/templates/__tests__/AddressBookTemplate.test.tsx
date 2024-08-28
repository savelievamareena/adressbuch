import { ReactElement } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddressBookTemplate from "../AddressBookTemplate";
import "@testing-library/jest-dom";

describe("AddressBookTemplate Component", () => {
    const queryClient = new QueryClient();

    const renderWithClient = (ui: ReactElement) => {
        return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
    };

    beforeEach(() => {
        renderWithClient(<AddressBookTemplate />);
    });

    test("renders the component with ContactForm and ContactList", () => {
        expect(screen.getByText("NEUER EINTRAG")).toBeInTheDocument();
        expect(screen.queryByLabelText("Vorname")).toBeNull();
    });

    test('opens the form when "NEUER EINTRAG" button is clicked', () => {
        fireEvent.click(screen.getByText("NEUER EINTRAG"));

        expect(screen.getByRole("textbox", { name: /Vorname/i })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /Nachname/i })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /E-Mail/i })).toBeInTheDocument();
    });

    test('closes the form when "Abbrechen" button is clicked', () => {
        fireEvent.click(screen.getByText("NEUER EINTRAG"));
        fireEvent.click(screen.getByText("Abbrechen"));

        expect(screen.queryByLabelText("Vorname")).toBeNull();
    });

    test("resets the selected contact when the form is closed", () => {
        fireEvent.click(screen.getByText("NEUER EINTRAG"));

        fireEvent.change(screen.getByRole("textbox", { name: /Vorname/i }), {
            target: { value: "John" },
        });
        fireEvent.change(screen.getByRole("textbox", { name: /Nachname/i }), {
            target: { value: "Doe" },
        });
        fireEvent.change(screen.getByRole("textbox", { name: /E-Mail/i }), {
            target: { value: "john.doe@example.com" },
        });

        fireEvent.click(screen.getByText("Abbrechen"));
        fireEvent.click(screen.getByText("NEUER EINTRAG"));

        expect(screen.getByRole("textbox", { name: /Vorname/i })).toHaveValue("");
        expect(screen.getByRole("textbox", { name: /Vorname/i })).toHaveValue("");
        expect(screen.getByRole("textbox", { name: /E-Mail/i })).toHaveValue("");
    });
});
