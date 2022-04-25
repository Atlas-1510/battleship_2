import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: React.MouseEventHandler;
}

const Button: FC<Props> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};
export default Button;
