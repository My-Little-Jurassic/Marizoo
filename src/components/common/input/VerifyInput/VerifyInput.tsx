import React, { useCallback, useRef, useState } from "react";
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
  type?: string;
  inputVerifyList: IInputVerify[];
  submitInputResult(value: string, result: boolean): void;
}

const VerifyInput = ({
  value = "",
  placeholder = "",
  type = "text",
  inputVerifyList,
  submitInputResult,
}: IProps): JSX.Element => {
  const [inputValue, setInputValue] = useState(value);
  const [inputStatus, setInputStatus] = useState(EInputStatus.default);
  const isInitial = useRef(true);

  /**
   * input 조건 판별 결과를 담은 배열
   */
  const getInputVerifyResultList = useCallback(
    (str: string): IInputVerifyResult[] => {
      const result = inputVerifyList.map<IInputVerifyResult>((item) => {
        const { description, verify } = item;
        let result = EInputStatus.default;

        if (str && !isInitial.current) {
          result = verify(str) ? EInputStatus.success : EInputStatus.fail;
        }
        return { description, result };
      });

      if (isInitial.current) isInitial.current = false;
      return result;
    },
    [isInitial],
  );

  /**
   * input 조건 전체에 대해 만족 여부를 반환하는 함수
   * @returns totalInputVerifyResult
   */
  const getTotalInputVerifyResult = useCallback(
    (str: string): boolean => {
      let totalInputVerifyResult = true;
      getInputVerifyResultList(str).forEach((item) => {
        totalInputVerifyResult = totalInputVerifyResult && item.result === EInputStatus.success;
      });
      return totalInputVerifyResult;
    },
    [getInputVerifyResultList],
  );

  const setValue = useCallback(
    (newValue: string) => {
      setInputValue(newValue);
    },
    [setInputValue],
  );

  /**
   * input tag에 focusout 발생시 최종 input값과 판별결과를 상위에 알리는 함수
   */
  const focusOut = useCallback(
    (newValue: string): void => {
      const totalInputVerifyResult = getTotalInputVerifyResult(newValue);
      setInputStatus(totalInputVerifyResult ? EInputStatus.success : EInputStatus.fail);
      submitInputResult(newValue, totalInputVerifyResult);
    },
    [getTotalInputVerifyResult],
  );

  return (
    <StyledDiv>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        setValue={setValue}
        focusOut={focusOut}
        status={inputStatus}
      />
      <VerifyInfoList inputVerifyResultList={getInputVerifyResultList(inputValue)} />
    </StyledDiv>
  );
};

export default React.memo(VerifyInput);
