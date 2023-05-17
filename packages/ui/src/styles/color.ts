import { css } from "@emotion/react";

export const mainColor = {
  default: "#FFA500",
  brighter: "#FFB74D",
  lighter: "#FFC878",
  darker: "#FF8F00",
  saturated: "#FF7F00",
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

export const textColor = {
  default: css`
    color: #222;
    @media (prefers-color-scheme: dark) {
      color: #fff;
    }
  `,
  sub: css`
    color: #888;
    @media (prefers-color-scheme: dark) {
      color: #aaa;
    }
  `,
};

export const backgroundColor = {
  default: css`
    background-color: #fff;
    @media (prefers-color-scheme: dark) {
      background-color: #222;
    }
  `,
};

export const colorSet = {
  main: css`
    color: ${mainText.default};
    background-color: ${mainColor.default};
  `,
};
