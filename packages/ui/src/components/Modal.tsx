import { FC, ReactNode } from "react";
import ReactModal from "react-modal";
import { CloseButton } from "./CloseButton";
import { css } from "@emotion/react";
import { backgroundColor, textColor } from "../styles/color";
import { mordalSize } from "../styles/size";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
};

export const Modal: FC<Props> = ({ isOpen, children, onRequestClose }) => {
  return (
    <>
      <ReactModal
        css={modalStyles}
        style={reactModalStyle}
        isOpen={isOpen}
        onRequestClose={() => onRequestClose()}
      >
        <div css={buttonStyles}>
          <CloseButton onClick={() => onRequestClose()} />
        </div>
        <div css={[bodyStyles, modalSize]}>
          <div>{children}</div>
        </div>
      </ReactModal>
    </>
  );
};

const reactModalStyle = {
  overlay: {
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  content: {
    position: "absolute",
    top: "32px",
    bottom: 0,
    left: 0,
    right: 0,
    width: "fit-content",
    margin: "auto",
    overflow: "inherit",
  },
} as const;

const modalStyles = css`
  ${textColor.default};
  ${backgroundColor.background};
`;

const buttonStyles = css`
  text-align: right;
  margin: 16px 16px 0;
`;
const bodyStyles = css`
  overflow: scroll;
  height: 100%;
  > div {
    margin: 0 20px 20px;
    padding: 0 0 20px;
  }
`;

const modalSize = css`
  max-width: ${mordalSize.default}px;
  @media screen and (min-width: ${mordalSize.smart1}px) {
    max-width: ${mordalSize.smart1}px;
  }
`;
