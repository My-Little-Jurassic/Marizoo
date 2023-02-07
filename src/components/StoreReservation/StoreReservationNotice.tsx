import Checkbox from "./Checkbox";
import React, { useState } from "react";
import styled from "styled-components";
import CheckBtn from "./CheckBtn";
import { openModal, setContent } from "../../store/modalSlice";
import { IPlayInfo } from "./type";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";

interface IProps {
  playInfo: IPlayInfo;
  numberOfVisitor: number | null;
  openCompleteModal(): void;
}

const StoreReservationNotice = function (props: IProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const params = useParams();
  // 아직 스토어에 없음
  // const uId = useAppSelector((state) => state.user.uId);
  const dispatch = useAppDispatch();

  const reserve = function () {
    if (props.numberOfVisitor === null || props.numberOfVisitor === 0) {
      dispatch(setContent("StoreReservationEmpty"));
      dispatch(openModal());
      return;
    }
    if (isNaN(props.numberOfVisitor)) {
      dispatch(setContent("StoreReservationNotNumber"));
      dispatch(openModal());
      return;
    }
    if (!checked) {
      dispatch(setContent("StoreReservationAgree"));
      dispatch(openModal());
      return;
    }
    // uid 생기면 바꾸기
    // 최대 인원 수 미리 알지, 요청 보내보고 에러 코드 받을 지 정하기
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/stores/${params.cafe_id}/plays/${params.play_id}`,
      data: {
        uId: "ASDF",
        playId: params.play_id,
        totalVisitor: props.numberOfVisitor,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
  height: 560px;
  border-radius: 32px;
  background-color: ${(props) => props.theme.colors.secondaryBg};
  box-shadow: 2px 2px 8px rgba(67, 67, 67, 0.2);
  box-sizing: border-box;
  padding: 64px 32px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1024px) {
    height: 100%;
    gap: 32px;
  }
`;

const StyledNotice = styled.span`
  color: ${(props) => props.theme.colors.primaryText};
  font: ${(props) => props.theme.fonts.mainContent};
  max-height: 344px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1024px) {
    overflow-y: visible;
    max-height: 100%;
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
