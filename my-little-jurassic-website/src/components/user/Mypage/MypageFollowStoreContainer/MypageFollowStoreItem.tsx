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
  min-width: 320px;
  height: 128px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  ${({ theme }) => theme.shadow};
  margin-right: 32px;
  overflow: hidden;
  flex-wrap: wrap;
  flex-direction: column;

  &:hover {
    z-index: 1;
    transform: scale(1.1);
    transition: all ease 0.1s;
  }
  & > div {
    height: 100%;
  }
  & > div:nth-child(1) {
    border: 4px solid ${({ theme }) => theme.colors.secondaryBg};
    background-color: ${({ theme }) => theme.colors.secondaryBg};
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 32px;
    overflow: hidden;
    width: 120px;
    z-index: 1;
    & > img {
      height: 100%;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 3;
    margin-left: 8px;
    white-space: nowrap;
    width: max-content;
    & > * {
      display: block;
    }
  }
  &:hover > div:nth-child(2) > * {
    animation-duration: 4s;
    animation-name: text-move;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
  }

  & h3 {
    font: ${({ theme }) => theme.fonts.mainContentBold};
    margin-bottom: 8px;
  }
  & p {
    font: ${({ theme }) => theme.fonts.subContent};
  }
  @keyframes text-move {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% + 176px));
    }
  }
`;

export default MypageFollowStoreItem;
