import { StoryObj, Meta } from "@storybook/react";
import { ToggleList } from "ui/src/components/ToggleList";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Basic/ToggleList",
  component: ToggleList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof ToggleList>;

export type ToggleList = StoryObj<typeof ToggleList>;

export const Default: ToggleList = {
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
