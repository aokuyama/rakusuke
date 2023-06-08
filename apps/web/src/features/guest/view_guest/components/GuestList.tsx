import { FC, useEffect, useState } from "react";
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
  const [defaultGuestNum, setDefaultGuestNum] = useState<number>(9999);
  useEffect(() => {
    // 画面ロード時のゲスト数を記憶。以降更新しない
    setDefaultGuestNum(guests.length);
  }, []);
  return (
    <>
      {guests.map((guest, index) => {
        return (
          <EditBox
            key={guest.id}
            name={guest.name}
            button={{
              clickHandler: () => {
                clickIdHandler(guest.id);
              },
            }}
            // 初期ロード以降に追加されたものは開いておく
            closable={{ defaultIsClose: index < defaultGuestNum }}
          >
            <CheckList items={guest.attendance} />
          </EditBox>
        );
      })}
    </>
  );
};
