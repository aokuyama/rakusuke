import { css } from "@emotion/react";
import { mainColor } from "./color";
import { boxSize, font } from "./size";
import * as reset from "destyle.css";

export const global = css`
  ${reset}
  @font-face {
    font-family: NotoSansJP;
    src: url(/font/NotoSansJP-Regular.ttf);
  }
  @font-face {
    font-family: RocknRollOne;
    src: url(/font/RocknRollOne-Regular.ttf);
  }
  a:-webkit-any-link {
    color: inherit;
    text-decoration: inherit;
  }
  summary {
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  :where(:root) {
    cursor: inherit;
  }
  body {
    background-color: ${mainColor.default};
    min-width: ${boxSize.default}px;
    font-family: NotoSansJP;
    font-size: ${font.default}px;
  }
  abbr[title] {
    -webkit-text-decoration: none;
    text-decoration: none;
  }
`;
