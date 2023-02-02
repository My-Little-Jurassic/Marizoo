import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  validateEmail,
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
    margin: 60px auto;
    width: 148px;
    & > button {
      width: 100%;
      text-align: center;
      display: block;
    }
  }
`;

interface IRegistForm {
  uid: string;
  pwd: string;
  validation: boolean;
}
type RegistInputId = "uid" | "pwd";

interface IInput {
  id: RegistInputId;
  type: string;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  placeholder: string;
  inputVerifyList?: IInputVerify[];
}

const LoginForm = () => {
  const [data, setData] = useState<IRegistForm>({
    uid: "",
    pwd: "",
    validation: false,
  });

  const updateData = (id: RegistInputId, value: string) => {
    const newData = { ...data };
    newData[id] = value;
    setData(newData);
  };
  const pwdRef = useRef<HTMLInputElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // TODO: 로그인 POST요청
  };

  const inputList: IInput[] = [
    {
      id: "uid",
      type: "text",
      placeholder: "아이디",
    },
    {
      id: "pwd",
      type: "password",
      ref: pwdRef,
      placeholder: "비밀번호",
    },
  ];

  return (
    <StyledForm onSubmit={onSubmit}>
      {inputList.map((item, index) => {
        const { id, type, ref, placeholder, inputVerifyList } = item;
        if (inputVerifyList)
          return (
            <VerifyInput
              key={index}
              ref={ref}
              value={data[id]}
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
              value={data[id]}
              type={type}
              placeholder={placeholder}
              setValue={(val) => {
                updateData(id, val);
              }}
            />
          );
      })}
      <div className="submit-btn">
        <GreenBtn label={"로그인"} type={0} isDisable={false} />
      </div>
    </StyledForm>
  );
};

export default React.memo(LoginForm);
