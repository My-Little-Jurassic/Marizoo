import { JSX_TYPES } from "@babel/types";
import React from "react";
import DefaultInput from "./DefaultInput";
import PasswordInput from "./PasswordInput";

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
  value?: string;
  setValue(value: string): void;
  status?: EInputStatus;
  placeholder?: string;
  focusOut?(value: string): void;
  type?: string;
}

const Input = ({
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
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        focusOut={focusOut}
        type={type}
      />
    );
};

export default React.memo(Input);
