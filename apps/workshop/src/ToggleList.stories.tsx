import { StoryObj, Meta } from "@storybook/react";
import { ToggleList } from "ui/src/components/ToggleList";
import { ToggleListItem } from "ui/src/components/ToggleListItem";
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
    children: (
      <ToggleListItem name="a">
        <input type="checkbox" />
      </ToggleListItem>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
