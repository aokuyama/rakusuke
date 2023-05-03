import { FC, useState } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { YesOrNoList } from "ui/src/components/YesOrNoList";
import { AttendanceList } from "domain/src/model/event/attendance";
import { TextBox } from "ui/src/components/TextBox";
import { Button } from "ui/src/components/Button";
import { client } from "infra/src/client/trpc";
import { EventGuest } from "domain/src/model/guest";

interface Props {
  event: UpcomingEvent;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
}

export const Answer: FC<Props> = ({ event, setEvent }) => {
  const [name, setName] = useState<string>("");
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

  return (
    <>
      <TextBox value={name} setValue={setName} />
      <YesOrNoList items={attendance.list()} onChange={onChange} />
      <Button
        onClick={() => {
          publish();
        }}
      >
        決定
      </Button>
    </>
  );
};
