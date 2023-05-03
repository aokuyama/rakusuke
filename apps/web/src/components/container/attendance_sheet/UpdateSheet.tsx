import { FC, useState } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { AttendanceList } from "domain/src/model/event/attendance";
import { client } from "infra/src/client/trpc";
import { EventGuest } from "domain/src/model/guest";
import { Form } from "@/components/presenter/attendance_sheet/Form";

interface Props {
  guest: EventGuest;
  event: UpcomingEvent;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
}

export const UpdateSheet: FC<Props> = ({ guest, event, setEvent }) => {
  const [name, setName] = useState<string>(guest.name);
  const [attendance, setAttendance] = useState<AttendanceList>(
    guest._attendance
  );

  const publish = async () => {
    const result = await client.event.updateAttendance.mutate({
      number: guest.number,
      event: event.path,
      name: name,
      attendance: attendance.value,
    });
    if (result.guest) {
      setEvent(event.replaceGuest(EventGuest.new(result.guest)));
    } else {
      console.error(result);
    }
  };

  return (
    <Form
      name={name}
      setName={setName}
      attendance={attendance}
      setAttendance={setAttendance}
      onClick={publish}
    />
  );
};