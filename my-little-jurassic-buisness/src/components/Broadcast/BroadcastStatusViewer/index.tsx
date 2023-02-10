import React, { forwardRef } from "react";
import { TbUser, TbThumbUp } from "react-icons/tb";
import styled from "styled-components";
import { TStatus } from "../../../types/Broadcast";

export interface IProps {
  status: TStatus;
  viewers: number;
  likes: number;
}

const BroadcastStatusViewer = forwardRef<HTMLVideoElement, IProps>(
  ({ status, viewers, likes }: IProps, ref) => {
    return (
      <StyledDiv className="BroadcastStatusViewer">
        <video ref={ref} />
        <div>
          <div>
            <TbUser />
            {viewers}명
          </div>
          <div>
            <TbThumbUp />
            {likes}회
          </div>
        </div>
      </StyledDiv>
    );
  },
);

const StyledDiv = styled.div`
  padding: 32px 16px;
  color: ${({ theme }) => theme.colors.primaryText};

  & > video {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.brandColors.basaltGray[900]};
  }
  & > div {
    margin-top: 16px;
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

BroadcastStatusViewer.displayName = "BroadcastStatusViewer";
export default BroadcastStatusViewer;
