import { css } from "@emotion/react";
import { backgroundColor, textColor } from "./color";
import * as reset from "destyle.css";

export const global = css`
  ${reset}

  @font-face {
    font-family: RocknRoll One;
    src: url(/font/RocknRollOne-Regular.ttf);
  }
  @font-face {
    font-family: Unica One;
    src: url(/font/UnicaOne-Regular.ttf);
  }
  a:-webkit-any-link {
    color: inherit;
    text-decoration: inherit;
  }
  :where(:root) {
    cursor: inherit;
  }
  body {
    ${textColor.default};
    ${backgroundColor.default};
  }
`;
