import { FC, useState } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { Button } from "ui/src/components/Button";
import { DatePicker } from "./DatePicker";
import { EventDateListPickUp, UpcomingEvent } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";

interface Props {
  event: UpcomingEvent;
  eventUpdatedHandler: (event: UpcomingEvent) => void;
}

export const EventUpdateForm: FC<Props> = ({ event, eventUpdatedHandler }) => {
  const [name, setName] = useState<string>(event.name);
  const [dateList, setDateList] = useState<EventDateListPickUp>(
    event.createDateListPickUp()
  );

  const publish = async () => {
    const result = await client.event.updateEvent.mutate({
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
