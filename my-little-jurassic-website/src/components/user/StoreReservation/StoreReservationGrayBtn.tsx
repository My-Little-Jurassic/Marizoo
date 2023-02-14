import React from "react";
import styled from "styled-components";

// 버튼의 설정값(props)
interface IProps {
  label: string; // 라벨
  type: number; // 타입(0: primary / 1: secondary / 2: tertiary)
  isDisable: boolean; // 비활성화 여부
  onClick?(): void; // onclick props
}

function GrayBtn(props: IProps) {
  return (
    <StyledBtn btnType={props.type} isDisable={props.isDisable} onClick={props.onClick}>
      {props.label}
    </StyledBtn>
  );
}

export default GrayBtn;

const StyledBtn = styled.button<{ btnType: number; isDisable: boolean }>`
  ${(props) => (props.isDisable ? null : props.theme.styles.button)}
  cursor: ${(props) => (props.isDisable ? "not-allowed" : "pointer")};
  width: 100%;
  min-width: 160px;
  border: none;
  border-radius: 32px;
  padding-inline: 24px;
  padding-block: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
  font: ${(props) => props.theme.fonts.mainContentBold};
  background: ${(props) => {
    if (props.btnType === 0) {
      if (props.isDisable) {
        return props.theme.colors.disable;
      } else {
        return props.theme.colors.secondaryText;
      }
    } else if (props.btnType === 1) {
      return props.theme.colors.primaryBg;
    } else {
      return props.theme.colors.primaryBg;
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
          return `4px ${props.theme.colors.secondaryText}`;
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
        return props.theme.colors.secondaryText;
      }
    }
  }};
  @media screen and (max-width: 416px) {
    width: 200px;
  }
`;
