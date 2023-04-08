import React from "react";
import { Global } from "@emotion/react";
import { global } from "ui/src/styles/global";

const globalStyles = <Global styles={global} />;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      {globalStyles}
      <Story />
    </>
  ),
];
