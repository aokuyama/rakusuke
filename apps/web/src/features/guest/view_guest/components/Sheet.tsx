import { FC, useContext } from "react";
import { Guest } from "./GuestBox";
import { GuestList } from "./GuestList";
import { Button } from "ui/src/components/Button";
import { loadingContext } from "@/hooks/useLoading";

type Props = {
  guests: Guest[];
  onJoinHandler: () => void;
  clickIdHandler: (id: string | number) => void;
};

export const Sheet: FC<Props> = ({ guests, onJoinHandler, clickIdHandler }) => {
  const loadingCtx = useContext(loadingContext);
  return (
    <section>
      <Button onClick={onJoinHandler} disabled={loadingCtx.loading}>
        入力
      </Button>
      <GuestList guests={guests} clickIdHandler={clickIdHandler} />
    </section>
  );
};
