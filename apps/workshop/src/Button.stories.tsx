import { StoryObj, Meta } from "@storybook/react";
import { Button } from "ui/src/components/Button";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Basic/Button",
  component: Button,
  argTypes: {},
} as Meta<typeof Button>;

export type Button = StoryObj<typeof Button>;

export const Default: Button = {
  args: {
    children: "Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Button")).toBeInTheDocument();
  },
};
