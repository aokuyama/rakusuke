import { FC } from "react";
import { MultiSelectCalendar } from "ui/src/components/MultiSelectCalendar";
import { OnChangeFunc } from "react-calendar/dist/cjs/shared/types";
import { css } from "@emotion/react";
import { Date } from "domain/src/model/event/date";
import { boxLayout } from "ui/src/styles/layout";

interface Props {
  dates: Date[];
  range: {
    min: Date;
    max: Date;
  };
  onChangeFunc: OnChangeFunc;
}

export const Calendar: FC<Props> = ({ dates, range, onChangeFunc }) => {
  return (
    <div css={styles}>
      <MultiSelectCalendar
        selectedDates={dates.map((d) => d.getGlobalThisDate())}
        locale={"ja-JP"}
        minDate={range.min.getGlobalThisDate()}
        maxDate={range.max.getGlobalThisDate()}
        onChangeFunc={onChangeFunc}
      />
    </div>
  );
};

const styles = css`
  & > div {
    ${boxLayout.default}
    border-radius: 3px;
  }
`;
