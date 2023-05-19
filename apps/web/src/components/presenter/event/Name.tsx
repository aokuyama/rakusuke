import { FC } from "react";
import { Title } from "ui/src/components/Title";
import { css } from "@emotion/react";
import { EditButton } from "ui/src/components/EditButton";

interface Props {
  name: string;
  onClick: () => void;
}

export const Name: FC<Props> = ({ name, onClick }) => {
  return (
    <div css={styles}>
      <Title>{name}</Title>
      <EditButton onClick={onClick} />
    </div>
  );
};

const styles = css`
  margin: 16px auto;
  width: 480px;
  text-align: center;
`;
