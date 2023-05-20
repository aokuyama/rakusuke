import { FC, ReactNode } from "react";
import ReactModal from "react-modal";
import { CloseButton } from "./CloseButton";
import { css } from "@emotion/react";
import { backgroundColor, textColor } from "../styles/color";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
};

export const Modal: FC<Props> = ({ isOpen, children, onRequestClose }) => {
  return (
    <ReactModal
      css={modalStyles}
      style={reactModalStyle}
      isOpen={isOpen}
      onRequestClose={() => onRequestClose()}
    >
      <div css={buttonStyles}>
        <CloseButton onClick={() => onRequestClose()} />
      </div>
      {children}
    </ReactModal>
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
    top: "20px",
    bottom: "20px",
    left: 0,
    right: 0,
    padding: "0 1rem 1rem",
    width: "480px",
    margin: "auto",
    overflow: "scroll",
  },
} as const;

const modalStyles = css`
  ${textColor.default};
  ${backgroundColor.background};
`;

const buttonStyles = css`
  text-align: right;
  padding-top: 0.5rem;
`;
