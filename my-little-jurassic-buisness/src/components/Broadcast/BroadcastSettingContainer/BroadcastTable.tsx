import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { IAnimal } from "../../../types";

interface IProps {
  toggleAnimal(list: (number | undefined)[]): void;
}

const BroadcastTable = ({ toggleAnimal }: IProps) => {
  const [animalList, setAnimalList] = useState<IAnimal[]>([
    { id: 1, name: "레오", select: false, classification: "레오파드게코" },
    { id: 2, name: "좌파", select: true, classification: "아홀로틀" },
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
  & > thead th {
    border: 1px solid ${({ theme }) => theme.colors.secondaryText};
    background-color: ${({ theme }) => theme.colors.secondaryText};
    border-radius: 8px;
    padding: 8px;
  }
  * {
    margin: 0;
  }
`;

export default React.memo(BroadcastTable);
