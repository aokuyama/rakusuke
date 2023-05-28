import { FC } from "react";
import { EventCreateForm } from "@/components/container/event_setting/EventCreateForm";
import { useRouter } from "next/router";
import { storage } from "@/registry";
import { RegisteredUser } from "domain/src/model/user";
import { Dev } from "@/components/container/dev/Dev";
import { Site } from "infra/src/web/site";

export const Page: FC = () => {
  const router = useRouter();

  const eventCreatedHandler = (args: {
    user: { uuid: string; token: string };
    path: string;
  }) => {
    storage.saveUser(RegisteredUser.new(args.user));
    router.push({
      pathname: Site.getEventPagePath(args.path),
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
