import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { describe, it, expect } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect"; // import jest-dom

describe("Navbar", () => {
  it("renders the navbar", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});


test('renders my component', () => {
  const { getByText } = render(<Navbar />);
  expect(getByText('Hello World'));
});

