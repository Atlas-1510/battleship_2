import { render, screen } from "@testing-library/react";
import { SetupContainer } from "..";

describe("SetupContainer", () => {
  test("Renders UI", () => {
    render(<SetupContainer />);

    expect(screen.getByText("Place your ships")).toBeInTheDocument();
  });
});
