import { FC } from "react";
import { MultiSelectCalendar } from "ui/src/components/MultiSelectCalendar";
import { EventDateListPickUp } from "domain/src/model/event";
import { OnChangeFunc } from "react-calendar/dist/cjs/shared/types";

interface Props {
  dateList: EventDateListPickUp;
  onChangeFunc: OnChangeFunc;
}

export const Calendar: FC<Props> = ({ dateList, onChangeFunc }) => {
  return (
    <MultiSelectCalendar
      selectedDates={dateList.globalThisDates()}
      locale={"ja-JP"}
      onChangeFunc={onChangeFunc}
    />
  );
};
