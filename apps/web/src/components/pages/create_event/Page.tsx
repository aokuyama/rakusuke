import { FC } from "react";
import { Title } from "ui/src/components/Title";
import { EventCreate } from "@/components/schedule/EventCreate";

export const Page: FC = () => {
  return (
    <>
      <Title>Title</Title>
      <EventCreate />
    </>
  );
};
