import { FC } from "react";
import { Guest, GuestList } from "./GuestList";
import { Item, Summary } from "./Summary";

type Props = {
  summary: Item[];
  guests: Guest[];
  clickIdHandler: (id: string | number) => void;
};

export const Sheet: FC<Props> = ({ summary, guests, clickIdHandler }) => {
  return (
    <section>
      <Summary summary={summary} />
      <GuestList guests={guests} clickIdHandler={clickIdHandler} />
    </section>
  );
};
