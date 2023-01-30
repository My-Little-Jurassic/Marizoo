import React from "react";
import styled from "styled-components";

enum EState {
  default = "default",
  success = "success",
  fail = "fail",
}

/**
 * State 값에 따라 3개 중 하나의 컬러를 반환하는 함수
 * @param state 상태
 * @param defaultColor 기본컬러
 * @param successColor 성공컬러
 * @param failColor 실패컬러
 * @returns 선택된 컬러
 */
const getStateColor = (
  state: EState,
  defaultColor: string,
  successColor: string,
  failColor: string,
): string => {
  switch (state) {
    case EState.success:
      return successColor;
    case EState.fail:
      return failColor;
    case EState.default:
    default:
      return defaultColor;
  }
};

const StyledInput = styled.input<{ state: EState }>`
  box-sizing: border-box;
  width: 292px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  border: 4px solid
    ${({ theme, state }) =>
      getStateColor(state, theme.colors.secondaryText, theme.colors.green, theme.colors.red)};
  border-radius: 32px;
  padding: 11px 22px;
  font: ${({ theme }) => theme.fonts.subContentBold};
  color: ${({ theme }) => theme.colors.primaryText};
  ${({ theme }) => theme.shadow}; //shadow CSS
  transition: all 0.1s ease-in-out;

  &:hover {
    border-color: ${({ theme, state }) =>
      getStateColor(state, theme.colors.secondaryText, theme.colors.green, theme.colors.red) +
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
  value: string;
  setValue(value: string): void;
  state?: EState;
  placeholder?: string;
}

const Input = ({
  value,
  setValue,
  state = EState.default,
  placeholder = "",
}: IProps): JSX.Element => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <StyledInput state={state} value={value} placeholder={placeholder} onChange={onChange} />;
};

export default Input;
