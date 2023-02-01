import React from "react";
import styled from "styled-components";
import RegistForm from "./RegistForm";

const StyledDiv = styled.div``;

const RegistContainer = (): JSX.Element => {
  return (
    <StyledDiv>
      <div>
        <h1>회원가입</h1>
        <span>
          이미 회원이신가요? <a>로그인</a>
        </span>
      </div>
      <RegistForm />
    </StyledDiv>
  );
};

export default RegistContainer;
