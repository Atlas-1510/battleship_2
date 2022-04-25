import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SetupPresentationComponent from "..";

const mockHandleShipPlacement = jest.fn();

const setup = () => {
  return render(
    <SetupPresentationComponent handleShipPlacement={mockHandleShipPlacement} />
  );
};

describe("SetupPresentationComponent", () => {
  test("Renders UI", () => {
    setup();
    // expect submit button
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
    // expect form inputs
    const Xinput = screen.getByRole("spinbutton", { name: "X" });
    expect(Xinput).toBeInTheDocument();
    const Yinput = screen.getByRole("spinbutton", { name: "Y" });
    expect(Yinput).toBeInTheDocument();
  });

  test("When form is submitted, the provided submitHandler function is called", () => {
    setup();
    const button = screen.getByRole("button", { name: "Submit" });
    user.click(button);
    expect(mockHandleShipPlacement.mock.calls.length).toBe(1);
  });
});
