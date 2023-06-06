import { FC } from "react";
import { textColor } from "../styles/color";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export type Item = { id: string | number; name: string; length: number };

type Props = {
  name: string;
  length: number;
  focused: boolean;
  selected: boolean;
  focusHandler?: () => void;
  unfocusHandler?: () => void;
};

export const CountListItem: FC<Props> = ({
  name,
  length,
  focusHandler,
  unfocusHandler,
  focused,
  selected,
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
          ${selected ? textColor.mainColor : ""}
        `,
      ]}
      data-length={length}
      onClick={onClickHandler}
    >
      <p css={textStyle}>
        {focused && <FontAwesomeIcon icon={faCheck} width={16} />}
        {name}
      </p>
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
  p {
    width: 65%;
    svg {
      margin-right: 4px;
    }
  }
  span {
    width: 35%;
  }
`;
