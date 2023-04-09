import { StoryObj, Meta } from "@storybook/react";
import { Calendar } from "ui/src/components/Calendar";
import { within } from "@storybook/testing-library";

export default {
  title: "Basic/Calendar",
  component: Calendar,
  argTypes: {
    value: {
      control: "date",
    },
  },
} as Meta<typeof Calendar>;

export type Calendar = StoryObj<typeof Calendar>;

export const Default: Calendar = {
  args: {
    value: new Date("2023/04/08"),
    defaultActiveStartDate: new Date("2023/04/08"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
