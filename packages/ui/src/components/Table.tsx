import { FC, ReactNode } from "react";
import { css } from "@emotion/react";

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
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  width: 100%;
  border-collapse: collapse;
  th {
    width: 13%;
    background: #f4f4f4;
    padding: 10px;
    border: 1px solid #dddddd;
  }
  td {
    text-align: left;
    vertical-align: top;
    padding: 10px;
    border: 1px solid #dddddd;
  }
  td:first-child {
    text-align: left;
    vertical-align: middle;
    font-weight: bold;
  }
  @media only screen and (max-width: 480px) {
    display: block;
    width: 100%;
    thead {
      display: block;
      float: left;
      overflow-x: scroll;
    }
    tbody {
      display: block;
      width: auto;
      overflow-x: auto;
      white-space: nowrap;
    }
    th {
      display: block;
      width: auto;
      border-width: 1px 0px 0px 1px;
      border-color: #dddddd;
      border-style: solid;
    }
    th:last-child {
      border-bottom: 1px solid #dddddd;
    }
    tbody tr {
      display: inline-block;
      margin: 0;
    }
    td {
      display: block;
      border-width: 1px 1px 0px 1px;
      border-color: #dddddd;
      border-style: solid;
    }
    td:last-child {
      border-bottom: 1px solid #dddddd;
    }
  }
`;
