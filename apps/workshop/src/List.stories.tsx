import { StoryObj, Meta } from "@storybook/react";
import { List } from "ui/src/components/List";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Basic/List",
  component: List,
  argTypes: {},
} as Meta<typeof List>;

export type List = StoryObj<typeof List>;

export const Default: List = {
  args: {
    items: [
      { id: 1, name: "項目1" },
      { id: 2, name: "項目2" },
      { id: 3, name: "項目3" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("項目1")).toBeInTheDocument();
    expect(canvas.getByText("項目2")).toBeInTheDocument();
    expect(canvas.getByText("項目3")).toBeInTheDocument();
  },
};
