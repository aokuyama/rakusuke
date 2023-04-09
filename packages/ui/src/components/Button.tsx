import { FC } from "react";
import { css } from "@emotion/react";
import { mainColor, white } from "../styles/color";

type Props = {
  children: React.ReactNode;
};

export const Button: FC<Props> = ({ children }) => {
  return <button css={button}>{children}</button>;
};

const button = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  margin: 0 auto;
  padding: 0.9em 2em;
  border: none;
  border-radius: 5px;
  background-color: ${mainColor.default};
  color: ${white.default};
  font-weight: 600;
  font-size: 1em;
  :hover {
    background-color: ${mainColor.brighter};
  }
`;
