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
};

export const dayOfWeek = {
  saturday: "#00f",
  sunday: "#f00",
};

export const white = {
  default: "#fff",
  light: "#aaa",
};
export const black = {
  default: "#222",
  light: "#888",
};

export const textColor = {
  default: css`
    color: ${black.default};
    @media (prefers-color-scheme: dark) {
      color: ${white.default};
    }
  `,
  sub: css`
    color: ${black.light};
    @media (prefers-color-scheme: dark) {
      color: ${white.light};
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
};

export const colorSet = {
  main: css`
    color: ${mainText.default};
    background-color: ${mainColor.default};
  `,
};
