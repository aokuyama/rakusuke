import { StoryObj, Meta } from "@storybook/react";
import { YesOrNoList } from "ui/src/components/YesOrNoList";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Basic/YesOrNoList",
  component: YesOrNoList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof YesOrNoList>;

export type YesOrNoList = StoryObj<typeof YesOrNoList>;

export const Default: YesOrNoList = {
  args: {
    items: [
      { id: "1", name: "2023/05/01", checked: false },
      { id: "2", name: "2023/05/02", checked: true },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
