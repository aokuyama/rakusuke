import { StoryObj, Meta } from "@storybook/react";
import { Table } from "ui/src/components/Table";
import { within } from "@storybook/testing-library";

export default {
  title: "Basic/Table",
  component: Table,
  argTypes: {},
} as Meta<typeof Table>;

export type Table = StoryObj<typeof Table>;

export const Default: Table = {
  args: {
    header: [
      { id: "0", name: "◯" },
      { id: "1", name: "1" },
      { id: "2", name: "2" },
      { id: "3", name: "3" },
      { id: "4", name: "4" },
    ],
    dataList: [
      {
        id: "0",
        items: [
          { id: "0", name: "A" },
          { id: "1", name: "A1" },
          { id: "2", name: "A2" },
          { id: "3", name: "A3" },
          { id: "4", name: "A4" },
        ],
      },
      {
        id: "0",
        items: [
          { id: "0", name: "B" },
          { id: "1", name: "B1" },
          { id: "2", name: "B2" },
          { id: "3", name: "B3" },
          { id: "4", name: "B4" },
        ],
      },
      {
        id: "0",
        items: [
          { id: "0", name: "C" },
          { id: "1", name: "C1" },
          { id: "2", name: "C2" },
          { id: "3", name: "C3" },
          { id: "4", name: "C4" },
        ],
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
