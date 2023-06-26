import { FC, useContext } from "react";
import { EditBox } from "ui/src/components/EditBox";
import { CheckList } from "ui/src/components/CheckList";
import { loadingContext } from "@/hooks/useLoading";
import { EventGuestDateMap } from "domain/src/model/guest";
import { css } from "@emotion/react";
import { boxLayout } from "ui/src/styles/layout";

type Props = {
  guest: EventGuestDateMap;
  defaultIsClose: boolean;
  clickIdHandler: (id: string | number) => void;
};

export const GuestBox: FC<Props> = ({
  guest,
  defaultIsClose,
  clickIdHandler,
}) => {
  const loadingCtx = useContext(loadingContext);
  const items = guest.attendance.map((a) => {
    return {
      id: a.id,
      name: a.date.md(),
      enabled: a.attend,
    };
  });

  return (
    <div
      css={css`
        ${boxLayout.cancel}
      `}
    >
      <EditBox
        key={guest.id}
        name={guest.name}
        remarks={guest.memo}
        button={{
          clickHandler: () => {
            clickIdHandler(guest.id);
          },
          disabled: loadingCtx.loading,
        }}
        closable={{ defaultIsClose }}
      >
        <CheckList items={items} />
      </EditBox>
    </div>
  );
};
