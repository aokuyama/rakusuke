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
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    padding: "0 1rem 1rem",
  },
} as const;

const modalStyles = css`
  ${textColor.default};
  ${backgroundColor.default};
`;

const buttonStyles = css`
  text-align: right;
  padding-top: 0.5rem;
`;
