import React, { forwardRef, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Input, { EInputStatus } from "../Input/Input";
import VerifyInfoList, { IInputVerifyResult } from "./InputVerifyList";

const StyledDiv = styled.div`
  width: 100%;
  max-width: 292px;
`;

export interface IInputVerify {
  description: string; // 사용자에게 보여질 설명
  verify(value: string): boolean | Promise<boolean>; // value를 받아 참 거짓을 판별하는 함수
  lazy?: boolean; // focusOut 후에 판단할지를 결정하는
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
      async (str: string, all = false): Promise<IInputVerifyResult[]> => {
        const targetList = inputVerifyList.filter(
          (item) => !item.lazy || inputStatus !== EInputStatus.default || all,
        );
        const result = await Promise.all(
          targetList.map<Promise<IInputVerifyResult>>(async (item) => {
            const { description, verify } = item;
            let result = EInputStatus.default;

            if (item.lazy && !all) {
              result = (await verify(value)) ? EInputStatus.success : EInputStatus.fail;
            } else if (str && !isInitial.current) {
              result = (await verify(str)) ? EInputStatus.success : EInputStatus.fail;
            }
            return { description, result };
          }),
        );
        return result;
      },
      [isInitial, inputStatus, inputVerifyList],
    );

    /**
     * input 조건 전체에 대해 만족 여부를 반환하는 함수
     * @returns totalInputVerifyResult
     */
    const getTotalInputVerifyResult = useCallback(
      async (str: string): Promise<boolean> => {
        let totalInputVerifyResult = true;
        const list = await getInputVerifyResultList(str, true);
        list.forEach((item) => {
          totalInputVerifyResult = totalInputVerifyResult && item.result === EInputStatus.success;
        });
        return totalInputVerifyResult;
      },
      [getInputVerifyResultList],
    );

    const setValue = useCallback(
      (newValue: string) => {
        setInputValue(newValue);
        isInitial.current = false;
      },
      [setInputValue],
    );

    /**
     * input tag에 focusout 발생시 최종 input값과 판별결과를 상위에 알리는 함수
     */
    const focusOut = useCallback(
      async (newValue: string) => {
        const totalInputVerifyResult = await getTotalInputVerifyResult(newValue);
        setInputStatus(totalInputVerifyResult ? EInputStatus.success : EInputStatus.fail);
        submitInputResult(newValue, totalInputVerifyResult);
      },
      [getTotalInputVerifyResult, submitInputResult],
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
