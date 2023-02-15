import React, { useState } from "react";
import { postPwd } from "../../../../api";
import { useAppSelector } from "../../../../store";
import { selectUser } from "../../../../store/userSlice";
import MypageConfirmPasswordModal from "./MypageConfirmPasswordModal";
import MypageModifyInfoModal from "./MypageModifyInfoModal";

interface IProps {
  onClose(): void;
}
export interface IUser {
  uid: string;
  nickname: string;
  phoneNumber: string;
  email: string;
}
const MypageModifyInfo = ({ onClose }: IProps): JSX.Element => {
  // 본인인증 여부
  const [user, setUser] = useState<IUser>({
    uid: "",
    nickname: "",
    phoneNumber: "",
    email: "",
  });

  const { pk, token } = useAppSelector(selectUser);

  // 비밀번호 일치 확인 수행
  const checkPwd = async (val: string): Promise<boolean> => {
    try {
      const { data } = await postPwd(pk!, { pwd: val }, token!);
      setUser({ ...data });
      return true;
    } catch (e) {
      return false;
    }
  };
  if (!user.uid) return <MypageConfirmPasswordModal onClose={onClose} onConfirm={checkPwd} />;
  else return <MypageModifyInfoModal onClose={onClose} currentUser={user} />;
};

export default MypageModifyInfo;
