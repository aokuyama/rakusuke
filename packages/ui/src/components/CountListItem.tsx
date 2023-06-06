import { FC } from "react";
import { textColor } from "../styles/color";
import { css } from "@emotion/react";

export type Item = { id: string | number; name: string; length: number };

type Props = {
  name: string;
  length: number;
  focusHandler?: () => void;
  unfocusHandler?: () => void;
  focused: boolean;
};

export const CountListItem: FC<Props> = ({
  name,
  length,
  focusHandler,
  unfocusHandler,
  focused,
}) => {
  const textStyle = length
    ? css`
        text-decoration: underline;
      `
    : undefined;

  const howToCount = "人";
  const onClickHandler = focused ? unfocusHandler : focusHandler;

  return (
    <li
      css={[
        styles,
        css`
          ${length ? "cursor: pointer;" : ""}
          ${length == 0 ? textColor.disabled : ""}
          ${focused ? textColor.mainColor : ""}
        `,
      ]}
      data-length={length}
      onClick={onClickHandler}
    >
      <span css={textStyle}>{name}</span>
      <span css={textStyle}>
        {length}
        {howToCount}
      </span>
    </li>
  );
};

const styles = css`
  width: 50%;
  display: inline-block;
  align-items: center;
  text-align: center;
  display: flex;
  padding: 0 2px;
  margin: 0 0 8px;
  span {
    width: 50%;
  }
`;
