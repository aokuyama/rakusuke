import { FC, useEffect, useState } from "react";
import { Guest, GuestBox } from "./GuestBox";

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
          <GuestBox
            key={guest.id}
            guest={guest}
            clickIdHandler={clickIdHandler}
            // 初期ロード以降に追加されたものは開いておく
            defaultIsClose={index < defaultGuestNum}
          />
        );
      })}
    </>
  );
};
