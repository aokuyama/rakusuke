import { FC, useState } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { YesOrNoList } from "ui/src/components/YesOrNoList";
import { AttendanceList } from "domain/src/model/event/attendance";

interface Props {
  event: UpcomingEvent;
}

export const Answer: FC<Props> = ({ event }) => {
  const [attendance, setAttendance] = useState<AttendanceList>(
    event.newAttendance()
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) {
      return;
    }
    setAttendance(
      attendance.switch({ id: e.target.name, attend: e.target.checked })
    );
  };

  return <YesOrNoList items={attendance.list()} onChange={onChange} />;
};
