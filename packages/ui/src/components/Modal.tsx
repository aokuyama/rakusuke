import { FC, ReactNode, useState } from "react";
import ReactModal from "react-modal";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
};

export const Modal: FC<Props> = ({ isOpen, children, onRequestClose }) => {
  return (
    <>
      <ReactModal isOpen={isOpen} onRequestClose={() => onRequestClose()}>
        {children}
      </ReactModal>
    </>
  );
};
