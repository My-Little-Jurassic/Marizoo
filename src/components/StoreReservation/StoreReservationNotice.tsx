import Checkbox from "./Checkbox";
import React, { useState } from "react";
import styled from "styled-components";
import CheckBtn from "./CheckBtn";
import { openModal, setContent } from "../../store/modalSlice";
import { IPlayInfo } from "./type";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { makeReservation } from "../../api";

interface IProps {
  playInfo: IPlayInfo;
  numberOfVisitor: number | null;
  openCompleteModal(): void;
}

const StoreReservationNotice = function (props: IProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const params = useParams();

  const uid = useAppSelector((state) => state.user.uid);
  const dispatch = useAppDispatch();

  const reserve = function () {
    if (props.numberOfVisitor === null || props.numberOfVisitor === 0) {
      dispatch(setContent("StoreReservationEmpty"));
      dispatch(openModal());
      return;
    }
    if (props.numberOfVisitor > props.playInfo.availableVisitor) {
      dispatch(setContent("StoreReservationExceed"));
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

    if (uid && params.play_id && props.numberOfVisitor) {
      makeReservation({ uid, playId: params.play_id, totalVisitor: props.numberOfVisitor })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    props.openCompleteModal();
  };

  return (
    <StyledContainer>
      <StyledNoticeBox>
        <StyledHeader>체험 설명</StyledHeader>
        <StyledContent>{props.playInfo.description}</StyledContent>
      </StyledNoticeBox>

      <StyledNoticeBox>
        <StyledHeader>유의사항</StyledHeader>
        <StyledContent>{props.playInfo.notice}</StyledContent>
      </StyledNoticeBox>

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
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1024px) {
    height: 100%;
    gap: 80px;
  }
`;

const StyledNoticeBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-height: 168px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1024px) {
    max-height: 100%;
    gap: 16px;
    overflow: visible;
  }
`;

const StyledHeader = styled.span`
  color: ${(props) => props.theme.colors.primaryText};
  font: ${(props) => props.theme.fonts.header3};
  font-weight: 800;
`;

const StyledContent = styled.span`
  color: ${(props) => props.theme.colors.primaryText};
  font: ${(props) => props.theme.fonts.mainContent};
  max-height: 344px;
  overflow-y: scroll;
  white-space: pre-line;
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
