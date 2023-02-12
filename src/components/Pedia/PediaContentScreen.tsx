import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { getSpeciesInfo } from "../../api/pedia";
import { ISpeciesDetail } from "./type";

interface IProps {
  selectedSpeciesId: number | undefined;
  selectedSpeciesImg: string | undefined;
}

const PediaContentScreen = (props: IProps): JSX.Element => {
  const [speciesInfo, setSpeciesInfo] = useState<ISpeciesDetail | null>(null);

  useEffect(() => {
    if (props.selectedSpeciesId !== null) {
      getSpeciesInfo(props.selectedSpeciesId)
        .then((res) => {
          setSpeciesInfo(res.data);
        })
        .catch((e) => {
          console.log("종 동물 목록 로드 실패", e);
        });
    }
  }, [props.selectedSpeciesId]);

  return (
    <>
      <StyledPediaContentScreen>
        {speciesInfo && <img src={props.selectedSpeciesImg}></img>}
        {speciesInfo ? (
          <div>
            <h3>{speciesInfo.speciesInfo.classification}</h3>
            <p>서식지 : {speciesInfo.speciesInfo.habitat}</p>
            <p>수명 : {speciesInfo.speciesInfo.lifeSpan}년</p>
          </div>
        ) : (
          <div id="pedia-title">
            <h2>마리쥬 도감</h2>
          </div>
        )}
      </StyledPediaContentScreen>
    </>
  );
};

export default React.memo(PediaContentScreen);

const sizeChange = keyframes`
  from {transform: scale(0.9)}
  to {transform: scale(1.1)}
`;
const StyledPediaContentScreen = styled.section`
  box-sizing: border-box;
  display: flex;
  padding: 16px;
  width: 100%;
  box-shadow: rgb(17, 17, 17) 3px 3px 6px 0px inset,
    rgba(191, 186, 186, 0.5) -3px -3px 6px 1px inset;
  border: ${({ theme }) => theme.colors.brandColors.basaltGray[50]} 8px solid;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.brandColors.basaltGray[900]};
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
  @media screen and (min-width: 600px) {
    height: 300px;
  }
  & > img {
    border-radius: 8px;
    box-sizing: border-box;
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
    margin-left: 8px;
    @media screen and (max-width: 600px) {
      padding: 16px 0px 0px 0px;
    }
    & h3 {
      font: ${({ theme }) => theme.fonts.display5};
      color: ${({ theme }) => theme.colors.brandColors.jurassicGreen[300]};
      margin-bottom: 16px;
    }
    & p {
      font: ${({ theme }) => theme.fonts.mainContentBold};
      color: ${({ theme }) => theme.colors.brandColors.basaltGray[50]};
      margin-bottom: 8px;
    }
  }
  & #pedia-title {
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100px;
    font: ${({ theme }) => theme.fonts.display5};
    color: ${({ theme }) => theme.colors.brandColors.basaltGray[100]};
    animation: ${sizeChange} 1s ease-in-out infinite alternate;
  }
`;
