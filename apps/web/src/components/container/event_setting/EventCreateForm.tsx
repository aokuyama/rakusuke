import { FC, useState } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { Button } from "ui/src/components/Button";
import { DatePicker } from "./DatePicker";
import { EventDateListPickUp } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
import { User } from "domain/src/model/user";
import { Site } from "@/registry";

interface Props {
  user: User;
  eventCreatedHandler: (args: { path: string; token: string }) => void;
}

export const EventCreateForm: FC<Props> = ({ eventCreatedHandler, user }) => {
  const [name, setName] = useState<string>("");
  const [dateList, setDateList] = useState<EventDateListPickUp>(
    new EventDateListPickUp([])
  );

  const publish = async () => {
    const result = await client.event.createEvent.mutate({
      token: user.getRawToken(),
      name: name,
      dates: dateList.value,
    });
    if (result.path) {
      eventCreatedHandler(result);
    } else {
      console.error(result);
    }
  };

  return (
    <>
      <TextBox
        value={name}
        setValue={setName}
        placeholder={Site.eventPlaceholder}
      />
      <DatePicker dateList={dateList} setDateList={setDateList} />
      <Button
        onClick={() => {
          publish();
        }}
      >
        作成
      </Button>
    </>
  );
};
