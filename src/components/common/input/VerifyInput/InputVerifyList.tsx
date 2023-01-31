import React from "react";
import styled from "styled-components";
import { EInputStatus } from "../";
import InputVerifyItem from "./InputVerifyItem";

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export interface IInputVerifyResult {
  description: string;
  result: EInputStatus;
}

interface IProps {
  inputVerifyResultList: IInputVerifyResult[];
}

const InputVerifyList = ({ inputVerifyResultList }: IProps): JSX.Element => {
  return (
    <StyledUl>
      {inputVerifyResultList.map((item, index) => (
        <InputVerifyItem key={index} description={item.description} result={item.result} />
      ))}
    </StyledUl>
  );
};

export default InputVerifyList;
