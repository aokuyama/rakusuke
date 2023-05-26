import { css } from "@emotion/react";

export const mainColor = {
  default: "#ffa500",
  brighter: "#ffb74d",
  lighter: "#ffc878",
  darker: "#ff8f00",
  saturated: "#ff7f00",
};

export const mainText = {
  default: "#fff",
  lighter: "rgb(255, 216, 181)",
};

export const systemColor = {
  checked: "#5b3",
  error: "#f22",
};

export const dayOfWeek = {
  saturday: "#00f",
  sunday: "#f00",
};

export const white = {
  default: "#fff",
  background: "#eee",
  disabled: "#999",
};
export const black = {
  default: "#222",
  background: "#333",
  disabled: "#999",
};

export const textColor = {
  default: css`
    color: ${black.default};
    @media (prefers-color-scheme: dark) {
      color: ${white.default};
    }
  `,
  disabled: css`
    color: ${black.disabled};
    @media (prefers-color-scheme: dark) {
      color: ${white.disabled};
    }
  `,
};

export const backgroundColor = {
  default: css`
    background-color: ${white.default};
    @media (prefers-color-scheme: dark) {
      background-color: ${black.default};
    }
  `,
  background: css`
    background-color: ${white.background};
    @media (prefers-color-scheme: dark) {
      background-color: ${black.background};
    }
  `,
};

export const colorSet = {
  main: css`
    color: ${mainText.default};
    background-color: ${mainColor.default};
  `,
};
