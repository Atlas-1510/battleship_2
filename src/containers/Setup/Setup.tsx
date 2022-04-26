import SetupPresentationComponent from "../../PresentationComponents/Setup";

const SetupContainer = () => {
  const confirmShipPlacement = (
    x: number,
    y: number,
    direction: "horizontal" | "vertical"
  ) => {};

  return (
    <>
      <SetupPresentationComponent confirmShipPlacement={confirmShipPlacement} />
    </>
  );
};
export default SetupContainer;
