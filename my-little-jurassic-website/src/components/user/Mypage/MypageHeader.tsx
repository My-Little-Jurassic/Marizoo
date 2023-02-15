import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getNickname } from "../../../api";
import { GrayBtn } from "../../common/button";

const MypageHeader = () => {
  const params = useParams();
  const [nickname, setNickname] = useState<string>("unknown");

  useEffect(() => {
    if (params.user_id) getNickname(params.user_id).then((res) => setNickname(res.data.nickname));
  }, []);
  return (
    <StyledHeader>
      <h1>{nickname}님의 마이페이지</h1>
      <GrayBtn label={"회원정보 수정"} type={2} isDisable={false} />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
`;

export default MypageHeader;
