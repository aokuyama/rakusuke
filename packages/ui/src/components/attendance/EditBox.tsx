import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { colorSet, mainColor, mainText } from "../../styles/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

type Props = {
  name: ReactNode;
  button?: {
    id: string;
    clickIdHandler: (id: string | number) => void;
  };
  children: React.ReactNode;
};

export const EditBox: FC<Props> = ({ name, button, children }) => {
  return (
    <div css={boxStyle}>
      <div css={titleStyle}>
        <div />
        <span>{name}</span>
        <div>
          {button && (
            <button
              css={editButton}
              onClick={() => {
                button.clickIdHandler(button.id);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} width={20} />
            </button>
          )}
        </div>
      </div>
      <div css={contentStyle}>{children}</div>
    </div>
  );
};

const boxStyle = css`
  width: 480px;
  margin: 0 auto 16px;
  border: 2px solid ${mainColor.default};
  border-radius: 3px;
`;
const titleStyle = css`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  ${colorSet.main}
  font-weight: 600;
  div {
    display: inline-block;
    width: 32px;
  }
  span {
    display: inline-block;
    text-align: center;
    width: ${480 - 32 - 32}px;
    padding: 8px 0;
  }
`;
const contentStyle = css`
  margin: 0;
  padding: 16px;
`;
const editButton = css`
  border: none;
  background: none;
  color: ${mainText.default};
`;
