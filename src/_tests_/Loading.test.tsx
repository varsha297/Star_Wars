import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

describe("Loading Component", () => {
    test("renders loading spinner and message", () => {
        render(<Loading />);

        const spinnerElement = screen.getByRole("status");
        const messageElement = screen.getByText(/Loading.../i);

        expect(spinnerElement).toBeInTheDocument();
        expect(messageElement).toBeInTheDocument();
    });
});