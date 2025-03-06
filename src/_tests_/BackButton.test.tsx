import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BackButton from "../components/BackButton";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("BackButton Component", () => {
    test("renders BackButton correctly", () => {
        render(
            <BrowserRouter>
                <BackButton />
            </BrowserRouter>
        );

        const buttonElement = screen.getByText(/⬅ Back/i);
        expect(buttonElement).toBeInTheDocument();
    });

    test("navigates back when button is clicked", () => {
        render(
            <BrowserRouter>
                <BackButton />
            </BrowserRouter>
        );

        const buttonElement = screen.getByText(/⬅ Back/i);
        fireEvent.click(buttonElement);

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});