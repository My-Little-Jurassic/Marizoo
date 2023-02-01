import { JSX_TYPES } from "@babel/types";
import React from "react";
import DefaultInput from "./DefaultInput";
import PasswordInput from "./PasswordInput";

/**
 * Input Status Enum
 * 기본 input에서 border 색상을 지정하고 싶으면 사용하세요
 */
export enum EInputStatus {
  default = "default",
  success = "success",
  fail = "fail",
}

/**
 * Status 값에 따라 3개 중 하나의 컬러를 반환하는 함수
 * @param status 상태
 * @param defaultColor 기본컬러
 * @param successColor 성공컬러
 * @param failColor 실패컬러
 * @returns 선택된 컬러
 */
export const getStatusColor = (
  status: EInputStatus,
  defaultColor: string,
  successColor: string,
  failColor: string,
): string => {
  switch (status) {
    case EInputStatus.success:
      return successColor;
    case EInputStatus.fail:
      return failColor;
    case EInputStatus.default:
    default:
      return defaultColor;
  }
};

interface IProps {
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  value?: string; // 초기값
  setValue(value: string): void; // value값을 전달받을 함수
  status?: EInputStatus; // input 상태 값
  placeholder?: string;
  focusOut?(value: string): void; // focusout 시 value값을 전달받을 함수
  type?: string; // input type
}

const Input = ({
  ref,
  value = "",
  setValue,
  status = EInputStatus.default,
  placeholder = "",
  focusOut,
  type = "text",
}: IProps): JSX.Element => {
  if (type === "password")
    return (
      <PasswordInput
        status={status}
        ref={ref}
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        focusOut={focusOut}
      />
    );
  else
    return (
      <DefaultInput
        status={status}
        ref={ref}
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        focusOut={focusOut}
        type={type}
      />
    );
};

export default React.memo(Input);
