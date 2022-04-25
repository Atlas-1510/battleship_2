import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: React.MouseEventHandler;
}

export const Button: FC<Props> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};
