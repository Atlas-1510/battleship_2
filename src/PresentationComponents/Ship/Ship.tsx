import React, { FC } from "react";
import { BattleshipContainer, Image } from "./styles";

interface Props {
  onClick: () => void;
  image: string;
}

const Ship: FC<Props> = ({ onClick, image }) => {
  return (
    <BattleshipContainer onClick={onClick}>
      <Image src={image} alt="battleship" />
    </BattleshipContainer>
  );
};

export default Ship;
