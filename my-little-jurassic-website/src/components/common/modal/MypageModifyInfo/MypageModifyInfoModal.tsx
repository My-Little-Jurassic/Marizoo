import React, { useRef, useState } from "react";
import styled from "styled-components";
import { IUser } from ".";
import { getCheckNickname, modifyUser, modifyUserPwd } from "../../../../api";
import { useAppSelector } from "../../../../store";
import { selectUser } from "../../../../store/userSlice";
import {
  validateEmail,
  validateNickname,
  validatePhoneNumber,
  validatePWChar,
  validatePWLength,
} from "../../../../utils/registerValidation";
import { GreenBtn } from "../../button";
import { IInputVerify, VerifyInput } from "../../input";

interface IInputValue {
  value: string;
  pass: boolean;
}

interface IRegistForm {
  pwd: IInputValue;
  pwdCheck: IInputValue;
  nickname: IInputValue;
  phoneNumber: IInputValue;
  email: IInputValue;
}

type RegistInputId = "pwd" | "pwdCheck" | "email" | "nickname" | "phoneNumber";

interface IInput {
  id: RegistInputId;
  type: string;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  placeholder: string;
  inputVerifyList: IInputVerify[];
}

interface IProps {
  onClose(): void;
  currentUser: IUser;
}

const MypageModifyInfoModal = ({ onClose, currentUser }: IProps): JSX.Element => {
  const { pk, token } = useAppSelector(selectUser);
  const [message, setMessage] = useState<string>("");
  const [data, setData] = useState<IRegistForm>({
    pwd: { value: "", pass: true },
    pwdCheck: { value: "", pass: true },
    nickname: { value: currentUser.nickname, pass: false },
    phoneNumber: { value: currentUser.phoneNumber, pass: false },
    email: { value: currentUser.email, pass: false },
  });
  const updateData = (id: RegistInputId, value: string, pass: boolean, data: IRegistForm) => {
    const newData = { ...data };
    if (id === "pwd" && !value) pass = true;
    newData[id] = { value, pass };
    setData(newData);
  };
  const pwdRef = useRef<HTMLInputElement>(null);

  /**
   * 현재 입력한 비밀번호와 value(비밀번호 확인)가 일치하는지 확인
   */
  const validatePwdMatch = (value: string): boolean => {
    if (pwdRef.current) return pwdRef.current.value === value;
    else return false;
  };
  const validateNicknameUnique = async (nickname: string): Promise<boolean> => {
    return getCheckNickname({ nickname })
      .then(() => true && validateNickname(nickname))
      .catch(() => false);
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let validate = true;
    Object.values(data).forEach((item: IInputValue) => (validate = validate && item.pass));
    console.log("validate", validate);
    if (!validate) {
      setMessage("입력한 정보가 올바르지 않습니다.");
      return;
    }

    const { pwd, nickname, phoneNumber, email } = data;
    const modifyUserBody = {
      nickname: nickname.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
    };
    const modifyUserPwdBody = {
      pastPwd: "test",
      changedPwd: pwd.value,
    };
    try {
      if (pwd.value) await modifyUserPwd(pk!, modifyUserPwdBody, token!);
      await modifyUser(pk!, modifyUserBody, token!);
      setMessage("");
      alert("회원정보 변경에 성공하였습니다!");
      onClose();
    } catch (e) {
      console.log(e);
      setMessage("정보 변경에 실패하였습니다.");
    }
  };

  const inputList: IInput[] = [
    {
      id: "pwd",
      type: "password",
      ref: pwdRef,
      placeholder: "비밀번호",
      inputVerifyList: [
        { description: "8글자 이상 입력", verify: validatePWLength },
        { description: "영문, 숫자, 특수문자 모두 포함", verify: validatePWChar },
      ],
    },
    {
      id: "pwdCheck",
      type: "password",
      placeholder: "비밀번호 확인",
      inputVerifyList: [
        {
          description: "1차 비밀번호와 동일하게 입력",
          verify: validatePwdMatch,
        },
      ],
    },
    {
      id: "nickname",
      type: "text",
      placeholder: "닉네임",
      inputVerifyList: [
        {
          description: "사용가능한 닉네임",
          verify: validateNicknameUnique,
          lazy: true,
          api: true,
        },
      ],
    },
    {
      id: "phoneNumber",
      type: "tel",
      placeholder: "연락처",
      inputVerifyList: [
        { description: "올바른 연락처 형식", verify: validatePhoneNumber, lazy: true },
      ],
    },
    {
      id: "email",
      type: "email",
      placeholder: "이메일",
      inputVerifyList: [{ description: "올바른 이메일 형식", verify: validateEmail, lazy: true }],
    },
  ];
  return (
    <StyledDiv>
      <h1>회원정보 수정</h1>
      <form onSubmit={onSubmit}>
        {inputList.map((item, index) => {
          const { id, type, ref, placeholder, inputVerifyList } = item;
          return (
            <VerifyInput
              key={index}
              ref={ref}
              value={data[id].value}
              type={type}
              placeholder={placeholder}
              inputVerifyList={inputVerifyList}
              submitInputResult={function (val, result) {
                updateData(id, val, result, data);
              }}
            />
          );
        })}
        <span className="notice">{message}</span>
        <GreenBtn label={"변경하기"} type={0} isDisable={false} />
      </form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  width: 480px;
  height: auto;
  margin: 32px auto;
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

  & > h1 {
    font: ${({ theme }) => theme.fonts.header3};
    margin-bottom: 16px;
  }
  & > form {
    display: flex;
    flex-direction: column;
    & > * {
      margin: 8px auto;
    }
    & > .notice {
      font: ${({ theme }) => theme.fonts.tinyContentBold};
      color: ${({ theme }) => theme.colors.red};
    }
  }
`;

export default MypageModifyInfoModal;
