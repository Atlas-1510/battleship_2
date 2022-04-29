import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode;
}

const SetupView: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default SetupView;
