import { FC, ReactNode } from "react";
import ReactModal from "react-modal";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
};

export const Modal: FC<Props> = ({ isOpen, children, onRequestClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose()}
      style={style}
    >
      {children}
    </ReactModal>
  );
};

const style = {
  overlay: {
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.80)",
  },
  content: {
    backgroundColor:
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "#222"
          : "#fff"
        : "inherit",
  },
};
