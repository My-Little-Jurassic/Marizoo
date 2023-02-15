import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GreenBtn } from "../../../components/common/button";

function NotFound() {
  return (
    <StyledNotFound>
      <h1>{"404 :("}</h1>
      <p>요청하신 페이지를 찾지 못했습니다.</p>
      <Link to={`/`} style={{ textDecoration: "none" }}>
        <GreenBtn label="홈으로 이동" type={0} isDisable={false}></GreenBtn>
      </Link>
    </StyledNotFound>
  );
}

export default NotFound;

const StyledNotFound = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.primaryBg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.primaryText};
  & > h1 {
    font: ${(props) => props.theme.fonts.display1};
  }
  & > p {
    font: ${(props) => props.theme.fonts.mainContentBold};
    margin-bottom: 16px;
  }
`;
