import React, { useState } from "react";
import styled from "styled-components";
import BroadcastTable from "./BroadcastTable";

interface IAnimal {
  id: number;
  name: string;
  select: boolean;
  classification: string;
}

interface IBroadcastSetting {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  animals: IAnimal[];
  status: "DEFAULT" | "RESERVE" | "ONAIR" | "FINISH";
  viewers: number;
  likes: number;
}

const BroadcastSettingContainer = () => {
  const [data, setaData] = useState<IBroadcastSetting>({
    id: 0,
    title: "",
    description: "",
    thumbnail: "",
    animals: [],
    status: "DEFAULT",
    viewers: 0,
    likes: 0,
  });

  return (
    <StyledDiv className="BroadcastStatusViewer">
      <label>방송제목</label>
      <input />
      <br />

      <label>방송동물</label>
      <BroadcastTable />
      <br />

      <label>방송설명</label>
      <textarea />
      <br />
      <div className="thumbnail-area">
        <div>
          <label>썸눼일 설정</label>
          <button>업로드</button>
          <br />

          <label>캐뭐라 설정</label>
          <input list="camera" />
        </div>
        <div>
          <label>썸눼일 미리보기</label>
          <img />
        </div>
      </div>
      <datalist id="camera">
        <option defaultChecked value={"1번 카메라"} />
      </datalist>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 32px 16px;
  color: ${({ theme }) => theme.colors.primaryText};
  display: flex;
  flex-direction: column;
  & label {
    display: block;
    margin-bottom: 8px;
    font: ${({ theme }) => theme.fonts.mainContent};
  }
  & input {
    box-sizing: border-box;
    height: 40px;
    font: ${({ theme }) => theme.fonts.subContent};
    margin-bottom: 8px;
  }
  & > textarea {
    height: 120px;
    font: ${({ theme }) => theme.fonts.subContent};
    margin-bottom: 8px;
  }

  & > .thumbnail-area {
    display: flex;
    & > * {
      flex: 1 1 0;
    }
    & > *:first-child {
      margin-right: 16px;
    }
    & button {
      width: 100%;
      height: 40px;
      margin-bottom: 32px;
      font: ${({ theme }) => theme.fonts.header5};
    }
    & input {
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 16px;
    }
    & > *:last-child {
      display: flex;
      flex-direction: column;
      & img {
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme.colors.brandColors.basaltGray[900]};
      }
    }
  }
`;

export default BroadcastSettingContainer;
