import { FC } from "react";
import { EditBox } from "ui/src/components/EditBox";
import { CheckList } from "ui/src/components/CheckList";

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
              clickHandler: () => {
                clickIdHandler(guest.id);
              },
            }}
          >
            <CheckList items={guest.attendance} />
          </EditBox>
        );
      })}
    </>
  );
};
