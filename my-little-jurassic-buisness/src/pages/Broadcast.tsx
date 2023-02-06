import React from "react";
import {
  BroadcastSettingContainer,
  BroadcastStatusViewer,
  BroadcastVoteContainer,
} from "../components/Broadcast";

const Broadcast = () => {
  return (
    <div className="Broadcast">
      <div>
        <BroadcastStatusViewer />
        <BroadcastVoteContainer />
      </div>
      <div>
        <BroadcastSettingContainer />
      </div>
    </div>
  );
};

export default Broadcast;
