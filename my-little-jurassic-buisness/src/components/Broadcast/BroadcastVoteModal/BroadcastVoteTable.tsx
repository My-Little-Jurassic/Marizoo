import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IFeed } from "../../../types";

const BroadcastVoteTable = () => {
  const [feeds, setFeeds] = useState<IFeed[]>([]);
  useEffect(() => {
    initFeeds().then((val) => setFeeds(val));
  }, []);

  const initFeeds = async (): Promise<IFeed[]> => {
    return [
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
      {
        id: 1,
        name: "밀웜",
        img: "test.png",
      },
    ];
  };
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>먹이</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {feeds.map((feed, index) => (
          <tr key={index}>
            <td>{feed.name}</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

const StyledTable = styled.table`
  border-radius: 8px;
  overflow: hidden;
  margin: 16px auto;
  width: 100%;
  max-width: 400px;
  height: 100%;
  & tr {
    display: flex;
    table-layout: fixed;
    & > *:nth-child(1) {
      flex: 5 1 0;
    }
    & > *:nth-child(2) {
      flex: 1 1 0;
      display: flex;
      justify-content: center;
    }
  }
  & > thead th {
    height: 16px;
    border: 1px solid ${({ theme }) => theme.colors.secondaryText};
    background-color: ${({ theme }) => theme.colors.secondaryText};
    padding: 8px;
    font: ${({ theme }) => theme.fonts.header6};
    color: ${({ theme }) => theme.colors.secondaryBg};
  }
  & > tbody {
    display: block;
    height: calc(100% - 16px);
    max-height: 100%;
    overflow: auto;
    & > tr {
      border-bottom: 1px solid ${({ theme }) => theme.colors.disable};
      font: ${({ theme }) => theme.fonts.subContent};
      color: ${({ theme }) => theme.colors.primaryText};
      & > td {
        text-align: center;
        padding: 5px;
      }
      & input {
        margin: 5px;
        padding: auto;
        height: auto;
      }
    }
  }
  * {
    margin: 0;
  }
`;
export default BroadcastVoteTable;
