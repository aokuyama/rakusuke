import { css } from "@emotion/react";
import sanitize from "sanitize.css";
import typography from "sanitize.css/typography.css";

export const global = css`
  ${sanitize}
  ${typography}

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
  * {
  }
`;
