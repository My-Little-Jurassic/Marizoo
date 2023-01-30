import React, { useRef, useState } from "react";
import styled from "styled-components";
import Input, { EInputStatus } from "../Input/Input";
import VerifyInfoList, { IInputVerifyResult } from "./InputVerifyList";

const StyledDiv = styled.div``;

export interface IInputVerify {
  description: string;
  verify(value: string): boolean;
}

interface IProps {
  value?: string;
  placeholder?: string;
  inputVerifyList: IInputVerify[];
  submitInputResult(value: string, result: boolean): void;
}

const VerifyInput = ({
  value = "",
  placeholder = "",
  inputVerifyList,
  submitInputResult,
}: IProps): JSX.Element => {
  const [inputValue, setInputValue] = useState(value);
  const isInitial = useRef(true);
  const inputStatus = useRef(EInputStatus.default);

  /**
   * input 조건 판별 결과를 담은 배열을 반환하는 함수
   * @returns IInputVerifyResult[]
   */
  const getInputVerifyResultList = (): IInputVerifyResult[] => {
    const inputVerifyResultList = inputVerifyList.map<IInputVerifyResult>((item) => {
      const { description, verify } = item;
      let result = EInputStatus.default;

      if (!isInitial.current) {
        result = verify(inputValue) ? EInputStatus.success : EInputStatus.fail;
      }
      return { description, result };
    });
    if (isInitial.current) isInitial.current = false;
    return inputVerifyResultList;
  };

  /**
   * input 조건 전체에 대해 만족 여부를 반환하는 함수
   * @returns totalInputVerifyResult
   */
  const getTotalInputVerifyResult = (): boolean => {
    const inputVerifyResultList = getInputVerifyResultList();
    let totalInputVerifyResult = true;
    inputVerifyResultList.forEach((item) => {
      totalInputVerifyResult = totalInputVerifyResult && item.result === EInputStatus.success;
    });
    return totalInputVerifyResult;
  };

  /**
   * input tag에 focusout 발생시 최종 input값과 판별결과를 상위에 알리는 함수
   */
  const focusOut = (): void => {
    const totalInputVerifyResult = getTotalInputVerifyResult();
    inputStatus.current = totalInputVerifyResult ? EInputStatus.success : EInputStatus.fail;
    submitInputResult(inputValue, totalInputVerifyResult);
  };

  return (
    <StyledDiv>
      <Input
        value={inputValue}
        placeholder={placeholder}
        setValue={setInputValue}
        onBlur={focusOut}
        status={inputStatus.current}
      />
      <VerifyInfoList inputVerifyResultList={getInputVerifyResultList()} />
    </StyledDiv>
  );
};

export default VerifyInput;
