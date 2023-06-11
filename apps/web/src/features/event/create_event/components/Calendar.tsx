import { FC } from "react";
import { MultiSelectCalendar } from "ui/src/components/MultiSelectCalendar";
import { OnChangeFunc } from "react-calendar/dist/cjs/shared/types";
import { css } from "@emotion/react";
import { Date } from "domain/src/model/date";
import { boxLayout } from "ui/src/styles/layout";
import { DateList } from "domain/src/model/event/date_list";

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
        noHoverOnSelected={dates.length == DateList.MAX}
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
