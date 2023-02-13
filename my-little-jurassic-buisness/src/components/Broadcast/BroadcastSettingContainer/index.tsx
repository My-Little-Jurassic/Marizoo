import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { IBroadcastSetting } from "../../../types";
import BroadcastTable from "./BroadcastTable";

interface IProps {
  initSetting: IBroadcastSetting;
  startBroadcast(setting: IBroadcastSetting): void;
  endBroadcast(): void;
}

const BroadcastSettingContainer = ({ initSetting, startBroadcast, endBroadcast }: IProps) => {
  // 방송 설정 STATE
  const [broadcastSetting, setBroadcastSetting] = useState<IBroadcastSetting>({
    ...initSetting,
  });
  const [videoList, setVideoList] = useState<MediaDeviceInfo[]>([]);
  const { id, title, description, animalIdList } = broadcastSetting;

  useEffect(() => {
    getVideoList();
  }, []);

  // 숨겨둔 파일업로드 버튼을 찾기 위한 Ref
  const preview = useRef<string | ArrayBuffer | null>(null);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // INPUT, TEXTAREA 변경 이벤트
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setBroadcastSetting({ ...broadcastSetting, [id]: value });
  };
  // 파일업로드 버튼 클릭 이벤트
  const onClickFileUpload = () => fileUploadRef.current?.click();
  // 파일업로드 이벤트
  const onChangeUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      preview.current = reader.result;
      setBroadcastSetting({
        ...broadcastSetting,
        thumbnail: file,
      });
    };
    reader.readAsDataURL(file);
  };
  // 비디오 변경 이벤트
  const onChangeVideo = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === "-") {
      setBroadcastSetting({ ...broadcastSetting, videoDevice: undefined });
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: { deviceId: value } }).then((stream) => {
      setBroadcastSetting({ ...broadcastSetting, videoDevice: value });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  };
  // 비디오 목록 가져오기
  const getVideoList = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    setVideoList(devices.filter((device) => device.kind === "videoinput"));
  };
  // 방송 시작 함수
  const onStartBroadcast = () => {
    // TODO: 각각의 입력에 대해 유효한지 체크
    startBroadcast(broadcastSetting);
  };
  // 동물 선택 반영 함수
  const toggleAnimal = (list: number[]) => {
    setBroadcastSetting({ ...broadcastSetting, animalIdList: list });
  };
  // 변경 가능여부
  const readOnly = useMemo(() => {
    switch (initSetting.status) {
      case "ONAIR":
      case "RESERVE":
      case "FINISH":
        return true;
      case "DEFAULT":
      default:
        return false;
    }
  }, [initSetting]);

  return (
    <StyledDiv className="BroadcastStatusViewer">
      <label>방송제목</label>
      <input id={"title"} value={title} onChange={onChange} disabled={readOnly} />
      <br />

      <label>방송동물</label>
      <BroadcastTable
        storeId={id}
        disabled={readOnly}
        selectAnimalIdList={animalIdList}
        toggleAnimal={toggleAnimal}
      />
      <br />

      <label>방송설명</label>
      <textarea id={"description"} value={description} onChange={onChange} disabled={readOnly} />
      <br />
      <div className="thumbnail-area">
        <div>
          <label>썸눼일 설정</label>
          <button onClick={onClickFileUpload} disabled={readOnly}>
            업로드
          </button>
          <input
            type="file"
            ref={fileUploadRef}
            id={"thumbnail"}
            accept="image/*"
            onChange={onChangeUploadFile}
            hidden
            readOnly={readOnly}
          />
          <img src={String(preview.current ? preview.current : "")} />
        </div>
        <div>
          <label>캐뭐라 설정</label>
          <select onChange={onChangeVideo} disabled={readOnly}>
            <option>-</option>
            {videoList.map((item, index) => (
              <option key={index} value={item.deviceId}>
                {item?.label}
              </option>
            ))}
          </select>
          <video ref={videoRef} autoPlay />
        </div>
      </div>
      <div className="btn-area">
        <button onClick={endBroadcast} disabled={!readOnly || initSetting.status === "FINISH"}>
          방송종료
        </button>
        <button onClick={onStartBroadcast} disabled={readOnly}>
          방송시작
        </button>
      </div>
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
    flex-wrap: nowrap;
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
        width: 100%;
        background-color: ${({ theme }) => theme.colors.brandColors.basaltGray[900]};
      }
    }
    & > *:last-child {
      & video {
        flex: 1;
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
    & select {
      height: 40px;
      font: ${({ theme }) => theme.fonts.subContent};
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 16px;
    }
    @media screen and (max-width: 600px) {
      flex-wrap: wrap;
      & > * {
        flex: 1 1 100%;
      }
    }
  }
  & > .btn-area {
    margin-top: 32px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 60px;

    & > button {
      flex: 1;
      min-width: 120px;
      margin-bottom: 16px;
      font: ${({ theme }) => theme.fonts.header4};
    }
  }
`;

export default BroadcastSettingContainer;
