import React from "react";
import styled from "styled-components";
import { GreenBtn } from "../button";

interface IProps {
  onClose(): void;
}

const DefaultContent = ({ onClose }: IProps): JSX.Element => {
  return (
    <StyledDiv>
      <h1>기본 모달 형식입니다</h1>
      <span>해당 tsx를 이용하여 모달을 자유롭게 작성해보세요</span>
      <GreenBtn label={"확인"} type={0} isDisable={false} onClick={onClose} />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  width: 480px;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryBg};
  color: ${({ theme }) => theme.colors.primaryText};
  ${({ theme }) => theme.shadow};
  border-radius: 32px;
  -webkit-animation: slide-in-blurred-bottom 0.4s cubic-bezier(0.23, 1, 0.32, 1) both; // 수정불가
  animation: slide-in-blurred-bottom 0.4s cubic-bezier(0.23, 1, 0.32, 1) both; // 수정불가

  & > h1 {
    font: ${({ theme }) => theme.fonts.header3};
  }
`;

export default DefaultContent;
