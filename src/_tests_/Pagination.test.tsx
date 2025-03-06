import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/Pagination";

describe("Pagination Component", () => {
    test("renders current page and total pages", () => {
        render(<Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} />);

        expect(screen.getByText(/Page 1 of 5/i)).toBeInTheDocument();
    });

    test("disables prev button on first page", () => {
        render(<Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} />);

        expect(screen.getByText(/Prev/i)).toBeDisabled();
    });

    test("disables next button on last page", () => {
        render(<Pagination currentPage={5} totalPages={5} onPageChange={jest.fn()} />);

        expect(screen.getByText(/Next/i)).toBeDisabled();
    });

    test("calls onPageChange with correct page number when prev button is clicked", () => {
        const onPageChangeMock = jest.fn();
        render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChangeMock} />);

        fireEvent.click(screen.getByText(/Prev/i));
        expect(onPageChangeMock).toHaveBeenCalledWith(1);
    });

    test("calls onPageChange with correct page number when next button is clicked", () => {
        const onPageChangeMock = jest.fn();
        render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChangeMock} />);

        fireEvent.click(screen.getByText(/Next/i));
        expect(onPageChangeMock).toHaveBeenCalledWith(3);
    });
});