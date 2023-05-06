import { FC, useState } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { Button } from "ui/src/components/Button";
import { DatePicker } from "./DatePicker";
import { EventDateListPickUp, UpcomingEvent } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
import { User } from "domain/src/model/user";

interface Props {
  user: User;
  event: UpcomingEvent;
  eventUpdatedHandler: (event: UpcomingEvent) => void;
}

export const EventUpdateForm: FC<Props> = ({
  user,
  event,
  eventUpdatedHandler,
}) => {
  const [name, setName] = useState<string>(event.name);
  const [dateList, setDateList] = useState<EventDateListPickUp>(
    event.createDateListPickUp()
  );

  const publish = async () => {
    const token = user.getRawToken();
    if (!token) {
      throw new Error("forbidden");
    }
    const result = await client.event.updateEvent.mutate({
      token: token,
      path: event.path,
      name: name,
      dates: dateList.value,
    });
    if (result.event) {
      eventUpdatedHandler(UpcomingEvent.new(result.event));
    } else {
      console.error(result);
    }
  };

  return (
    <>
      <TextBox value={name} setValue={setName} />
      <DatePicker dateList={dateList} setDateList={setDateList} />
      <Button
        onClick={() => {
          publish();
        }}
      >
        更新
      </Button>
    </>
  );
};
