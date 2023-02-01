import React, { forwardRef, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Input, { EInputStatus } from "../Input/Input";
import VerifyInfoList, { IInputVerifyResult } from "./InputVerifyList";

const StyledDiv = styled.div``;

export interface IInputVerify {
  description: string; // 사용자에게 보여질 설명
  verify(value: string): boolean; // value를 받아 참 거짓을 판별하는 함수
}

interface IProps {
  value?: string; // 초기값
  placeholder?: string;
  type?: string; // input type
  inputVerifyList: IInputVerify[]; // 조건 목록
  submitInputResult(value: string, result: boolean): void; // focusOut시 value와 전체 조건 만족여부를 받을 함수
}

const VerifyInput = forwardRef<HTMLInputElement, IProps>(
  (
    { value = "", placeholder = "", type = "text", inputVerifyList, submitInputResult }: IProps,
    ref,
  ): JSX.Element => {
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
          ref={ref}
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
  },
);

VerifyInput.displayName = "VerifyInput";

export default React.memo(VerifyInput);
