import { FC, useState } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { Button } from "ui/src/components/Button";
import { DatePicker } from "@/components/schedule/DatePicker";
import { DateList } from "domain/src/model/event/date_list";
import { client } from "infra/src/client/trpc";

export const EventCreate: FC = () => {
  const [name, setName] = useState<string>("");
  const [dateList, setDateList] = useState<DateList>(new DateList([]));
  const publish = async () => {
    const result = await client.event.createEvent.mutate({
      name: name,
      dates: dateList.getDateStrings(),
    });
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
        作成
      </Button>
    </>
  );
};
