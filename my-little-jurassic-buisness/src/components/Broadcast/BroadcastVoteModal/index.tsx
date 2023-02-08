import React from "react";
import styled from "styled-components";

const BroadcastVoteModal = () => {
  return (
    <StyledDiv>
      <div>test</div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    margin: 8px;
    width: 100%;
    height: 100%;
    max-width: 480px;
    max-height: 80vh;
    background-color: ${({ theme }) => theme.colors.primaryBg};
  }
`;

export default BroadcastVoteModal;
