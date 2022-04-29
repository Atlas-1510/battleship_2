import { ReactNode, FC } from "react";
import { Container } from "./styles";

interface Props {
  children: ReactNode;
}

const SetupView: FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SetupView;
