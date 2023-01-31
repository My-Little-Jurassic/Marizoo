import React from "react";
import styled from "styled-components";
import { TbInfoCircle, TbCheck, TbX } from "react-icons/tb";
import { IInputVerifyResult } from "./InputVerifyList";
import { EInputStatus } from "..";
import { getStatusColor } from "../Input/Input";

const StyledLi = styled.li<{ status: EInputStatus }>`
  margin: 3px 0 0 13px;
  font: ${({ theme }) => theme.fonts.tinyContentBold};
  color: ${({ theme, status }) =>
    getStatusColor(status, theme.colors.secondaryText, theme.colors.green, theme.colors.red)};
  text-align: left;
  display: flex;
  align-items: center;

  svg {
    margin-right: 6px;
    stroke-width: 3px;
  }
`;

const InputVerifyItem = ({ description, result }: IInputVerifyResult): JSX.Element => {
  const Icon = () => {
    switch (result) {
      case EInputStatus.success:
        return <TbCheck />;
      case EInputStatus.fail:
        return <TbX />;
      case EInputStatus.default:
      default:
        return <TbInfoCircle />;
    }
  };

  return (
    <StyledLi status={result}>
      {Icon()}
      {description}
    </StyledLi>
  );
};

export default InputVerifyItem;
