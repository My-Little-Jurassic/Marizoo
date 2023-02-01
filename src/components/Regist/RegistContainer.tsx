import React from "react";
import styled from "styled-components";
import RegistForm from "./RegistForm";

const StyledDiv = styled.div`
  max-width: 484px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  ${({ theme }) => theme.shadow}; //shadow CSS
  display: flex;
  margin: 120px 8px;
  padding: 56px 8px;
  flex-direction: column;

  & > .container-header {
    text-align: center;
    margin-bottom: 56px;

    & h2 {
      color: ${({ theme }) => theme.colors.primaryText};
      font: ${({ theme }) => theme.fonts.display4};
      margin-bottom: 8px;
    }
    & span {
      color: ${({ theme }) => theme.colors.secondaryText};
      font: ${({ theme }) => theme.fonts.tinyContentBold};
    }
    & a {
      cursor: pointer;
      font-size: 16px;
      text-decoration: underline;

      &:hover {
        opacity: 0.75;
      }
    }
  }
  @media screen and (max-width: 800px) {
    margin: auto;
  }
`;

const RegistContainer = (): JSX.Element => {
  return (
    <StyledDiv>
      <div className="container-header">
        <h2>회원가입</h2>
        <span>
          이미 회원이신가요? <a>로그인</a>
        </span>
      </div>
      <RegistForm />
    </StyledDiv>
  );
};

export default RegistContainer;
