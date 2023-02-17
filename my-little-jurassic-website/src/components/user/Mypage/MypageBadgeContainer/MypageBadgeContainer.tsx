import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { getBadges } from "../../../../api";
import { useAppSelector } from "../../../../store";
import { selectUser } from "../../../../store/userSlice";
import MypageBadgeGauge from "./MypageBadgeGauge";
import MypageBadgeList from "./MypageBadgeList";

export interface IBadge {
  img: string;
  type: string;
  desc: string;
}

const MypageBadgeContainer = () => {
  const params = useParams();
  const user = useAppSelector(selectUser);
  const [badgeList, setBadgeList] = useState<IBadge[]>([]);

  // 배지에 대한 정보를 불러옵니다
  useEffect(() => {
    if (params.user_id)
      getBadges(params.user_id)
        .then((val) => setBadgeList(val.data.badges))
        .catch((e) => console.log(e));
  }, [params.user_id]);

  return (
    <StyledDiv>
      <h2>
        {String(user.pk) === String(params.user_id) ? "나의 " : null}
        배지 컬렉션
      </h2>
      <div className="badge-area">
        <MypageBadgeGauge badgeListNum={badgeList.length} />
        <MypageBadgeList badgeList={badgeList} />
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  & > .badge-area {
    border-radius: 32px;
    padding: 40px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
    ${({ theme }) => theme.shadow};
  }
`;

export default MypageBadgeContainer;
