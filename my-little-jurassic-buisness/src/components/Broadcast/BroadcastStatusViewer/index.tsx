import React, { useState } from "react";
import { TbUser, TbThumbUp } from "react-icons/tb";
import styled from "styled-components";

interface IBroadcastStatus {
  title: string;
  status: "DEFAULT" | "RESERVE" | "ONAIR" | "FINISH";
  viewers: number;
  likeAmount: number;
}
const BroadcastStatusViewer = () => {
  const [data, setaData] = useState<IBroadcastStatus>({
    title: "방송제목",
    status: "DEFAULT",
    viewers: 0,
    likeAmount: 0,
  });

  return (
    <StyledDiv className="BroadcastStatusViewer">
      <video />
      <h2>{data.title}</h2>
      <div>
        <div>
          <TbUser />
          {data.viewers}명
        </div>
        <div>
          <TbThumbUp />
          {data.likeAmount}회
        </div>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  padding: 32px 16px;
  color: ${({ theme }) => theme.colors.primaryText};

  & > video {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.brandColors.basaltGray[900]};
  }
  & > h2 {
    font: ${({ theme }) => theme.fonts.header2};
    margin-top: 16px;
  }
  & > div {
    font: ${({ theme }) => theme.fonts.subContent};
    display: flex;
    & > div {
      flex: 1 1 0;
      display: flex;
      align-items: center;
    }
    & svg {
      stroke-width: 3px;
      margin-right: 4px;
    }
  }
`;

export default BroadcastStatusViewer;
