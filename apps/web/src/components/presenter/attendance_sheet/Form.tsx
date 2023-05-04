import { FC } from "react";
import { Item, YesOrNoList } from "ui/src/components/YesOrNoList";
import { TextBox } from "ui/src/components/TextBox";
import { Button } from "ui/src/components/Button";

interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  onClick: () => Promise<void>;
  onCheckListChangeCallback?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const Form: FC<Props> = ({
  name,
  setName,
  items,
  onClick,
  onCheckListChangeCallback,
}) => {
  return (
    <>
      <TextBox value={name} setValue={setName} />
      <YesOrNoList items={items} onChangeCallback={onCheckListChangeCallback} />
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
