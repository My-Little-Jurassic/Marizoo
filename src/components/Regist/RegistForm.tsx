import React, { useState } from "react";
import styled from "styled-components";
import { GreenBtn } from "../common/button";
import { IInputVerify, VerifyInput } from "../common/input";

const StyledForm = styled.form``;

interface IRegistForm {
  uid: string;
  pwd: string;
  pwdCheck: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  validation: boolean;
}
interface IVerifyInput {
  id: string;
  placeholder: string;
  inputVerifyList: IInputVerify[];
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

  const VerifyInputList: IVerifyInput[] = [];

  const updateData = (id: string, value: string) => {
    const newData = { ...data };
    switch (id) {
      case "uid":
      case "pwd":
      case "pwdCheck":
      case "nickname":
      case "email":
        newData[id] = value;
    }
    setData(newData);
  };

  return (
    <StyledForm>
      <VerifyInput
        placeholder="아이디"
        inputVerifyList={[]}
        submitInputResult={function (value: string, result: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
      <GreenBtn label={"가입"} type={0} isDisable={false} />
    </StyledForm>
  );
};

export default RegistForm;
