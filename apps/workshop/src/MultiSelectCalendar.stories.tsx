import { StoryObj, Meta } from "@storybook/react";
import { MultiSelectCalendar } from "ui/src/components/MultiSelectCalendar";
import { within } from "@storybook/testing-library";

export default {
  title: "Basic/MultiSelectCalendar",
  component: MultiSelectCalendar,
  argTypes: {
    value: {
      control: "date",
    },
  },
} as Meta<typeof MultiSelectCalendar>;

export type Calendar = StoryObj<typeof MultiSelectCalendar>;

export const Default: Calendar = {
  args: {
    selectedDates: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
