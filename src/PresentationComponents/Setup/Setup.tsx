import { FC } from "react";

interface Props {
  handleShipPlacement: () => void;
}

const SetupPresentationComponent: FC<Props> = ({ handleShipPlacement }) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleShipPlacement();
  };
  return (
    <>
      <h1>Place your ships</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <label>
          X
          <input type="number" />
        </label>
        <label>
          Y
          <input type="number" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SetupPresentationComponent;
