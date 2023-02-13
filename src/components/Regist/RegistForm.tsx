import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCheckNickname, getCheckUid, postRegist } from "../../api";
import {
  validateEmail,
  validateIdChar,
  validateIdLength,
  validatePhoneNumber,
  validatePWChar,
  validatePWLength,
} from "../../utils/registerValidation";
import { GreenBtn } from "../common/button";
import { IInputVerify, VerifyInput } from "../common/input";

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
  & > .notice {
    font: ${({ theme }) => theme.fonts.tinyContentBold};
    color: ${({ theme }) => theme.colors.red};
    margin: 16px auto 0;
  }

  & > .submit-btn {
    margin-top: 18px;
    width: 148px;
    & > button {
      width: 100%;
      text-align: center;
      display: block;
    }
  }
`;

interface IInputValue {
  value: string;
  pass: boolean;
}
interface IRegistForm {
  uid: IInputValue;
  pwd: IInputValue;
  pwdCheck: IInputValue;
  nickname: IInputValue;
  phoneNumber: IInputValue;
  email: IInputValue;
}
type RegistInputId = "uid" | "pwd" | "pwdCheck" | "email" | "nickname" | "phoneNumber";

interface IInput {
  id: RegistInputId;
  type: string;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  placeholder: string;
  inputVerifyList: IInputVerify[];
}

const RegistForm = () => {
  const [data, setData] = useState<IRegistForm>({
    uid: { value: "", pass: false },
    pwd: { value: "", pass: false },
    pwdCheck: { value: "", pass: false },
    nickname: { value: "", pass: false },
    phoneNumber: { value: "", pass: false },
    email: { value: "", pass: false },
  });
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const updateData = (id: RegistInputId, value: string, pass: boolean, data: IRegistForm) => {
    const newData = { ...data };
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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    let validate = true;
    Object.values(data).forEach((item: IInputValue) => (validate = validate && item.pass));
    console.log("validate", validate);
    if (!validate) {
      setMessage("입력한 정보가 올바르지 않습니다.");
      return;
    }

    const { uid, pwd, nickname, phoneNumber, email } = data;
    const body = {
      uid: uid.value,
      pwd: pwd.value,
      nickname: nickname.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
    };

    postRegist(body)
      .then(() => {
        setMessage("");
        alert("회원가입에 성공하였습니다! 로그인해주세요.");
        navigate("/login");
      })
      .catch(({ response }) => {
        switch (response.status) {
          case 409:
            setMessage("이미 가입된 이메일입니다.");
            break;
          default:
            setMessage("회원가입 처리에 실패하였습니다.\n잠시후 시도해주세요.");
        }
      });
  };

  const validateIdUnique = async (uid: string): Promise<boolean> => {
    return getCheckUid({ uid })
      .then(() => true)
      .catch(() => false);
  };

  const validateNicknameUnique = async (nickname: string): Promise<boolean> => {
    return getCheckNickname({ nickname })
      .then(() => true)
      .catch(() => false);
  };

  const inputList: IInput[] = [
    {
      id: "uid",
      type: "text",
      placeholder: "아이디",
      inputVerifyList: [
        { description: "8글자 이상 16자 이하 입력", verify: validateIdLength },
        { description: "영문 소문자나 숫자로 구성", verify: validateIdChar },
        { description: "사용가능한 아이디", verify: validateIdUnique, lazy: true, api: true },
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
    <StyledForm onSubmit={onSubmit}>
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
      <div className="submit-btn">
        <GreenBtn label={"가입"} type={0} isDisable={false} />
      </div>
    </StyledForm>
  );
};

export default RegistForm;
