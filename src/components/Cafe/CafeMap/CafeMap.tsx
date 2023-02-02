import React, { useState, useEffect } from "react";

const { kakao } = window as any;

interface IProps {
  cafeData: {
    store_name: string;
    lat: number;
    lng: number;
  }[];
}

function CafeMap(props: IProps) {
  const [map, setMap] = useState<any>(null);

  //최초 1회 지도 생성
  useEffect(() => {
    const container = document.getElementById("map");
    const options = { center: new kakao.maps.LatLng(35.7, 128.8), level: 13 };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);

  // 마커 이미지
  const markerImgSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  // 각 카페 배열 순회하며 마커 생성
  props.cafeData.map((cafe: { store_name: string; lat: number; lng: number }) => {
    // 마커 사이즈 생성
    const markerSize = new kakao.maps.Size(24, 35);
    // 마커 이미지 생성
    const markerImg = new kakao.maps.MarkerImage(markerImgSrc, markerSize);
    // 마커 생성
    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: new kakao.maps.LatLng(cafe.lat, cafe.lng), // 마커를 표시할 위치
      title: cafe.store_name, // 마커의 타이틀
      image: markerImg, // 마커 이미지
    });

    return marker;
  });

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}

export default CafeMap;
