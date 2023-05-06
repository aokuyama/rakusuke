import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { mainColor } from "../styles/color";

export type Item = { id: string | number; name: ReactNode };
export type Data = { id: string | number; items: Item[] };

type Props = {
  header: Item[];
  dataList: Data[];
  clickIdHandler?: (id: string | number) => void;
};

export const Table: FC<Props> = ({ header, dataList, clickIdHandler }) => {
  return (
    <table css={table}>
      <thead>
        <tr
          onClick={
            clickIdHandler
              ? () => {
                  clickIdHandler(0);
                }
              : undefined
          }
        >
          {header.map((item) => {
            return <th key={item.id}>{item.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataList.map((data) => {
          return (
            <tr
              key={data.id}
              onClick={
                clickIdHandler
                  ? () => {
                      clickIdHandler(data.id);
                    }
                  : undefined
              }
            >
              {data.items.map((item) => {
                return <td key={item.id}>{item.name}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const table = css`
  overflow-x: scroll;
  border-collapse: collapse;
  border-spacing: 0;
  width: 700px;

  tr {
    border-bottom: solid 1px #eee;
  }

  tbody tr:hover {
    background-color: ${mainColor.brighter};
    cursor: pointer;
  }

  th,
  td {
    text-align: center;
    padding: 15px 0;
  }

  td.icon {
    background-size: 35px;
    background-position: left 5px center;
    background-repeat: no-repeat;
    padding-left: 30px;
  }
`;
