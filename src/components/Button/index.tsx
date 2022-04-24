import { FC } from "react";

interface Props {
  title: string;
}

export const Button: FC<Props> = ({ title }) => {
  return <button>{title}</button>;
};
