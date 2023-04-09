import { FC } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import { OnChangeFunc } from "react-calendar/dist/cjs/shared/types";
import { css, Global } from "@emotion/react";
import { mainColor } from "../styles/color";
import CalendarCSS from "react-calendar/dist/Calendar.css";

type Props = {
  value?: Date | undefined;
  onChangeFunc: OnChangeFunc | undefined;
  defaultActiveStartDate?: Date | undefined;
};

export const Calendar: FC<Props> = ({
  value,
  onChangeFunc,
  defaultActiveStartDate,
}) => {
  return (
    <>
      <Global styles={CalendarCSS} />
      <ReactCalendar
        css={calendar}
        locale="ja-JP"
        value={value}
        onClickDay={onChangeFunc}
        defaultActiveStartDate={defaultActiveStartDate}
        minDate={defaultActiveStartDate}
      />
    </>
  );
};

const calendar = css`
  .react-calendar__month-view__days__day--weekend:nth-child(7n-1) {
    color: #00f;
  }
  .react-calendar__tile--active {
    background-color: ${mainColor.default};
  }
`;
