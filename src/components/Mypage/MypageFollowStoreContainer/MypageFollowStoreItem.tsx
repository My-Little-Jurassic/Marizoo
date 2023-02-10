import React from "react";
import styled from "styled-components";
import { IStore } from "./MypageFollowStoreList";

interface IProps {
  item: IStore;
}
const MypageFollowStoreItem = ({ item }: IProps) => {
  return (
    <StyledLi>
      <div>
        <img src={item.img} />
      </div>
      <div>
        <h3>{item.storeName}</h3>
        <p>{item.address}</p>
        <p>{item.tel}</p>
      </div>
    </StyledLi>
  );
};

const StyledLi = styled.li`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 128px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.primaryBg};
  ${({ theme }) => theme.shadow};
  margin-right: 32px;
  padding: 4px;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  & > div:nth-child(1) {
    border-radius: 32px;
    overflow: hidden;
    width: 120px;
  }
  & > div:nth-child(2) {
    margin-left: 16px;
  }

  & h3 {
    font: ${({ theme }) => theme.fonts.mainContentBold};
    margin-bottom: 8px;
  }
  & p {
    font: ${({ theme }) => theme.fonts.subContent};
  }
`;

export default MypageFollowStoreItem;
