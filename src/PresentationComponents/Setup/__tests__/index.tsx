import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SetupPresentationComponent from "..";

const mockConfirmShipPlacements = jest.fn();

const getXinput = () => screen.getByRole("spinbutton", { name: "X" });
const getYinput = () => screen.getByRole("spinbutton", { name: "Y" });
const getSubmitButton = () => screen.getByRole("button", { name: "Submit" });
const getDirectionSelector = () => screen.getByRole("combobox");

const setup = () => {
  return render(
    <SetupPresentationComponent
      confirmShipPlacement={mockConfirmShipPlacements}
    />
  );
};

describe("SetupPresentationComponent", () => {
  test("Renders UI", () => {
    setup();

    const button = getSubmitButton();
    expect(button).toBeInTheDocument();
    const Xinput = getXinput();
    expect(Xinput).toBeInTheDocument();
    const Yinput = getYinput();
    expect(Yinput).toBeInTheDocument();
  });

  test("When form is submitted, confirmShipPlacements function is called with correct arguments", () => {
    setup();
    const Xinput = getXinput();
    const Yinput = getYinput();
    // user.type(Xinput, "{ArrowUp>2/}"); // note, trying to programatically change the Xinput to '1'. Doing it by arrow keys doesn't fire the onChange event,
    // so needed to manually 'press' the keyboard keys instead
    user.type(Xinput, "{ArrowLeft}{Backspace}"); // to enter '1'
    user.type(Yinput, "2{ArrowLeft}{Backspace>2}"); // to enter '2'
    const directionSelection = getDirectionSelector();
    user.selectOptions(directionSelection, "horizontal");
    const button = getSubmitButton();
    user.click(button);
    expect(mockConfirmShipPlacements.mock.calls.length).toBe(1);
    expect(mockConfirmShipPlacements.mock.calls[0][0]).toBe(1);
    expect(mockConfirmShipPlacements.mock.calls[0][1]).toBe(2);
    expect(mockConfirmShipPlacements.mock.calls[0][2]).toBe("horizontal");
  });
});
