import { FC } from "react";
import { css } from "@emotion/react";

type Props = {
  href: string;
  children: React.ReactNode;
};

export const Anchor: FC<Props> = ({ href, children }) => {
  return (
    <a css={styles} href={href}>
      {children}
    </a>
  );
};

export const styles = css`
  &,
  :-webkit-any-link {
    text-decoration: underline;
  }
  :hover {
    text-decoration: inherit;
  }
`;
