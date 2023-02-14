import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store";
import { login, selectUser } from "../../store/userSlice";
import { GreenBtn } from "../common/button";
import { IInputVerify, Input, VerifyInput } from "../common/input";

const StyledForm = styled.form<{ status: string }>`
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
    opacity: ${({ status }) => (status === "failed" ? 1 : 0)};
    margin: 24px auto;
  }
  & > .submit-btn {
    margin: 0 auto 60px;
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
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [data, setData] = useState<IRegistForm>({
    uid: "",
    pwd: "",
    validation: false,
  });

  useEffect(() => {
    if (user.isUser) navigate("/");
  }, [user.isUser]);

  const updateData = (id: RegistInputId, value: string) => {
    const newData = { ...data };
    newData[id] = value;
    setData(newData);
  };
  const pwdRef = useRef<HTMLInputElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // TODO: 로그인 POST요청
    const { uid, pwd } = data;
    dispatch(login({ uid, pwd }));
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
    <StyledForm onSubmit={onSubmit} status={user.status}>
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
              submitInputResult={function (val) {
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
              setValue={function (val) {
                updateData(id, val);
              }}
            />
          );
      })}
      <span className="notice">아이디와 비밀번호를 확인해주세요.</span>
      <div className="submit-btn">
        <GreenBtn label={"로그인"} type={0} isDisable={false} />
      </div>
    </StyledForm>
  );
};

export default React.memo(LoginForm);
