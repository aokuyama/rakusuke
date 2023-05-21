import { StoryObj, Meta } from "@storybook/react";
import { TextBox } from "ui/src/components/TextBox";
import { within } from "@storybook/testing-library";

export default {
  title: "Basic/TextBox",
  component: TextBox,
  argTypes: {},
} as Meta<typeof TextBox>;

export type TextBox = StoryObj<typeof TextBox>;

export const Default: TextBox = {
  args: {
    children: <input type="text" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
