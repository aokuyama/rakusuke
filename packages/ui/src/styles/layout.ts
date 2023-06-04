import { css } from "@emotion/react";
import { boxSize } from "./size";

export const boxLayout = {
  default: css`
    width: ${boxSize.default}px;
    max-width: 100%;
    margin: 0 auto 16px;
  `,
};

export const isNotSmall = `@media (min-width: 640px)`;
