import { FC } from "react";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { textColor } from "../styles/color";

type Props = {
  onClick: () => void;
};

export const CloseButton: FC<Props> = ({ onClick }) => {
  return (
    <button css={styles} onClick={onClick}>
      <FontAwesomeIcon icon={faXmark} width={20} />
    </button>
  );
};

const styles = css`
  display: inline-block;
  ${textColor.disabled}
`;
