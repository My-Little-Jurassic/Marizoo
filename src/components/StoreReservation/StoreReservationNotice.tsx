import Checkbox from "./Checkbox";
import React, { useState } from "react";
import styled from "styled-components";
import CheckBtn from "./CheckBtn";

interface IPlayInfo {
  playDateTime: string;
  title: string;
  description: string;
  runningTime: number;
  notice: string;
}

interface IProps {
  playInfo: IPlayInfo;
  numberOfVisitor: number | null;
  openCompleteModal(): void;
}

const StoreReservationNotice = function (props: IProps) {
  const [checked, setChecked] = useState<boolean>(false);

  const reserve = function () {
    if (props.numberOfVisitor === null || props.numberOfVisitor === 0) {
      alert("방문자 수를 입력해주세요");
      return;
    }
    if (isNaN(props.numberOfVisitor)) {
      alert("방문자 수를 숫자로 입력해주세요");
      return;
    }
    if (!checked) {
      alert("유의사항에 동의 후 예약해주세요");
      return;
    }
    // 예약 axios
    props.openCompleteModal();
  };

  return (
    <StyledContainer>
      <StyledNotice>{props.playInfo.notice}</StyledNotice>
      <StyledBottom>
        <StyledCheckboxContainer onClick={() => setChecked(!checked)}>
          <Checkbox checked={checked} />
          <StyledCheckboxText>위 유의사항에 동의합니다.</StyledCheckboxText>
        </StyledCheckboxContainer>
        <CheckBtn label="예약하기" type={0} isDisable={false} onClick={reserve} />
      </StyledBottom>
    </StyledContainer>
  );
};

export default StoreReservationNotice;

const StyledContainer = styled.div`
  width: 100%;
  height: 592px;
  border-radius: 32px;
  background-color: ${(props) => props.theme.colors.secondaryBg};
  box-shadow: 2px 2px 8px rgba(67, 67, 67, 0.2);
  box-sizing: border-box;
  padding: 64px 32px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledNotice = styled.span`
  color: ${(props) => props.theme.colors.primaryText};
  font: ${(props) => props.theme.fonts.mainContent};
  max-height: 376px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledBottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const StyledCheckboxText = styled.div`
  color: ${(props) => props.theme.colors.primaryText};
  font: ${(props) => props.theme.fonts.mainContentBold};
`;
