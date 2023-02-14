import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { postBroadcastFeeds } from "../../../../api";
import { IFeed } from "../type";

interface IProps {
  animalIdList: number[];
  setFeedList(list: (IFeed | undefined)[]): void;
}

interface ISelectFeed extends IFeed {
  select: boolean;
}

const BroadcastVoteTable = ({ animalIdList, setFeedList }: IProps) => {
  const [feeds, setFeeds] = useState<ISelectFeed[]>([]);

  useEffect(() => {
    getFeedList.then((val) => setFeeds(val));
  }, [animalIdList]);

  // 먹이 정보를 가져오는 함수
  const getFeedList = useMemo(async (): Promise<ISelectFeed[]> => {
    return animalIdList.length
      ? postBroadcastFeeds({ animalIdList })
          .then((res) => res.data.feeds)
          .catch(() => [])
      : [];
  }, [animalIdList]);

  // 먹이 선택 이벤트
  const changeFeeds = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newFeeds = feeds.map((feed) => {
      if (feed.id === +value) feed.select = checked;
      feed.numberOfVotes = 0;
      return feed;
    });
    setFeeds(newFeeds);
    setFeedList(newFeeds.map((feed) => (feed.select ? feed : undefined)).filter((item) => item));
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
        {!feeds.length ? (
          <tr>
            <td colSpan={2}>먹일 수 있는 먹이가 없습니다!</td>
          </tr>
        ) : (
          feeds.map((feed, index) => (
            <tr key={index}>
              <td>{feed.name}</td>
              <td>
                <input
                  type="checkbox"
                  value={feed.id}
                  onChange={changeFeeds}
                  checked={feed.select ?? false}
                />
              </td>
            </tr>
          ))
        )}
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
export default React.memo(BroadcastVoteTable);
