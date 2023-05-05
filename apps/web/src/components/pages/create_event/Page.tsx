import { FC } from "react";
import { EventCreateForm } from "@/components/container/event_setting/EventCreateForm";
import { useRouter } from "next/router";
import { storage } from "@/registry";

export const Page: FC = () => {
  const router = useRouter();

  const eventCreatedHandler = (path: string) => {
    router.push({
      pathname: "/e",
      query: { e: path },
    });
  };
  const user = storage.getUser();

  return (
    <>
      <EventCreateForm user={user} eventCreatedHandler={eventCreatedHandler} />
    </>
  );
};
