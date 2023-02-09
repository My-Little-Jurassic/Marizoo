import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { GreenBtn } from "../button";

interface IProps {
  onClose(): void;
}

const BroadcastFinish = ({ onClose }: IProps): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      navigate("/asdf", { replace: true });
    };
  }, []);

  return (
    <StyledDiv>
      <h1>방송이 종료되었습니다</h1>
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

  @media screen and (max-width: 500px) {
    width: 90vw;
  }

  & > h1 {
    font: ${({ theme }) => theme.fonts.header2};
  }

  & > span {
    font: ${({ theme }) => theme.fonts.mainContent};
  }
`;

export default BroadcastFinish;
