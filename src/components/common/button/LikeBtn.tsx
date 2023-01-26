import React from "react";
import styled from "styled-components";

import { TbThumbUp } from "react-icons/tb";

function LikeBtn() {
  const thumbUpIconAnimate = function () {
    const thumbUpIcon: Element | null = document.querySelector(".thumb-up-icon");
    thumbUpIcon?.animate(
      [
        { transform: "translateY(0px) rotate(0deg)" },
        { transform: "translateY(-15px) rotate(-17deg) scale(220%)" },
        { transform: "translateY(18px) rotate(17deg) scale(220%)" },
        { transform: "translateY(-8px) rotate(-12deg) scale(180%)" },
        { transform: "translateY(5px) rotate(10deg) scale(150%)" },
        { transform: "translateY(-3px) rotate(-6deg) scale(120%)" },
        { transform: "translateY(0px) rotate(0deg)" },
      ],
      {
        duration: 1000,
        easing: "ease-out",
      },
    );
  };

  return (
    <StyledLikeBtn
      onClick={() => {
        thumbUpIconAnimate();
      }}
    >
      <ThumbUpIcon className="thumb-up-icon">
        <TbThumbUp size={32} />
      </ThumbUpIcon>
      <StyledLikeBtnLabel>좋아요</StyledLikeBtnLabel>
    </StyledLikeBtn>
  );
}

export default LikeBtn;

const StyledLikeBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 140px;
  height: 48px;
  background: ${(props) => props.theme.colors.seconderyBg};
  border: none;
  padding-inline: 24px;
  padding-block: 10px;
  color: ${(props) => props.theme.colors.green};
  word-break: break-all;
  ${(props) => props.theme.styles.button}
`;

const ThumbUpIcon = styled.div``;

const StyledLikeBtnLabel = styled.a`
  font: ${(props) => props.theme.fonts.mainContentBold};
  display: flex;
  align-items: center;
  word-break: break-all;
`;
