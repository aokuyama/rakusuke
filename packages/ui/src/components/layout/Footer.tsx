import { FC } from "react";
import { css } from "@emotion/react";
import { black, white } from "../../styles/color";
import { font } from "../../styles/size";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export type LinkProps = {
  title: string;
  url: string;
  icon?: "github";
};

type Props = {
  title?: string;
  link: LinkProps[];
};

export const Footer: FC<Props> = ({ title, link }) => {
  return (
    <footer css={style}>
      <ul>
        {link.map((link, index) => {
          return (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.icon === "github" ? (
                  <FontAwesomeIcon icon={faGithub} width={20} />
                ) : (
                  <FontAwesomeIcon icon={faCircle} width={4} />
                )}
                <span>{link.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <p>© 2023 {title}</p>
    </footer>
  );
};

export const footerHeight = "99px";

const style = css`
  height: ${footerHeight};
  padding: 24px 0 16px;
  color: ${white.default};
  background-color: ${black.default};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    text-align: center;
    margin: 0 auto;
    font-size: ${font.small}px;
    color: ${white.disabled};
  }
  ul {
    display: flex;
    margin: 0 auto;
    li {
      margin: 0 8px;
      a {
        display: flex;
        align-items: center;
        svg {
          margin: 0 4px;
        }
      }
    }
  }
`;
