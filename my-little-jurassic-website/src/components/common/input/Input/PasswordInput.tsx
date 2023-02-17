import React, { forwardRef, useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import styled from "styled-components";
import { EInputStatus } from "..";
import { getStatusColor } from "./Input";

/**
 * Status 값에 따라 3개 중 하나의 컬러를 반환하는 함수
 * @param status 상태
 * @param defaultColor 기본컬러
 * @param successColor 성공컬러
 * @param failColor 실패컬러
 * @returns 선택된 컬러
 */

const StyledDiv = styled.div<{ status: EInputStatus }>`
  box-sizing: border-box;
  width: 100%;
  max-width: 292px;
  height: 48px;
  border: 4px solid
    ${({ theme, status }) =>
      getStatusColor(status, theme.colors.secondaryText, theme.colors.green, theme.colors.red)};
  border-radius: 32px;
  padding: 11px 22px;
  ${({ theme }) => theme.shadow}; //shadow CSS
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: all 0.1s ease-in-out;

  &:hover {
    border-color: ${({ theme, status }) =>
      getStatusColor(status, theme.colors.secondaryText, theme.colors.green, theme.colors.red) +
      "aa"};
  }
  &:focus-within {
    border-width: 6px;
    padding: 9px 20px;
  }

  & > input {
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
    font: ${({ theme }) => theme.fonts.subContentBold};
    color: ${({ theme }) => theme.colors.primaryText};
    background-color: ${({ theme }) => theme.colors.secondaryBg};
    &:focus {
      outline: none;
    }
    &::placeholder {
      font: ${({ theme }) => theme.fonts.subContentBold};
      color: ${({ theme }) => theme.colors.brandColors.basaltGray[400]};
    }
  }
  & > button {
    width: 20px;
    display: flex;
    align-items: center;
    margin-left: 8px;
    border: 0;
    padding: 0;
    background: none;
    transition: all 0.1s ease-in-out;
    & > svg {
      font-size: 24px;
      margin-right: -6px;
      stroke-width: 3px;
      color: ${({ theme }) => theme.colors.secondaryText};
    }
  }
`;

interface IProps {
  value: string;
  setValue(value: string): void;
  status: EInputStatus;
  placeholder: string;
  focusOut?(value: string): void;
}

const PasswordInput = forwardRef<HTMLInputElement, IProps>(
  (
    { value = "", setValue, status = EInputStatus.default, placeholder = "", focusOut }: IProps,
    ref,
  ): JSX.Element => {
    const [type, setType] = useState("password");

    const toggleType = () => {
      if (type === "password") setType("text");
      else setType("password");
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (focusOut) focusOut(e.target.value);
    };

    return (
      <StyledDiv status={status}>
        <input
          ref={ref}
          defaultValue={value}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        <button onClick={toggleType} type="button">
          {type === "password" ? <TbEyeOff /> : <TbEye />}
        </button>
      </StyledDiv>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export default React.memo(PasswordInput);
