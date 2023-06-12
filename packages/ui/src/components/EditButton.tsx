import { FC } from "react";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export const EditButton: FC<Props> = ({ onClick, disabled }) => {
  return (
    <button css={styles} onClick={onClick} disabled={disabled}>
      <FontAwesomeIcon icon={faPenToSquare} width={20} />
    </button>
  );
};

const styles = css`
  display: inline-block;
  &[disabled] {
    opacity: 0.5;
  }
`;
