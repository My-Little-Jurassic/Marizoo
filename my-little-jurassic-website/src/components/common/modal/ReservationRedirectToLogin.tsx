import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { GreenBtn } from "../button";

interface IProps {
  onClose(): void;
}

const ReservationRedirectToLogin = ({ onClose }: IProps): JSX.Element => {
  const navigate = useNavigate();

  const goToLogin = function () {
    onClose();
    navigate(`/login`);
  };

  return (
    <StyledDiv>
      <h1>로그인 후 이용해주세요</h1>
      <div>
        <GreenBtn label={"로그인"} type={0} isDisable={false} onClick={goToLogin} />
        <GreenBtn label={"돌아가기"} type={2} isDisable={false} onClick={onClose} />
      </div>
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

  @media screen and (max-width: 500px) {
    width: 90vw;
  }

  & > h1 {
    font: ${({ theme }) => theme.fonts.header2};
  }

  & > span {
    font: ${({ theme }) => theme.fonts.mainContent};
  }

  & > div {
    display: flex;
    gap: 16px;
  }
`;

export default ReservationRedirectToLogin;
