import React from "react";
import styled from "styled-components";

function CafeDetailProfile() {
  return (
    <StyledCafeDetailProfile>
      <StyledCafeBg></StyledCafeBg>
      <StyledProfile>
        <StyledProfileImg src="https://picsum.photos/200/300"></StyledProfileImg>
        <StyledProfileContent>
          <StyledName>Name</StyledName>
          <StyledDiscription>discription</StyledDiscription>
        </StyledProfileContent>
      </StyledProfile>
    </StyledCafeDetailProfile>
  );
}

export default CafeDetailProfile;

const StyledCafeDetailProfile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCafeBg = styled.div`
  width: 100%;
  height: 280px;
  background: black;
`;

const StyledProfile = styled.div`
  position: absolute;
  top: 220px;
  max-width: 800px;
  width: 90%;
  display: flex;
  align-items: center;
`;

const StyledProfileImg = styled.img`
  max-width: 240px;
  max-height: 240px;
  width: 40vw;
  height: 40vw;
  border-radius: 120px;
`;

const StyledProfileContent = styled.div``;

const StyledName = styled.div`
  font: ${(props) => props.theme.fonts.display3};
`;

const StyledDiscription = styled.div`
  font: ${(props) => props.theme.fonts.header4};
  color: ${(props) => props.theme.colors.green};
`;
