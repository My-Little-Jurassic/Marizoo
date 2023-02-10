import React from "react";
import styled from "styled-components";
import { GreenBtn } from "../button";

interface IProps {
  onClose(): void;
}

const StoreReservationExceed = ({ onClose }: IProps): JSX.Element => {
  return (
    <StyledDiv>
      <h1>경고!</h1>
      <div>
        <span>예약 가능 인원 수보다 </span>
        <span>적은 수를 입력해주세요.</span>
      </div>
      <GreenBtn label={"확인"} type={0} isDisable={false} onClick={onClose} />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  width: 480px;
  min-width: 300px;
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

  @media screen and (max-width: 500px) {
    width: 90vw;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
  }

  & > h1 {
    font: ${({ theme }) => theme.fonts.header2};
  }

  & > div > span {
    font: ${({ theme }) => theme.fonts.mainContent};
  }
`;

export default StoreReservationExceed;
