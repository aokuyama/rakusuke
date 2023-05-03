import { FC, useState } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { AttendanceList } from "domain/src/model/event/attendance";
import { client } from "infra/src/client/trpc";
import { EventGuest } from "domain/src/model/guest";
import { Form } from "@/components/presenter/attendance_sheet/Form";

interface Props {
  event: UpcomingEvent;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
}

export const NewSheet: FC<Props> = ({ event, setEvent }) => {
  const [name, setName] = useState<string>("");
  const [attendance, setAttendance] = useState<AttendanceList>(
    event.newAttendance()
  );

  const publish = async () => {
    const result = await client.event.respondAttendance.mutate({
      event: event.path,
      name: name,
      attendance: attendance.value,
    });
    if (result.guest) {
      setEvent(event.pushGuest(EventGuest.new(result.guest)));
    } else {
      console.error(result);
    }
  };

  const onCheckListChangeCallback = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAttendance(
      attendance.switch({ id: e.target.name, attend: e.target.checked })
    );
  };

  return (
    <Form
      name={name}
      setName={setName}
      attendance={attendance}
      onClick={publish}
      onCheckListChangeCallback={onCheckListChangeCallback}
    />
  );
};
