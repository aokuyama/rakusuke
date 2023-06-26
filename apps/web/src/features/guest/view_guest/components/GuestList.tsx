import { FC, useEffect, useState } from "react";
import { GuestBox } from "./GuestBox";
import { CurrentEvent } from "domain/src/model/event";
import { css } from "@emotion/react";
import { boxLayout } from "ui/src/styles/layout";

type Props = {
  event: CurrentEvent;
  clickIdHandler: (id: string | number) => void;
};

export const GuestList: FC<Props> = ({ event, clickIdHandler }) => {
  const { guests } = event.guestDateMap();
  const [defaultGuestNum, setDefaultGuestNum] = useState<number>(9999);
  useEffect(() => {
    // 画面ロード時のゲスト数を記憶。以降更新しないのでdepsは空配列
    setDefaultGuestNum(guests.length);
  }, []);
  return (
    <div
      css={css`
        ${boxLayout.long}
      `}
    >
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
    </div>
  );
};
