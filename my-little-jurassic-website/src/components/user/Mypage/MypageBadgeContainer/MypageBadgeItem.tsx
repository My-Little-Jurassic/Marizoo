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
  margin-top: 56px;
  & > img {
    transition: all ease 0.2s;
  }
  & > div {
    transition: all ease 0.2s;
    transform: translateX(-50%) scale(0);
    position: absolute;
    border-radius: 32px;
    width: 320px;
    max-width: 100%;
    display: flex;
    padding: 24px;
    margin: auto;
    top: calc(100% - 16px);
    left: 50%;
    word-wrap: break-word;
    word-break: break-all;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
    ${({ theme }) => theme.shadow}
  }
  &:hover {
    border-bottom: 24px;
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
