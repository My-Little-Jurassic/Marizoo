import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CafeList from "../CafeList/CafeList";

// 파충류카페 더미데이터
const cafeData = [
  {
    animal_store_id: 0,
    store_name: "마리쥬 파충류카페asfasdfasdfasdfasdfasdfasdf",
    discription: "설명 어쩌구 저쩌구",
    address: "천안시 어딘가",
    tel: "000-000-0000",
    profile_img: "https://picsum.photos/200/300",
    lat: 36.818022,
    lng: 127.123231,
  },
  {
    animal_store_id: 1,
    store_name: "민우네집",
    discription: "설명 어쩌구 저쩌구",
    address: "롯데타워 352층",
    tel: "000-000-0000",
    profile_img: "https://picsum.photos/200/300",
    lat: 37.5126,
    lng: 127.102544,
  },
  {
    animal_store_id: 2,
    store_name: "우파파루파파",
    discription: "설명 어쩌구 저쩌구",
    address: "어딘가",
    tel: "000-000-0000",
    profile_img: "https://picsum.photos/200/300",
    lat: 35.450879,
    lng: 127.56994,
  },
  {
    animal_store_id: 3,
    store_name: "렙타일샵",
    discription: "설명 어쩌구 저쩌구",
    address: "제주도 어딘가",
    tel: "000-000-0000",
    profile_img: "https://picsum.photos/200/300",
    lat: 33.451393,
    lng: 126.570738,
  },
];

const { kakao } = window as any;

// 카페 데이터 타입
interface ICafeData {
  animal_store_id: number;
  store_name: string;
  discription: string;
  address: string;
  tel: string;
  profile_img: string;
  lat: number;
  lng: number;
}

// 지도 테두리 좌표 데이터 타입
interface IMapBounds {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

function CafeMap() {
  const [map, setMap] = useState<any>(null);
  const [mapBounds, setMapBounds] = useState<IMapBounds | null>(null);
  const [filterdCafeData, setFilterdCafeData] = useState<ICafeData[]>(cafeData);
  const [focusedCafe, setFocusedCafe] = useState<number | null>(null);

  //최초 1회 지도 생성
  useEffect(() => {
    const container = document.getElementById("map");
    const mapLng = window.innerWidth <= 600 ? 128 : 128.8;
    const options = { center: new kakao.maps.LatLng(35.7, mapLng), level: 13 };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);

  // map 생성 이후 1회 실행
  useEffect(() => {
    // map 테두리 좌표를 가져오는 함수
    const getMapBounds = () => {
      const bounds = map.getBounds();
      setMapBounds({
        top: bounds.pa,
        bottom: bounds.qa,
        left: bounds.ha,
        right: bounds.oa,
      });
    };
    if (map) {
      kakao.maps.load(() => {
        // 지도가 드래그될 때 좌표 가져오기
        kakao.maps.event.addListener(map, "dragend", () => {
          getMapBounds();
        });
        // 지도가 드래그될 때 좌표 가져오기
        kakao.maps.event.addListener(map, "tilesloaded", () => {
          getMapBounds();
        });
      });
    }
  }, [map]);

  // 죄표가 다시 생성될 때 카페 리스트 다시 필터링하기
  useEffect(() => {
    const newfilterdData = cafeData.filter((cafe) => {
      if (mapBounds === null) {
        return cafe;
      } else {
        return (
          mapBounds.top > cafe.lat &&
          cafe.lat > mapBounds.bottom &&
          mapBounds.left < cafe.lng &&
          cafe.lng < mapBounds.right
        );
      }
    });
    setFilterdCafeData(newfilterdData);
  }, [mapBounds]);

  // 마커 이미지
  const markerImgSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  // 각 카페 배열 순회하며 마커 생성
  cafeData.map((cafe: ICafeData) => {
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
    // 마커 클릭 이벤트
    kakao.maps.event.addListener(marker, "click", () => {
      map.setLevel(4, { anchor: new kakao.maps.LatLng(cafe.lat, cafe.lng) });
    });
    // 마커 마우스오버 이벤트
    kakao.maps.event.addListener(marker, "mouseover", () => {
      setFocusedCafe(cafe.animal_store_id);
    });

    return marker;
  });

  return (
    <KakaoMap id="map">
      <CafeList cafeData={filterdCafeData} focusedCafe={focusedCafe}></CafeList>
    </KakaoMap>
  );
}

export default React.memo(CafeMap);

const KakaoMap = styled.div`
  width: 100%;
  height: 100%;
`;
