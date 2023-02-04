import React from "react";
import styled from "styled-components";
import CafeDetailAnimals from "./CafeDetailAnimals";
import CafeDetailOnairs from "./CafeDetailOnairs";
import CafeDetailPlays from "./CafeDetailPlays";

interface IProps {
  data: {
    store_name: string;
    description: string;
    address: string;
    opening_hours: string;
    tel: string;
    email: string;
    prifile_img: string;
    lat: number;
    lng: number;
  };
}

function CafeDetailMain(props: IProps) {
  return (
    <StyledCafeDetailMain>
      <h3>{props.data.store_name} 식구들</h3>
      <CafeDetailAnimals></CafeDetailAnimals>
      <h3>지금 스트리밍 중!</h3>
      <CafeDetailOnairs></CafeDetailOnairs>
      <h3>체험 프로그램 예약</h3>
      <CafeDetailPlays></CafeDetailPlays>
    </StyledCafeDetailMain>
  );
}

export default CafeDetailMain;

const StyledCafeDetailMain = styled.div`
  width: 100%;
  min-height: 100px;
  & > h3 {
    font: ${({ theme }) => theme.fonts.header3};
    color: ${({ theme }) => theme.colors.primaryText};
  }
  @media screen and (min-width: 900px) {
    margin-top: 220px;
  }
`;
