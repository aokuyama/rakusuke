import { FC, useState } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { Button } from "ui/src/components/Button";
import { DatePicker } from "@/components/schedule/DatePicker";
import { EventDateListPickUp } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
import { useRouter } from "next/router";

export const EventCreate: FC = () => {
  const [name, setName] = useState<string>("");
  const [dateList, setDateList] = useState<EventDateListPickUp>(
    new EventDateListPickUp([])
  );
  const router = useRouter();

  const publish = async () => {
    const result = await client.event.createEvent.mutate({
      name: name,
      dates: dateList.value,
    });
    if (result.path) {
      router.push({
        pathname: "/e",
        query: { e: result.path },
      });
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
        作成
      </Button>
    </>
  );
};
