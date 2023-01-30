import React from "react";
import styled from "styled-components";

// 버튼의 설정값(props)
interface IBtn {
  label: string; // 라벨
  type: number; // 타입(0: primery / 1: secondery / 2: tertiary)
  isDisable: boolean; // 비활성화 여부
}

function GreenBtn(props: IBtn) {
  return (
    <StyledBtn btnType={props.type} isDisable={props.isDisable}>
      <StyledBtnLabel>{props.label}</StyledBtnLabel>
    </StyledBtn>
  );
}

export default GreenBtn;

// StyledBtn의 props 타입
interface IStyledBtn {
  btnType: number;
  isDisable: boolean;
}

const StyledBtn = styled.button<IStyledBtn>`
  ${(props) => (props.isDisable ? null : props.theme.styles.button)}
  cursor: ${(props) => (props.isDisable ? "not-allowed" : "pointer")};
  max-width: 200px;
  min-height: 48px;
  border: none;
  border-radius: 32px;
  padding-inline: 24px;
  background: ${(props) => {
    if (props.btnType === 0) {
      if (props.isDisable) {
        return props.theme.colors.disable;
      } else {
        return props.theme.colors.green;
      }
    } else if (props.btnType === 1) {
      return props.theme.colors.primaryBg;
    } else {
      return props.theme.colors.seconderyBg;
    }
  }};
  box-shadow: 0 0 0
    ${(props) => {
      if (props.btnType !== 1) {
        return null;
      } else {
        if (props.isDisable) {
          return `4px ${props.theme.colors.disable}`;
        } else {
          return `4px ${props.theme.colors.green}`;
        }
      }
    }}
    inset;
  color: ${(props) => {
    if (props.btnType === 0) {
      return props.theme.colors.primaryBg;
    } else {
      if (props.isDisable) {
        return props.theme.colors.disable;
      } else {
        return props.theme.colors.green;
      }
    }
  }};
`;

const StyledBtnLabel = styled.a`
  font: ${(props) => props.theme.fonts.mainContentBold};
  display: flex;
  align-items: center;
  word-break: break-all;
`;
