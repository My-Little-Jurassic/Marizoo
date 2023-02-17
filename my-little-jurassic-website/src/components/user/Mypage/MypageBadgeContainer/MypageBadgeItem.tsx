import React from "react";
import styled from "styled-components";
import { IBadge } from "./MypageBadgeContainer";

interface IProps {
  item: IBadge;
}

const MypageBadgeItem = ({ item }: IProps) => {
  const { img, type, desc } = item;
  return (
    <StyledLi>
      <img src={img} />
      <div>{desc}</div>
    </StyledLi>
  );
};

const StyledLi = styled.li`
  flex: 0 1 20%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 56px;
  width: 100%;
  top: 0;
  transition: all ease 0.2s;
  ${({ theme }) => theme.shadow}
  & > img {
    transition: all ease 0.2s;
    width: 120px;
    padding-bottom: 16px;
  }
  & > div {
    font: ${({ theme }) => theme.fonts.mainContentBold};
    color: ${({ theme }) => theme.colors.primaryText};
    transition: all ease 0.2s;
    transform: translateX(-50%) scale(0);
    position: absolute;
    border-radius: 32px;
    width: 320px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    padding: 24px;
    margin: auto;
    top: calc(100% - 16px);
    left: 50%;
    word-wrap: break-word;
    word-break: break-all;
    background-color: ${({ theme }) => theme.colors.yellow};
    ${({ theme }) => theme.shadow}
  }
  &:hover {
    z-index: 1;
    top: -24px;
    & > img {
      transform: scale(1.1);
    }
    & > div {
      z-index: -1;
      transform: translateX(-50%);
    }
  }
`;

export default MypageBadgeItem;
