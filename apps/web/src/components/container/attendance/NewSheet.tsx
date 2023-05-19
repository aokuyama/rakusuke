import { FC, useState } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { NewAttendanceList } from "domain/src/model/event/attendance";
import { client } from "infra/src/client/trpc";
import { EventGuest } from "domain/src/model/guest";
import { Form } from "@/components/presenter/attendance_sheet/Form";

interface Props {
  event: UpcomingEvent;
  eventUpdatedHandler: (event: UpcomingEvent) => void;
}

export const NewSheet: FC<Props> = ({ event, eventUpdatedHandler }) => {
  const [name, setName] = useState<string>("");
  const [attendance, setAttendance] = useState<NewAttendanceList>(
    event.newAttendance()
  );

  const publish = async () => {
    const result = await client.event.respondAttendance.mutate({
      event: event.path,
      name: name,
      attendance: attendance.value,
    });
    if (result.guest) {
      eventUpdatedHandler(event.pushGuest(EventGuest.new(result.guest)));
    } else {
      console.error(result);
    }
  };

  const onCheckListChangeCallback = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAttendance(
      event
        .newAttendanceByCurrentAttendance(attendance)
        .switch({ id: e.target.name, attend: e.target.checked })
    );
  };

  return (
    <Form
      name={name}
      setName={setName}
      items={event.newAttendanceByCurrentAttendance(attendance).toCheckList()}
      onClick={publish}
      onCheckListChangeCallback={onCheckListChangeCallback}
    />
  );
};
