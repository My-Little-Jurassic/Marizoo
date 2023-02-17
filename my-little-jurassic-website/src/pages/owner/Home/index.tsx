import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = (): JSX.Element => {
  const [id, setId] = useState<string>("");
  const navigate = useNavigate();

  const isDisabled = (): boolean => !id;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onSubmit = () => {
    navigate(`broadcast/${id}`);
  };

  return (
    <StyledDiv>
      <div>
        <span>Welcome!</span>
        <h1>마리쥬 스트리밍 페이지</h1>
      </div>
      <div>
        <label>사업자 uid를 입력해주세요</label>
        <input onChange={onChange} value={id} />
        <button onClick={onSubmit} disabled={isDisabled()}>
          스트리밍 시작
        </button>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  position: absolute;
  z-index: 10000;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primaryBg};
  color: ${({ theme }) => theme.colors.primaryText};

  & > div:nth-child(1) {
    font: ${({ theme }) => theme.fonts.mainContentBold};
    text-align: center;
    & > h1 {
      font: ${({ theme }) => theme.fonts.display2};
    }
  }
  & > div:nth-child(2) {
    width: 100%;
    margin: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font: ${({ theme }) => theme.fonts.mainContent};
    text-align: center;

    & > input {
      width: 100%;
      max-width: 320px;
      height: 40px;
      margin: 20px;
      text-align: center;
      font: ${({ theme }) => theme.fonts.mainContentBold};
    }
    & > button {
      width: 100%;
      max-width: 240px;
      height: 60px;
      text-align: center;
      font: ${({ theme }) => theme.fonts.mainContentBold};
    }
  }
`;
export default Home;
