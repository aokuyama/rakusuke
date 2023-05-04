import { FC, useState } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { CurrentAttendanceList } from "domain/src/model/event/attendance";
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
  const [attendance, setAttendance] = useState<CurrentAttendanceList>(
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
      items={event.checkList(attendance)}
      onClick={publish}
      onCheckListChangeCallback={onCheckListChangeCallback}
    />
  );
};
