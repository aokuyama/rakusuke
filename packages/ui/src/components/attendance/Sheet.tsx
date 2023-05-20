import { FC } from "react";
import { Guest, GuestList } from "./GuestList";
import { Item, Summary } from "./Summary";
import { Button } from "../Button";

type Props = {
  summary: Item[];
  guests: Guest[];
  onJoinHandler: () => void;
  clickIdHandler: (id: string | number) => void;
};

export const Sheet: FC<Props> = ({
  summary,
  guests,
  onJoinHandler,
  clickIdHandler,
}) => {
  return (
    <section>
      <Summary summary={summary} />
      <Button onClick={onJoinHandler}>入力</Button>
      <GuestList guests={guests} clickIdHandler={clickIdHandler} />
    </section>
  );
};
