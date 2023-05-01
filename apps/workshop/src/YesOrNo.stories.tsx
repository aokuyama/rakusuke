import { StoryObj, Meta } from "@storybook/react";
import { YesOrNo } from "ui/src/components/YesOrNo";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Basic/YesOrNo",
  component: YesOrNo,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof YesOrNo>;

export type YesOrNo = StoryObj<typeof YesOrNo>;

export const Default: YesOrNo = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
