import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getNickname } from "../../../api";
import { useAppSelector } from "../../../store";
import { openModal, setContent, setContentData } from "../../../store/modalSlice";
import { selectUser } from "../../../store/userSlice";
import { GrayBtn } from "../../common/button";

const MypageHeader = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const [nickname, setNickname] = useState<string>("unknown");

  useEffect(() => {
    if (params.user_id) getNickname(params.user_id).then((res) => setNickname(res.data.nickname));
  }, []);

  const onModifyUserInfo = () => {
    dispatch(setContentData("modifyInfo"));
    dispatch(setContent("MypageModifyInfo"));
    dispatch(openModal());
  };

  const checkUser = useMemo(() => {
    if (!user.pk) return false;
    return String(user.pk) === String(params.user_id);
  }, [user.pk, params.user_id]);
  return (
    <StyledHeader>
      <h1>{nickname}님의 마이페이지</h1>
      {checkUser ? (
        <GrayBtn label={"회원정보 수정"} type={2} isDisable={false} onClick={onModifyUserInfo} />
      ) : null}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
`;

export default MypageHeader;
