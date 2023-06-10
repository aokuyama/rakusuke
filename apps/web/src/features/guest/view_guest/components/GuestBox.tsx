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
  memo: string | undefined;
  attendance: Attendance[];
}

type Props = {
  guest: Guest;
  defaultIsClose: boolean;
  clickIdHandler: (id: string | number) => void;
};

export const GuestBox: FC<Props> = ({
  guest,
  defaultIsClose,
  clickIdHandler,
}) => {
  return (
    <EditBox
      key={guest.id}
      name={guest.name}
      remarks={guest.memo}
      button={{
        clickHandler: () => {
          clickIdHandler(guest.id);
        },
      }}
      closable={{ defaultIsClose }}
    >
      <CheckList items={guest.attendance} />
    </EditBox>
  );
};
