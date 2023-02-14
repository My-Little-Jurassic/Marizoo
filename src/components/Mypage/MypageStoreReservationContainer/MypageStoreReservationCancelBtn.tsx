import React from "react";
import { TbTrash } from "react-icons/tb";
import styled from "styled-components";

const MypageStoreReservationCancelBtn = (): JSX.Element => {
  return (
    <StyledBtn>
      <TbTrash />
    </StyledBtn>
  );
};

const StyledBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 20px;
  ${({ theme }) => theme.shadow}
  font: ${({ theme }) => theme.fonts.mainContentBold};
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primaryBg};
  color: ${({ theme }) => theme.colors.primaryText};
  cursor: pointer;

  & > *:nth-child(1) {
    flex: 1 1 100%;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.primaryBg};
    &::after {
      flex: 1 0 0;
      margin-left: 8px;
      width: 80px;
      content: "취소하기";
      white-space: nowrap;
    }
    width: 140px;
  }
  transition: all ease 0.2s;
`;

export default MypageStoreReservationCancelBtn;
