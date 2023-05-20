import { FC } from "react";
import { css } from "@emotion/react";
import { systemColor, textColor } from "../../styles/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type Props = {
  items: { id: string; name: string; enabled: boolean | undefined }[];
};

export const CheckList: FC<Props> = ({ items }) => {
  return (
    <ul css={styles}>
      {items.map((item) => {
        return (
          <li key={item.id} className={item.enabled ? "enable" : ""}>
            <FontAwesomeIcon icon={faCheck} />
            <span>{item.name}</span>
          </li>
        );
      })}
    </ul>
  );
};

const styles = css`
  display: flex;
  flex-wrap: wrap;

  li {
    width: 20%;
    display: flex;
    align-items: center;
    gap: 0 8px;
  }
  svg {
    width: 16px;
  }
  li:not(.enable) {
    ${textColor.disabled};
    text-decoration: line-through;
    svg {
      opacity: 0;
    }
  }
  li.enable {
    ${textColor.default};
    svg {
      color: ${systemColor.checked};
    }
  }
`;
