import React from "react";
import styled from "styled-components";
import { Input } from "../../common/input/index";
import { IPlayInfo } from "./type";

interface IProps {
  playInfo: IPlayInfo;
  changeNumberOfVisitor: (newNumberOfVisitor: number | null) => void;
}

const StoreReservationInfo = function (props: IProps) {
  return (
    <StyledContainer>
      <StyledTitle>{props.playInfo.title}</StyledTitle>
      <StyledContent>
        <StyledBold>방문 일시</StyledBold>
        <StyledSpan>{props.playInfo.playDateTime}</StyledSpan>
      </StyledContent>
      <StyledContent>
        <StyledBold>소요 시간</StyledBold>
        <StyledSpan>{props.playInfo.runningTime}H</StyledSpan>
      </StyledContent>
      <StyledVisitor>
        <StyledBold>방문자 수</StyledBold>
        <StyledInputContainer>
          <StyledSpan>
            <Input
              setValue={(val) => {
                props.changeNumberOfVisitor(Number(val));
              }}
            />{" "}
          </StyledSpan>
          <StyledAvailableVisitor>
            * 예약 가능 인원 수: {props.playInfo.availableVisitor}명
          </StyledAvailableVisitor>
        </StyledInputContainer>
      </StyledVisitor>
    </StyledContainer>
  );
};

export default StoreReservationInfo;

const StyledContainer = styled.div`
  width: 100%;
  height: 320px;
  border-radius: 32px;
  box-sizing: border-box;
  padding: 56px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 2px 2px 8px rgba(67, 67, 67, 0.2);
  background: ${(props) => props.theme.colors.secondaryBg};
  @media screen and (max-width: 500px) {
    height: 100%;
    gap: 32px;
  }
`;

const StyledTitle = styled.span`
  font: ${(props) => props.theme.fonts.header2};
  color: ${(props) => props.theme.colors.green};
`;

const StyledContent = styled.div`
  color: ${(props) => props.theme.colors.primaryText};
  display: flex;
  align-items: center;
  gap: 32px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
`;

const StyledVisitor = styled.div`
  color: ${(props) => props.theme.colors.primaryText};
  display: flex;
  align-items: flex-start;
  gap: 32px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
`;

const StyledBold = styled.span`
  font: ${(props) => props.theme.fonts.mainContentBold};
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledSpan = styled.span`
  font: ${(props) => props.theme.fonts.mainContent};
  & > input {
    width: 80%;
    height: 40px;
    margin-top: -6px;
    filter: none;
    -webkit-filter: none;
  }
  @media screen and (max-width: 500px) {
    & > input {
      width: 80%;
      &::placeholder {
        opacity: 0;
      }
    }
  }
`;

const StyledAvailableVisitor = styled.span`
  font: ${(props) => props.theme.fonts.tinyContentBold};
  color: ${(props) => props.theme.colors.red};
`;
