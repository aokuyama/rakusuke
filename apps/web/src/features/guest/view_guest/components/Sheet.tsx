import { FC } from "react";
import { Guest, GuestList } from "./GuestList";
import { Button } from "ui/src/components/Button";

type Props = {
  guests: Guest[];
  onJoinHandler: () => void;
  clickIdHandler: (id: string | number) => void;
};

export const Sheet: FC<Props> = ({ guests, onJoinHandler, clickIdHandler }) => {
  return (
    <section>
      <Button onClick={onJoinHandler}>入力</Button>
      <GuestList guests={guests} clickIdHandler={clickIdHandler} />
    </section>
  );
};
