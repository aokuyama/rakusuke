import { FC } from "react";
import { Subtitle } from "ui/src/components/Subtitle";
import { Message } from "ui/src/components/Message";

export const EventNotFound: FC = () => {
  return (
    <>
      <Subtitle>イベントが見つかりません</Subtitle>
      <Message>URLが間違っているか、表示期限が切れています</Message>
    </>
  );
};
