import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  validateIdChar,
  validateIdLength,
  validatePWChar,
  validatePWLength,
} from "../../utils/registerValidation";
import { GreenBtn } from "../common/button";
import { IInputVerify, Input, VerifyInput } from "../common/input";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > div {
    margin-bottom: 16px;
  }
  & > input {
    margin-bottom: 32px;
  }

  & > .submit-btn {
    margin-top: 60px;
    width: 148px;
    & > button {
      width: 100%;
      text-align: center;
    }
  }
`;

interface IRegistForm {
  uid: string;
  pwd: string;
  pwdCheck: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  validation: boolean;
}
interface IInput {
  id: string;
  type: string;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  placeholder: string;
  inputVerifyList?: IInputVerify[];
}

const RegistForm = () => {
  const [data, setData] = useState<IRegistForm>({
    uid: "",
    pwd: "",
    pwdCheck: "",
    nickname: "",
    phoneNumber: "",
    email: "",
    validation: false,
  });

  const updateData = (id: string, value: string) => {
    const newData = { ...data };
    switch (id) {
      case "uid":
      case "pwd":
      case "pwdCheck":
      case "nickname":
      case "phoneNumber":
      case "email":
        newData[id] = value;
        break;
      default:
        return;
    }
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

  const inputList: IInput[] = [
    {
      id: "uid",
      type: "text",
      placeholder: "아이디",
      inputVerifyList: [
        { description: "8글자 이상 16자 이하 입력", verify: validateIdLength },
        { description: "영문 소문자와 숫자로 구성", verify: validateIdChar },
      ],
    },
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
    { id: "nickname", type: "text", placeholder: "닉네임" },
    { id: "phoneNumber", type: "tel", placeholder: "연락처" },
    { id: "email", type: "email", placeholder: "이메일" },
  ];

  return (
    <StyledForm>
      {/* <Input
        type={"password"}
        ref={inputRef}
        setValue={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
      {inputList.map((item, index) => {
        const { id, type, ref, placeholder, inputVerifyList } = item;
        if (inputVerifyList)
          return (
            <VerifyInput
              key={index}
              ref={ref}
              type={type}
              placeholder={placeholder}
              inputVerifyList={inputVerifyList}
              submitInputResult={(val) => {
                updateData(id, val);
              }}
            />
          );
        else
          return (
            <Input
              key={index}
              ref={ref}
              type={type}
              placeholder={placeholder}
              setValue={(val) => {
                updateData(id, val);
              }}
            />
          );
      })}
      <div className="submit-btn">
        <GreenBtn label={"가입"} type={0} isDisable={false} />
      </div>
    </StyledForm>
  );
};

export default React.memo(RegistForm);
