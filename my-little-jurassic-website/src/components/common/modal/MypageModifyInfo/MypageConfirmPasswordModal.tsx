import React, { useState } from "react";
import styled from "styled-components";
import { GrayBtn, GreenBtn } from "../../button";
import { EInputStatus } from "../../input";
import DefaultInput from "../../input/Input/DefaultInput";

interface IProps {
  onClose(): void;
  onConfirm(val: string): Promise<boolean>;
}
interface IData {
  pwd: string;
  status: EInputStatus;
}

const MypageConfirmPasswordModal = ({ onClose, onConfirm }: IProps): JSX.Element => {
  const [data, setData] = useState<IData>({
    pwd: "",
    status: EInputStatus.default,
  });
  const { pwd, status } = data;
  const setPwd = (val: string) => {
    setData({ ...data, pwd: val });
  };
  const confirmPwd = async () => {
    const result = await onConfirm(pwd);
    setData({ pwd, status: result ? EInputStatus.success : EInputStatus.fail });
  };
  return (
    <StyledDiv>
      <h1>비밀번호 확인</h1>
      <span>비밀번호를 입력해주세요</span>
      <DefaultInput
        value={pwd}
        setValue={setPwd}
        status={status}
        placeholder={"비밀번호"}
        type={"password"}
      />
      <div>
        {status !== EInputStatus.default ? (
          <span className={"alarm"}>비밀번호를 확인해주세요</span>
        ) : null}
        <GrayBtn label={"취소하기"} type={0} isDisable={false} onClick={onClose} />
        <GreenBtn label={"확인하기"} type={0} isDisable={false} onClick={confirmPwd} />
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  width: 480px;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryBg};
  color: ${({ theme }) => theme.colors.primaryText};
  ${({ theme }) => theme.shadow};
  border-radius: 32px;
  -webkit-animation: slide-in-blurred-bottom 0.4s cubic-bezier(0.23, 1, 0.32, 1) both; // 수정불가
  animation: slide-in-blurred-bottom 0.4s cubic-bezier(0.23, 1, 0.32, 1) both; // 수정불가
  font: ${({ theme }) => theme.fonts.mainContent};
  & > h1 {
    font: ${({ theme }) => theme.fonts.header3};
  }
  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 16px;
    & > * {
      margin: 0 8px;
    }
    & > .alarm {
      position: absolute;
      flex: 1 1 100%;
      text-align: center;
      margin-top: -40px;
      font: ${({ theme }) => theme.fonts.subContentBold};
      color: ${({ theme }) => theme.colors.red};
    }
  }
`;

export default MypageConfirmPasswordModal;
