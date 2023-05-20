import { StoryObj, Meta } from "@storybook/react";
import { Toggle } from "ui/src/components/Toggle";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Basic/Toggle",
  component: Toggle,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof Toggle>;

export type Toggle = StoryObj<typeof Toggle>;

export const Default: Toggle = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
