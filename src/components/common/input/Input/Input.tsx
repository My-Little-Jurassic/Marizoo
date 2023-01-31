import React, { useRef } from "react";
import styled from "styled-components";

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

const StyledInput = styled.input<{ status: EInputStatus }>`
  box-sizing: border-box;
  width: 292px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  border: 4px solid
    ${({ theme, status }) =>
      getStatusColor(status, theme.colors.secondaryText, theme.colors.green, theme.colors.red)};
  border-radius: 32px;
  padding: 11px 22px;
  font: ${({ theme }) => theme.fonts.subContentBold};
  color: ${({ theme }) => theme.colors.primaryText};
  ${({ theme }) => theme.shadow}; //shadow CSS
  transition: all 0.1s ease-in-out;

  &:hover {
    border-color: ${({ theme, status }) =>
      getStatusColor(status, theme.colors.secondaryText, theme.colors.green, theme.colors.red) +
      "aa"};
  }
  &:focus {
    outline: none;
    border-width: 6px;
    padding: 9px 20px;
  }
  &::placeholder {
    font: ${({ theme }) => theme.fonts.subContentBold};
    color: ${({ theme }) => theme.colors.brandColors.basaltGray[400]};
  }
`;

interface IProps {
  value?: string;
  setValue(value: string): void;
  status?: EInputStatus;
  placeholder?: string;
  focusOut?(value: string): void;
}

const Input = ({
  value = "",
  setValue,
  status = EInputStatus.default,
  placeholder = "",
  focusOut,
}: IProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    if (focusOut && inputRef.current) focusOut(inputRef.current.value);
  };

  return (
    <StyledInput
      ref={inputRef}
      status={status}
      defaultValue={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default React.memo(Input);
