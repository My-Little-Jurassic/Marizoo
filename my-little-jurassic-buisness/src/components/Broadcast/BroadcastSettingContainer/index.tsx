import React, { useState } from "react";
import styled from "styled-components";
import { IBroadcastSetting } from "../../../types";
import BroadcastTable from "./BroadcastTable";

interface IProps {
  initSetting: IBroadcastSetting;
}

const BroadcastSettingContainer = ({ initSetting }: IProps) => {
  const [broadcastSetting, setBroadcastSetting] = useState<IBroadcastSetting>({
    ...initSetting,
  });
  const { title, description, thumbnail, animals, videoDevice } = broadcastSetting;

  return (
    <StyledDiv className="BroadcastStatusViewer">
      <label>방송제목</label>
      <input value={title} />
      <br />

      <label>방송동물</label>
      <BroadcastTable />
      <br />

      <label>방송설명</label>
      <textarea value={description} />
      <br />
      <div className="thumbnail-area">
        <div>
          <label>썸눼일 설정</label>
          <button>업로드</button>
          <img src={thumbnail} />
        </div>
        <div>
          <label>캐뭐라 설정</label>
          <input list="camera" />
          <video />
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
    flex-wrap: wrap;
    & > * {
      flex: 1 1 50%;
      display: flex;
      flex-direction: column;
    }
    & > *:first-child {
      & > * {
        flex-shrink: 0;
      }
      & img {
        flex: 1;
        background-color: ${({ theme }) => theme.colors.brandColors.basaltGray[900]};
      }
    }
    & > *:last-child {
      & video {
        width: 100%;
        background-color: ${({ theme }) => theme.colors.brandColors.basaltGray[900]};
      }
    }
    & button {
      width: 100%;
      height: 40px;
      margin-bottom: 16px;
      font: ${({ theme }) => theme.fonts.header5};
    }
    & input {
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 16px;
    }
    @media screen and (max-width: 600px) {
      & > * {
        flex: 1 1 100%;
      }
    }
  }
`;

export default BroadcastSettingContainer;
