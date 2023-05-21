import { FC } from "react";
import { css } from "@emotion/react";
import { colorSet, mainColor } from "../styles/color";

type Props = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} css={buttonStyles}>
      {children}
    </button>
  );
};

export const buttonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  margin: 0 auto 12px;
  padding: 0.9em 2em;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1em;
  ${colorSet.main}
  :hover {
    background-color: ${mainColor.brighter};
  }
`;
