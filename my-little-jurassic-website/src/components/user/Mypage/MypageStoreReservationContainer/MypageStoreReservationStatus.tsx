import React, { useMemo } from "react";
import styled from "styled-components";
import { TPlayStatus } from "./MypageStoreReservationList";

interface IProps {
  status: TPlayStatus;
}

const MypageStoreReservationStatus = ({ status }: IProps): JSX.Element => {
  const comment = useMemo(() => {
    switch (status) {
      case "CANCEL":
        return "취소";
      case "FINISH":
        return "완료";
      case "BOOK":
      default:
        return "";
    }
  }, []);
  return <StyledDiv status={status}>{comment}</StyledDiv>;
};

const StyledDiv = styled.div<{ status: TPlayStatus }>`
  right: 16px;
  bottom: 16px;
  position: absolute;
  width: 100px;
  height: 100px;
  border: 10px solid rgba(0, 0, 0, 0);
  border-radius: 50%;
  font: ${({ theme }) => theme.fonts.display3};
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-45deg);

  ${({ status, theme }) => {
    switch (status) {
      case "FINISH":
        return `border-color: ${theme.colors.green}; color: ${theme.colors.green};`;
      case "CANCEL":
        return `border-color: ${theme.colors.disable};  color: ${theme.colors.disable};`;
      case "BOOK":
      default:
        return "opacity: 0;";
    }
  }}
`;

export default MypageStoreReservationStatus;
