import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { Subtitle } from "ui/src/components/Subtitle";
import { StickyNote } from "ui/src/components/StickyNote";
import { JoinForm } from "@/features/guest/join_as_guest/components/JoinForm";
import { Message } from "ui/src/components/Message";
import { FormError } from "ui/src/components/FormError";
import { css } from "@emotion/react";
import { boxLayout } from "ui/src/styles/layout";

type Props = {
  event: CurrentEvent;
  setEvent: (event: CurrentEvent) => void;
};

export const EventTitle: FC<Props> = ({ event, setEvent }) => {
  return (
    <div
      css={css`
        ${boxLayout.long}
      `}
    >
      <Subtitle isHeadline={true}>{event.name}</Subtitle>
      {event.description && event.description.length && (
        <StickyNote>{event.description}</StickyNote>
      )}
      <Message>
        {event.guests.length
          ? event.guests.length + " 人が日程調整中です"
          : "まだ参加希望者がいません"}
        {event.isGuestLimit() && <FormError>これ以上登録できません</FormError>}
      </Message>
      <JoinForm event={event} setEvent={setEvent} />
    </div>
  );
};
