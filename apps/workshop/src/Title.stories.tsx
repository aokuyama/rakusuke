import { StoryObj, Meta } from "@storybook/react";
import { Title } from "ui/src/components/Title";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Basic/Title",
  component: Title,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof Title>;

export type Title = StoryObj<typeof Title>;

export const Default: Title = {
  args: {
    children: "Title",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Title")).toBeInTheDocument();
  },
};
