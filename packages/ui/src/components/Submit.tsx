import { FC } from "react";
import { buttonStyles, primaryColor } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
  label: string;
  decorationRight?: "arrow-right";
  onSubmit?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export const Submit: FC<Props> = ({ label, decorationRight, onSubmit }) => {
  return (
    <button onClick={onSubmit} type="submit" css={[buttonStyles, primaryColor]}>
      <div>
        <div />
        <span>{label}</span>
        <div>
          {decorationRight == "arrow-right" && (
            <FontAwesomeIcon icon={faAngleRight} width={12} />
          )}
        </div>
      </div>
    </button>
  );
};
