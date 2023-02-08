import React from "react";
import styled from "styled-components";

interface IProps {
  speciesData: {
    speciesInfo: { habitat: string; classification: string; lifeSpan: string; info: string };
    feeds: string[];
  };
}

const PediaContentScreen = (props: IProps): JSX.Element => {
  return (
    <StyledPediaContentScreen>
      <img src="https://picsum.photos/200/300"></img>
      <div>
        <h3>{props.speciesData.speciesInfo.classification}</h3>
        <p>서식지 : {props.speciesData.speciesInfo.habitat}</p>
        <p>수명 : {props.speciesData.speciesInfo.lifeSpan}</p>
        <p>{props.speciesData.speciesInfo.info}</p>
      </div>
    </StyledPediaContentScreen>
  );
};

export default PediaContentScreen;
const StyledPediaContentScreen = styled.section`
  box-sizing: border-box;
  display: flex;
  padding: 16px;
  width: 100%;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  border: ${({ theme }) => theme.colors.brandColors.basaltGray[50]} 8px solid;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.brandColors.basaltGray[50]};
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
  @media screen and (min-width: 600px) {
    max-height: 300px;
  }
  & > img {
    border-radius: 32px;
    height: 100%;
    object-fit: cover;
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    @media screen and (max-width: 600px) {
      width: 100%;
      height: 200px;
    }
    @media screen and (min-width: 600px) {
      width: 40%;
    }
  }
  & > div {
    padding: 16px;
    & h3 {
      font: ${({ theme }) => theme.fonts.header2};
      color: ${({ theme }) => theme.colors.brandColors.jurassicGreen[600]};
      margin-bottom: 16px;
    }
    & p {
      font: ${({ theme }) => theme.fonts.mainContentBold};
      color: ${({ theme }) => theme.colors.brandColors.basaltGray[900]};
      margin-bottom: 8px;
    }
  }
`;
