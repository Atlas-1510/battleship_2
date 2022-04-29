// import SetupContainer from "..";
// test("blank", () => {});

import { render, screen } from "@testing-library/react";
import SetupContainer from "..";
import { GameContext } from "../../../contexts/Game";
import user from "@testing-library/user-event";

import { ShipPlacement } from "../../../interfaces/ShipPlacement";
import { Game } from "../../../interfaces/Game";
import generateGame from "../../../utilities/generateGame";

// RENDERS SETUP CONTAINER WITH SETUP PRESENTATION COMPONENT

const setupWithRealUI = () => {
  return render(<SetupContainer />);
};

const triggerShipPlacement = (placement: ShipPlacement) => {
  if (!placement.ship) {
    throw new Error("triggerShipPlacement missing ship type");
  }
  const shipInput = screen.getByTestId("ship-select");
  const Xinput = screen.getByRole("combobox", { name: "X" });
  const Yinput = screen.getByRole("combobox", { name: "Y" });
  const submitButton = screen.getByRole("button", { name: "Submit" });
  const directionSelector = screen.getByTestId("direction-select");

  user.selectOptions(shipInput, placement.ship);
  user.selectOptions(Xinput, placement.x.toString());
  user.selectOptions(Yinput, placement.y.toString());
  user.selectOptions(directionSelector, placement.direction);
  user.click(submitButton);
};

describe("SetupContainer", () => {
  test("Renders actual UI", () => {
    setupWithRealUI();
    const title = screen.getByText("Place your ships");
    expect(title).toBeInTheDocument();
  });

  test("If recieves valid ship placement, places ship in correct location and updates board UI", () => {
    setupWithRealUI();
    triggerShipPlacement({
      ship: "carrier",
      x: 1,
      y: 1,
      direction: "horizontal",
    });

    const tile_X1_Y1 = screen.getByTestId("1,1");
    const tile_X5_Y1 = screen.getByTestId("5,1");
    const tile_X1_Y5 = screen.getByTestId("1,5");
    expect(tile_X1_Y1.getAttribute("data-ship")).toBe("carrier");
    expect(tile_X5_Y1.getAttribute("data-ship")).toBe("carrier");
    expect(tile_X1_Y5.getAttribute("data-ship")).not.toBe("carrier");
  });

  test("Handles placement of ship when x coordinate is 0", () => {
    //     setupWithRealUI();
    //     triggerShipPlacement({
    //       ship: "carrier",
    //       x: 0,
    //       y: 1,
    //       direction: "horizontal",
    //     });
    //     screen.debug();
    //     const tile_X0_Y1 = screen.getByTestId("0,1");
    //     const tile_X4_Y1 = screen.getByTestId("4,1");
    //     expect(tile_X0_Y1.getAttribute("data-ship")).toBe("carrier");
    //     expect(tile_X4_Y1.getAttribute("data-ship")).toBe("carrier");
    //   });
  });
});

//   // When setupContainer is invoked, no game has been initialised. So it must generate a new one.
//   // Note, because setGame is mocked the call to setGame with the newly initialised game wont cause game state to actually change
//   // Which means the UI won't render for this test (so cant test if 'place your ships' is on the screen)

//   test("Handles placement of ship when y coordinate is 0", () => {
//     const newGame = generateGame();
//     setupWithRealUI(newGame);
//     triggerShipPlacement({
//       ship: {
//         type: "carrier",
//         length: 5,
//         hits: [],
//         alive: true,
//         location: [],
//       },
//       x: 1,
//       y: 0,
//       direction: "vertical",
//     });
//     const expectedGameState: Game = {
//       playerOne: {
//         name: "Player One",
//         type: "human",
//         turn: false,
//       },
//       playerTwo: {
//         name: "Player Two",
//         type: "computer",
//         turn: false,
//       },
//       boardOne: {
//         recievedStrikes: [],
//         ships: [
//           {
//             type: "carrier",
//             length: 5,
//             hits: [],
//             alive: true,
//             location: [
//               {
//                 x: 1,
//                 y: 0,
//               },
//               {
//                 x: 1,
//                 y: 1,
//               },
//               {
//                 x: 1,
//                 y: 2,
//               },
//               {
//                 x: 1,
//                 y: 3,
//               },
//               {
//                 x: 1,
//                 y: 4,
//               },
//             ],
//           },
//         ],
//       },
//       boardTwo: { recievedStrikes: [], ships: [] },
//       moveCounter: 0,
//     };
//     expect(mockSetGame).toHaveBeenCalledWith(expectedGameState);
//   });

//   test("If place ship off board horizontally, render error to user", async () => {
//     const newGame = generateGame();
//     setupWithRealUI(newGame);
//     triggerShipPlacement({
//       ship: {
//         type: "carrier",
//         length: 5,
//         hits: [],
//         alive: true,
//         location: [],
//       },
//       x: 8,
//       y: 1,
//       direction: "horizontal",
//     });

//     const error = await screen.findByText(
//       "Please place the ship entirely on the board"
//     );
//     expect(error).toBeInTheDocument();
//   });

//   test("If place ship off board vertically, render error to user", async () => {
//     const newGame = generateGame();
//     setupWithRealUI(newGame);
//     triggerShipPlacement({
//       ship: {
//         type: "carrier",
//         length: 5,
//         hits: [],
//         alive: true,
//         location: [],
//       },
//       x: 1,
//       y: 8,
//       direction: "vertical",
//     });

//     const error = await screen.findByText(
//       "Please place the ship entirely on the board"
//     );
//     expect(error).toBeInTheDocument();
//   });

//   test("If place ship that overlaps another ship, render error to user", async () => {
//     const initialGameState: Game = {
//       playerOne: {
//         name: "Player One",
//         type: "human",
//         turn: false,
//       },
//       playerTwo: {
//         name: "Player Two",
//         type: "computer",
//         turn: false,
//       },
//       boardOne: {
//         recievedStrikes: [],
//         ships: [
//           {
//             type: "carrier",
//             length: 5,
//             hits: [],
//             alive: true,
//             location: [
//               {
//                 x: 1,
//                 y: 1,
//               },
//               {
//                 x: 2,
//                 y: 1,
//               },
//               {
//                 x: 3,
//                 y: 1,
//               },
//               {
//                 x: 4,
//                 y: 1,
//               },
//               {
//                 x: 5,
//                 y: 1,
//               },
//             ],
//           },
//         ],
//       },
//       boardTwo: { recievedStrikes: [], ships: [] },
//       moveCounter: 0,
//     };
//     setupWithRealUI(initialGameState);
//     triggerShipPlacement({
//       ship: {
//         type: "battleship",
//         length: 4,
//         hits: [],
//         alive: true,
//         location: [],
//       },
//       x: 2,
//       y: 0,
//       direction: "vertical",
//     });
//     const error = await screen.findByText("Ships cannot overlap each other");
//     expect(error).toBeInTheDocument();
//     // Checking that the setGame state updater was not called in response to the invalid ship placement request
//     expect(mockSetGame).not.toHaveBeenCalled();
//   });
// });

//  TESTS FROM PRESENTATION COMPONENT

//   test("When form is submitted, confirmShipPlacements function is called with correct arguments", () => {
//     setup();
//     triggerShipPlacement("carrier", 1, 2, "horizontal");

//     expect(mockConfirmShipPlacements.mock.calls.length).toBe(1);
//     expect(mockConfirmShipPlacements.mock.calls[0][0].ship.type).toBe(
//       "carrier"
//     );
//     expect(mockConfirmShipPlacements.mock.calls[0][0].x).toBe(1);
//     expect(mockConfirmShipPlacements.mock.calls[0][0].y).toBe(2);
//     expect(mockConfirmShipPlacements.mock.calls[0][0].direction).toBe(
//       "horizontal"
//     );
//   });

//   test("If try to submit without selecting ship, render error to user", async () => {
//     setup();
//     triggerShipPlacement(null, 5, 5, "horizontal");
//     const error = await screen.findByText("Please choose ship");
//     expect(error).toBeInTheDocument();
//   });

//   test("If try to submit with invalid coordinates, render error to user", async () => {
//     setup();
//     triggerShipPlacement("carrier", null, null, "horizontal");
//     const error = await screen.findByText("Invalid value for coordinate input");
//     expect(error).toBeInTheDocument();
//   });

//   test("If confirmation error prop is provided, render the error to user", async () => {
//     setup("Some error message from SetupContainer");
//     const error = await screen.findByText(
//       "Some error message from SetupContainer"
//     );
//     expect(error).toBeInTheDocument();
//   });

//   test("Handles when user places a ship with x coordinate equal to 0", () => {
//     setup();
//     triggerShipPlacement("carrier", 0, 1, "horizontal");
//     expect(mockConfirmShipPlacements.mock.calls.length).toBe(1);
//     expect(
//       screen.queryByText("onSubmitShips recieved undefined coordinate")
//     ).not.toBeInTheDocument();
//   });
//   test("Handles when user places a ship with y coordinate equal to 0", () => {
//     setup();
//     triggerShipPlacement("carrier", 1, 0, "horizontal");
//     expect(mockConfirmShipPlacements.mock.calls.length).toBe(1);
//     expect(
//       screen.queryByText("onSubmitShips recieved undefined coordinate")
//     ).not.toBeInTheDocument();
//   });
