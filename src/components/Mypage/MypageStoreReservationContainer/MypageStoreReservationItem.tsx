import React from "react";
import styled from "styled-components";
import { IStoreReservation } from "./MypageStoreReservationList";

interface IProps {
  item: IStoreReservation;
}

const MypageStoreReservationItem = ({ item }: IProps): JSX.Element => {
  const { id, playDateTime, title, img, storeName, status, tel, totalVisitor } = item;
  return (
    <StyledDiv>
      <div className="img-area">
        <img src={img} />
      </div>
      <div className="info-area">
        <span>{playDateTime}</span>
        <h4>{title}</h4>
        <span>
          {storeName} · {totalVisitor}명
        </span>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 272px;
  height: 240px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.primaryBg};
  ${({ theme }) => theme.shadow};
  margin-right: 32px;
  overflow: hidden;

  & > .img-area {
    width: 100%;
    height: 50%;
    overflow: hidden;
    & > img {
      width: 100%;
    }
  }
`;

export default MypageStoreReservationItem;
