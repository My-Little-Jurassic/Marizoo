import React from "react";
import styled from "styled-components";
import { EInputStatus } from "..";
import { getStatusColor } from "./Input";

const StyledInput = styled.input<{ status: EInputStatus }>`
  box-sizing: border-box;
  width: 100%;
  max-width: 292px;
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
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  value: string;
  setValue(value: string): void;
  status: EInputStatus;
  placeholder: string;
  focusOut?(value: string): void;
  type: string;
}

const DefaultInput = ({
  ref,
  value,
  setValue,
  status,
  placeholder,
  focusOut,
  type,
}: IProps): JSX.Element => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (focusOut) focusOut(e.target.value);
  };

  return (
    <StyledInput
      ref={ref}
      status={status}
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default React.memo(DefaultInput);
