import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { getStoreAnimal } from "../../../../api";
import { IAnimal } from "../type";

interface IProps {
  storeId: string;
  disabled: boolean;
  selectAnimalIdList: number[];
  toggleAnimal(list: (number | undefined)[]): void;
}

const BroadcastTable = ({ storeId, disabled, selectAnimalIdList, toggleAnimal }: IProps) => {
  const [animalList, setAnimalList] = useState<IAnimal[]>([]);

  useEffect(() => {
    getAnimalList().then((val) => setAnimalList(val));
  }, []);

  const getAnimalList = async () => {
    const animals: IAnimal[] = await getStoreAnimal(storeId).then((res) => res.data.animals);

    // select 값은 기본 false로 삽입한다.
    // 서버로부터 받은 동물 리스트에 대해 이미 선택되어있는 동물의 select 값을 true로 변경하여 반환한다.
    return animals.map((animal) => {
      if (selectAnimalIdList.find((id) => id === animal.id)) {
        animal.select = true;
      } else animal.select = false;
      return animal;
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const index = Number(e.target.value);
    const newAnimalList = [...animalList];
    newAnimalList[index].select = !newAnimalList[index].select;
    toggleAnimal(
      newAnimalList.map((item) => (item.select ? item.id : undefined)).filter((item) => item),
    );
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
              <input
                type="checkbox"
                value={index}
                checked={item.select}
                onChange={onChange}
                disabled={disabled}
              />
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
