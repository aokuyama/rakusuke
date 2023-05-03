import { FC } from "react";
import { YesOrNoList } from "ui/src/components/YesOrNoList";
import { AttendanceList } from "domain/src/model/event/attendance";
import { TextBox } from "ui/src/components/TextBox";
import { Button } from "ui/src/components/Button";

interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  attendance: AttendanceList;
  setAttendance: React.Dispatch<React.SetStateAction<AttendanceList>>;
  onClick: () => Promise<void>;
}

export const Form: FC<Props> = ({
  name,
  setName,
  attendance,
  setAttendance,
  onClick,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) {
      return;
    }
    setAttendance(
      attendance.switch({ id: e.target.name, attend: e.target.checked })
    );
  };

  return (
    <>
      <TextBox value={name} setValue={setName} />
      <YesOrNoList items={attendance.list()} onChange={onChange} />
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
