import { FC } from "react";
import { EventCreateForm } from "@/components/container/event_setting/EventCreateForm";
import { useRouter } from "next/router";
import { storage } from "@/registry";
import { RegisteredUser, UserToken } from "domain/src/model/user";
import { Dev } from "@/components/container/dev/Dev";

export const Page: FC = () => {
  const router = useRouter();

  const eventCreatedHandler = (args: {
    user: { uuid: string; token: string };
    path: string;
  }) => {
    storage.saveUser(RegisteredUser.new(args.user));
    router.push({
      pathname: "/e/",
      query: { p: args.path },
    });
  };
  const user = storage.getUser();

  return (
    <>
      <EventCreateForm user={user} eventCreatedHandler={eventCreatedHandler} />
      <Dev user={user} />
    </>
  );
};
