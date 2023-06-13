import { FC } from "react";
import { Toaster as ToasterBase } from "react-hot-toast";
import { black, mainColor, systemColor, white } from "../styles/color";

export const Toaster: FC = () => {
  return (
    <ToasterBase
      containerStyle={{
        top: 64,
      }}
      toastOptions={{
        style: {
          padding: "12px",
          backgroundColor: white.default,
          color: black.default,
        },
        success: {
          iconTheme: {
            primary: white.default,
            secondary: systemColor.checked,
          },
        },
        error: {
          iconTheme: {
            primary: white.default,
            secondary: systemColor.error,
          },
        },
        loading: {
          iconTheme: {
            primary: mainColor.default,
            secondary: mainColor.brighter,
          },
        },
      }}
    />
  );
};
