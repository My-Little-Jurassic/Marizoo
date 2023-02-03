import React from "react";
import styled from "styled-components";

interface IProps {
  label: string; // 리액션 버튼의 라벨
  icon: React.ElementType; // 리액션 버튼의 아이콘
  color: string; // 리액션 버튼의 색깔
  onClick?(): void; // onclick props
}

function ReactionBtn(props: IProps) {
  const Icon = props.icon; // prop된 아이콘

  return (
    <StyledReactionBtn background={props.color}>
      <StyledBtnLabel>{props.label}</StyledBtnLabel>
      <Icon size={30} strokeWidth={2}></Icon>
    </StyledReactionBtn>
  );
}

export default ReactionBtn;

interface IStyledReactionBtn {
  // 버튼 컴포넌트의 props type
  background: string;
}

const StyledReactionBtn = styled.button<IStyledReactionBtn>`
  ${(props) => props.theme.shadow}
  ${(props) => props.theme.styles.button}
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border: none;
  overflow: hidden;
  color: ${(props) => props.theme.colors.brandColors.basaltGray[50]};
  background: ${(props) => props.background};
  &:hover {
    width: 117px;
    color: ${(props) => props.background};
    transition: all 0.2s;
  }
`;

const StyledBtnLabel = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 32px;
  margin-inline: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
  transition: all 0.2s;
  opacity: 0;
  font: ${(props) => props.theme.fonts.mainContentBold};
  &:hover {
    opacity: 100;
    color: ${(props) => props.theme.colors.brandColors.basaltGray[50]};
  }
`;
