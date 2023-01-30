import React from "react";
import styled from "styled-components";

import { TbThumbUp } from "react-icons/tb"; // 엄지 아이콘 import

function LikeBtn() {
  // 클릭할 경우 실행될 엄지 아이콘 애니메이션 함수
  const thumbUpIconAnimate = function () {
    const thumbUpIcon: Element | null = document.querySelector(".thumb-up-icon"); // 엄지 아이콘
    thumbUpIcon?.animate(
      // 아이콘이 움직일 애니메이션
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
        duration: 1000, // 시간
        easing: "ease-out", // 가속 곡선
      },
    );
  };

  return (
    <StyledLikeBtn
      onClick={() => {
        // 클릭시 애니메이션 실행
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
  ${(props) => props.theme.styles.button}
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
`;

const ThumbUpIcon = styled.div``;

const StyledLikeBtnLabel = styled.a`
  font: ${(props) => props.theme.fonts.mainContentBold};
  display: flex;
  align-items: center;
  word-break: break-all;
`;
