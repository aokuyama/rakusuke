import { FC } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import { OnChangeFunc } from "react-calendar/dist/cjs/shared/types";
import { css, Global } from "@emotion/react";
import { mainColor } from "../styles/color";
import { format } from "date-fns";

type Props = {
  selectedDates: Date[];
  locale: string;
  onChangeFunc: OnChangeFunc | undefined;
  defaultActiveStartDate?: Date | undefined;
};

export const MultiSelectCalendar: FC<Props> = ({
  selectedDates,
  locale,
  onChangeFunc,
  defaultActiveStartDate,
}) => {
  const cssList = selectedDates.map((date) => {
    const label = dateLabelFormat(undefined, date);
    return css`
      button:has(abbr[aria-label="${label}"]) {
        background-color: ${mainColor.default};
      }
    `;
  });
  cssList.push(calendar);

  return (
    <>
      <Global
        styles={css`
          ${require("react-calendar/dist/Calendar.css")};
        `}
      />
      <ReactCalendar
        css={cssList}
        locale={locale}
        onClickDay={onChangeFunc}
        defaultActiveStartDate={defaultActiveStartDate}
        minDate={defaultActiveStartDate}
        formatLongDate={dateLabelFormat}
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

const dateLabelFormat = (_locale: string | undefined, date: Date): string =>
  format(date, "yyyyMMdd");
