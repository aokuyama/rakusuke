import { FC, useContext, useState } from "react";
import { loadingContext } from "@/hooks/useLoading";
import { Button } from "ui/src/components/Button";
import { NewSheetModal } from "./NewSheetModal";
import { CurrentEvent } from "domain/src/model/event";

interface Props {
  event: CurrentEvent;
  setEvent: (event: CurrentEvent) => void;
}

export const JoinForm: FC<Props> = ({ event, setEvent }) => {
  const loadingCtx = useContext(loadingContext);
  const [isNewGuestFormOpen, setIsNewGuestFormOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsNewGuestFormOpen(true);
        }}
        disabled={loadingCtx.loading}
      >
        参加入力
      </Button>
      <NewSheetModal
        isOpen={isNewGuestFormOpen}
        onRequestClose={() => {
          setIsNewGuestFormOpen(false);
        }}
        event={event}
        eventUpdatedHandler={setEvent}
      />
    </>
  );
};
