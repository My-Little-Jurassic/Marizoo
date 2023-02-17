import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../../../store";
import { selectUser } from "../../../store/userSlice";
import { GrayBtn } from "../../common/button";

const MypageFooter = () => {
  const params = useParams();
  const user = useAppSelector(selectUser);
  const checkUser = useMemo(() => {
    if (!user.pk) return false;
    return String(user.pk) === String(params.user_id);
  }, [user.pk, params.user_id]);
  return (
    <StyledFooter>
      {checkUser ? <GrayBtn label={"회원탈퇴"} type={2} isDisable={false} /> : null}
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export default MypageFooter;
