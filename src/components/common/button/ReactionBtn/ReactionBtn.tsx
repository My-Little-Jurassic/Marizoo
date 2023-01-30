import React from "react";
import styled from "styled-components";

interface Iprops {
  // 리액션 버튼 props type
  label: string; // 리액션 버튼의 라벨
  icon: React.ElementType; // 리액션 버튼의 아이콘
  color: string; // 리액션 버튼의 색깔
}

function ReactionBtn(props: Iprops) {
  const Icon = props.icon; // prop된 아이콘

  return (
    <StyledReactionBtn background={props.color}>
      <Icon size={30} strokeWidth={2}></Icon>
      <StyledBtnLabel>{props.label}</StyledBtnLabel>
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border: none;
  color: ${(props) => props.theme.colors.brandColors.basaltGray[50]};
  background: ${(props) => props.background};
  &:hover {
    width: 117px;
    color: ${(props) => props.background};
  }
`;

const StyledBtnLabel = styled.a`
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  width: 56px;
  height: 56px;
  border-radius: 32px;
  margin-inline: 20px;
  font-family: "NanumSquareNeo-Variable";
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  word-break: break-all;
  transition: all 0.2s;
  opacity: 0;
  &:hover {
    width: 117px;
    opacity: 100;
    color: ${(props) => props.theme.colors.brandColors.basaltGray[50]};
  }
`;
