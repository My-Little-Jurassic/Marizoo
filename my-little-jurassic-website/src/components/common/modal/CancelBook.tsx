import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteUserBook } from "../../../api";
import { useAppDispatch, useAppSelector } from "../../../store";
import { selectModal, setContentData } from "../../../store/modalSlice";
import { selectUser } from "../../../store/userSlice";
import { GrayBtn, GreenBtn } from "../button";

interface IProps {
  onClose(): void;
}

const CancelBook = ({ onClose }: IProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pk } = useAppSelector(selectUser);
  const { data } = useAppSelector(selectModal);

  const onCancelBook = () => {
    if (pk)
      deleteUserBook(pk, data).then(() => {
        dispatch(setContentData(""));
        onClose();
      });
  };
  return (
    <StyledDiv>
      <h1>방문 예약 취소 알림</h1>
      <span>해당 방문 예약을 정말 취소하시겠습니까?</span>
      <div>
        <GreenBtn label={"방문취소"} type={0} isDisable={false} onClick={onCancelBook} />
        <GrayBtn label={"뒤로가기"} type={0} isDisable={false} onClick={onClose} />
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

  & > h1 {
    font: ${({ theme }) => theme.fonts.header3};
  }
  & > div {
    display: flex;
    & > * {
      margin: 0 8px;
    }
  }
`;

export default CancelBook;
