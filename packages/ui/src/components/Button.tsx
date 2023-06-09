import { FC } from "react";
import { css } from "@emotion/react";
import { colorSet, mainColor, white, black } from "../styles/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faAngleRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  isPrimary?: boolean;
  decorationRight?: "arrow-right" | "pen";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export const Button: FC<Props> = ({
  children,
  disabled,
  isPrimary,
  onClick,
  decorationRight,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      css={[buttonStyles, isPrimary ? primaryColor : normalColor]}
    >
      <div>
        <div />
        <span>{children}</span>
        <div>
          {decorationRight == "arrow-right" && (
            <FontAwesomeIcon icon={faAngleRight} width={12} />
          )}
          {decorationRight == "pen" && (
            <FontAwesomeIcon icon={faPenToSquare} width={20} />
          )}
        </div>
      </div>
    </button>
  );
};

export const buttonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  margin: 16px auto;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1em;
  > div {
    padding: 13px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      width: 16px;
      margin: 0 16px;
    }
  }
  :disabled {
    opacity: 0.5;
  }
`;

export const normalColor = css`
  background-color: ${white.default};
  color: ${black.default};
  border: 1px solid ${black.default};
  :not(:disabled):hover {
    border: 1px solid ${mainColor.darker};
    color: ${mainColor.darker};
  }
`;

export const primaryColor = css`
  ${colorSet.main}
  :not(:disabled):hover {
    background-color: ${mainColor.brighter};
  }
`;
