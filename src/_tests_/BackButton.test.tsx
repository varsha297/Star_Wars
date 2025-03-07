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

        expect(screen.getByTestId("back")).toBeInTheDocument();
    });

    test("navigates back when button is clicked", () => {
        render(
            <BrowserRouter>
                <BackButton />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId("back"));

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});