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
  width: 40px;
  height: 40px;
  border-radius: 20px;
  font: ${({ theme }) => theme.fonts.mainContentBold};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MypageStoreReservationCancelBtn;
