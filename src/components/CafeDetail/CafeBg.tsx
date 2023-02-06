import React, { useState, useEffect } from "react";
import styled from "styled-components";

const { kakao } = window as any;

function CafeBg(props: { lat: number; lng: number }) {
  //최초 1회 지도 생성
  useEffect(() => {
    const roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
    const roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
    const roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
    const position = new kakao.maps.LatLng(props.lat, props.lng);
    // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
    roadviewClient.getNearestPanoId(position, 50, function (panoId: number) {
      roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
    });
  }, []);

  return <KakaoMap id="roadview"></KakaoMap>;
}

export default React.memo(CafeBg);

const KakaoMap = styled.div`
  width: 100%;
  height: 100%;
`;
