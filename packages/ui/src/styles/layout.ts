import { css } from "@emotion/react";

export const boxLayout = {
  default: css`
    margin: 0 auto 16px;
  `,
  cancel: css`
    margin: 0 auto -16px;
  `,
  long: css`
    margin: 0 auto 32px;
  `,
};

export const screenSize = {
  isSmall: `@media (max-width: 640px)`,
  isNotSmall: `@media (min-width: 640px)`,
  isMiddle: `@media (min-width: 800px)`,
  isWide: `@media (min-width: 1120px)`,
  isFull: `@media (min-width: 1280px)`,
};
