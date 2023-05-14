import { Ring } from "@uiball/loaders";
import { FC } from "react";
import { mainColor } from "../styles/color";

export const Spinner: FC = () => {
  return <Ring size={80} color={mainColor.lighter} />;
};
