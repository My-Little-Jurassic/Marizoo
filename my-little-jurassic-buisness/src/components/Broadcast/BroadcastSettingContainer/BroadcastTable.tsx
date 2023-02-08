import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { IAnimal } from "../../../types";

interface IProps {
  toggleAnimal(list: (number | undefined)[]): void;
}

const BroadcastTable = ({ toggleAnimal }: IProps) => {
  const [animalList, setAnimalList] = useState<IAnimal[]>([
    // TODO: 비동기를 통한 샵 동물 목록을 받아와 저장
    { id: 1, name: "레오", select: false, classification: "레오파드게코" },
    { id: 2, name: "좌파", select: false, classification: "아홀로틀" },
  ]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const index = Number(e.target.value);
    const newAnimalList = [...animalList];
    newAnimalList[index].select = !newAnimalList[index].select;
    toggleAnimal(newAnimalList.map((item) => (item.select ? item.id : undefined)));
    setAnimalList(newAnimalList);
  };
  return (
    <StyledTable>
      <thead>
        <tr>
          <th> </th>
          <th>이름</th>
          <th>종</th>
        </tr>
      </thead>
      <tbody>
        {animalList.map((item, index) => (
          <tr key={index}>
            <td>
              <input type="checkbox" value={index} checked={item.select} onChange={onChange} />
            </td>
            <td>{item.name}</td>
            <td>{item.classification}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

const StyledTable = styled.table`
  border-radius: 8px;
  overflow: hidden;
  & tr {
    display: flex;
    table-layout: fixed;
    & > *:nth-child(1) {
      flex: 1 1 0;
      display: flex;
      justify-content: center;
    }
    & > *:nth-child(2) {
      flex: 3 1 0;
    }
    & > *:nth-child(3) {
      flex: 5 1 0;
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
    max-height: 120px;
    overflow: auto;
    & > tr {
      border-bottom: 1px solid ${({ theme }) => theme.colors.disable};
      font: ${({ theme }) => theme.fonts.subContent};
      color: ${({ theme }) => theme.colors.primaryText};
      & > td {
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

export default React.memo(BroadcastTable);
