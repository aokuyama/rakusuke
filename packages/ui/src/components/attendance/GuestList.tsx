import { FC } from "react";
import { EditBox } from "./EditBox";
import { CheckList } from "./CheckList";

interface Attendance {
  id: string;
  name: string;
  enabled: boolean | undefined;
}

export interface Guest {
  id: string;
  name: string;
  attendance: Attendance[];
}

type Props = {
  guests: Guest[];
  clickIdHandler: (id: string | number) => void;
};

export const GuestList: FC<Props> = ({ guests, clickIdHandler }) => {
  return (
    <>
      {guests.map((guest) => {
        return (
          <EditBox
            key={guest.id}
            name={guest.name}
            button={{
              id: guest.id,
              clickIdHandler: clickIdHandler,
            }}
          >
            <CheckList items={guest.attendance} />
          </EditBox>
        );
      })}
    </>
  );
};
