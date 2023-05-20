import { FC } from "react";
import { Item, ToggleList } from "ui/src/components/ToggleList";
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
      <ToggleList items={items} onChangeCallback={onCheckListChangeCallback} />
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
