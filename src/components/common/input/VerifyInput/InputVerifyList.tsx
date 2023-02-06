import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EInputStatus } from "../";
import InputVerifyItem from "./InputVerifyItem";

const StyledUl = styled.ul`
  box-sizing: border-box;
  min-height: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export interface IInputVerifyResult {
  description: string;
  result: EInputStatus;
}

interface IProps {
  inputVerifyResultList: Promise<IInputVerifyResult[]>;
}

const InputVerifyList = ({ inputVerifyResultList }: IProps): JSX.Element => {
  const [verifyList, setVerifyList] = useState<IInputVerifyResult[]>([]);

  useEffect(() => {
    inputVerifyResultList.then((data) => setVerifyList(data));
  }, [inputVerifyResultList]);

  return (
    <StyledUl>
      {verifyList.map((item, index) => (
        <InputVerifyItem key={index} description={item.description} result={item.result} />
      ))}
    </StyledUl>
  );
};

export default React.memo(InputVerifyList);
