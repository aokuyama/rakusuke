import { FC } from "react";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onClick: () => void;
};

export const WatchButton: FC<Props> = ({ onClick }) => {
  return (
    <button css={styles} onClick={onClick}>
      <FontAwesomeIcon icon={faEye} width={20} />
    </button>
  );
};

const styles = css`
  display: inline-block;
`;
