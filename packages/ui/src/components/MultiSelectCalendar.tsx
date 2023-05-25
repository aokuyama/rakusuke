import { FC } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import { OnChangeFunc } from "react-calendar/dist/cjs/shared/types";
import { css, Global } from "@emotion/react";
import { backgroundColor, mainColor } from "../styles/color";
import { format } from "date-fns";
import { boxSize } from "../styles/size";

type Props = {
  selectedDates: Date[];
  locale: string;
  onChangeFunc: OnChangeFunc | undefined;
  minDate?: Date;
  maxDate?: Date;
};

export const MultiSelectCalendar: FC<Props> = ({
  selectedDates,
  locale,
  onChangeFunc,
  minDate,
  maxDate,
}) => {
  const cssList = selectedDates.map((date) =>
    selected(dateLabelFormat(undefined, date))
  );
  return (
    <>
      <Global styles={styles} />
      <ReactCalendar
        css={cssList}
        locale={locale}
        onClickDay={onChangeFunc}
        defaultActiveStartDate={minDate}
        minDate={minDate}
        maxDate={maxDate}
        formatLongDate={dateLabelFormat}
        formatDay={(_locale, date) => format(date, "d")}
        minDetail={"month"}
      />
    </>
  );
};

const dateLabelFormat = (_locale: string | undefined, date: Date): string =>
  format(date, "yyyyMMdd");

const selected = (label: string) => css`
  button:has(abbr[aria-label="${label}"]) {
    background-color: ${mainColor.default};
  }
`;

const styles = css`
  .react-calendar {
    width: ${boxSize.default}px;
    line-height: 1.125em;
    ${backgroundColor.default};
  }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    text-align: center;
  }

  .react-calendar__navigation__arrow button:disabled {
    color: inherit;
    cursor: inherit;
    background-color: #f0f0f0;
  }

  .react-calendar__navigation__label {
    cursor: inherit;
  }

  .react-calendar__navigation button:enabled:hover {
    background-color: ${mainColor.lighter};
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
  }

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }

  .react-calendar__tile:enabled:hover {
    background-color: ${mainColor.lighter};
  }

  .react-calendar__tile--hasActive {
    background: #76baff;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: ${mainColor.lighter};
  }

  .react-calendar__month-view__days__day--weekend:nth-child(7n-1) {
    color: #00f;
  }
`;
