import React, { forwardRef } from "react";
import styled from "styled-components";

const BroadcastStreamVideo = forwardRef<HTMLVideoElement>((props, ref) => {
  return (
    <StyledDiv>
      <video autoPlay={true} muted={true} ref={ref} />
    </StyledDiv>
  );
});

const StyledDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;

  & > video {
    width: 100%;
  }
`;

BroadcastStreamVideo.displayName = "BroadcastStreamVideo";
export default BroadcastStreamVideo;
