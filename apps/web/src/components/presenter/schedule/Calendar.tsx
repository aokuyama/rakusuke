import { FC } from "react";
import { MultiSelectCalendar } from "ui/src/components/MultiSelectCalendar";
import { EventDateListPickUp } from "domain/src/model/event";
import { OnChangeFunc } from "react-calendar/dist/cjs/shared/types";
import { css } from "@emotion/react";

interface Props {
  dateList: EventDateListPickUp;
  onChangeFunc: OnChangeFunc;
}

export const Calendar: FC<Props> = ({ dateList, onChangeFunc }) => {
  return (
    <div css={styles}>
      <MultiSelectCalendar
        selectedDates={dateList.globalThisDates()}
        locale={"ja-JP"}
        onChangeFunc={onChangeFunc}
      />
    </div>
  );
};

const styles = css`
  & > div {
    margin: 0 auto 16px;
    border-radius: 3px;
  }
`;
