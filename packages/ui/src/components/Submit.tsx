import { FC } from "react";
import { buttonStyles } from "./Button";

type Props = {
  label: string;
  onSubmit?: React.FormEventHandler<HTMLInputElement> | undefined;
};

export const Submit: FC<Props> = ({ label, onSubmit }) => {
  return (
    <input onSubmit={onSubmit} css={buttonStyles} type="submit" value={label} />
  );
};
