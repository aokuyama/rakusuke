import { FC } from "react";
import { Title } from "ui/src/components/Title";
import { css } from "@emotion/react";

interface Props {
  name: string;
}

export const Name: FC<Props> = ({ name }) => {
  return (
    <div css={styles}>
      <Title>{name}</Title>
    </div>
  );
};

const styles = css`
  margin: 0 auto 6px;
  width: 480px;
  text-align: center;
`;
