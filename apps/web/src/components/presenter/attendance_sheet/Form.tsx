import { FC } from "react";
import { YesOrNoList } from "ui/src/components/YesOrNoList";
import { AttendanceList } from "domain/src/model/event/attendance";
import { TextBox } from "ui/src/components/TextBox";
import { Button } from "ui/src/components/Button";

interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  attendance: AttendanceList;
  onClick: () => Promise<void>;
  onCheckListChangeCallback?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const Form: FC<Props> = ({
  name,
  setName,
  attendance,
  onClick,
  onCheckListChangeCallback,
}) => {
  return (
    <>
      <TextBox value={name} setValue={setName} />
      <YesOrNoList
        items={attendance.list()}
        onChangeCallback={onCheckListChangeCallback}
      />
      <Button
        onClick={() => {
          onClick();
        }}
      >
        決定
      </Button>
    </>
  );
};
