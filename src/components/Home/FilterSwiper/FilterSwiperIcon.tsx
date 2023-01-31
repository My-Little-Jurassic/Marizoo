import React from "react";
import styled from "styled-components";

interface IProps {
  iconName: string;
  imgUrl: string;
}

function FilterSwiperIcon(props: IProps) {
  return (
    <StyledFilterSwiperIcon>
      <StyledIcon
        onClick={() => {
          console.log(props.imgUrl);
        }}
        imgUrl={props.imgUrl}
      ></StyledIcon>
    </StyledFilterSwiperIcon>
  );
}

export default FilterSwiperIcon;

const StyledFilterSwiperIcon = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledIcon = styled.div<{ imgUrl: string }>`
  cursor: pointer;
  width: 80px;
  height: 80px;
  background: gray;
  border-radius: 64px;
  background-image: url("${(props) => props.imgUrl}");
  background-size: cover;
  transition: all 0.2s;
  margin-inline: 4px;
  box-shadow: 0 0 0 4px ${(props) => props.theme.colors.primaryBg} inset;
  &:hover {
    box-shadow: 0 0 0 0px ${(props) => props.theme.colors.primaryBg} inset;
  }
`;
