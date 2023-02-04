import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CafeList from "../CafeList/CafeList";

import { TbZoomCancel, TbLocation } from "react-icons/tb";

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
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number }>({
    lat: window.innerWidth <= 600 ? 128 : 128.8,
    lng: 35.7,
  });

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
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
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
      // 마커 마우스오버 이벤트
      kakao.maps.event.addListener(marker, "mouseout", () => {
        setFocusedCafe(null);
      });

      return marker;
    });
  }, [map]);

  // 죄표가 다시 생성될 때 카페 리스트 다시 필터링하기
  useEffect(() => {
    const newfilterdData = cafeData
      .filter((cafe) => {
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
      })
      .sort((cafe1, cafe2) => {
        // 사용자 위치에 다른 가게 정렬
        const getDistance = (ax: number, ay: number, bx: number, by: number) =>
          Math.sqrt(Math.abs(bx - ax * bx - ax) + Math.abs(by - ay * by - ay)); // 피타고라스
        if (
          getDistance(cafe1.lng, userPosition.lng, cafe1.lat, userPosition.lat) <
          getDistance(cafe2.lng, userPosition.lng, cafe2.lat, userPosition.lat)
        ) {
          return 1;
        }
        if (
          getDistance(cafe1.lng, userPosition.lng, cafe1.lat, userPosition.lat) >
          getDistance(cafe2.lng, userPosition.lng, cafe2.lat, userPosition.lat)
        ) {
          return -1;
        }
        return 0;
      });

    setFilterdCafeData(newfilterdData);
  }, [mapBounds]);

  useEffect(() => {
    // 사용자 위치 마커 이미지
    const userPositionImgSrc =
      "data:image/png;base64,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";
    // 마커 사이즈 생성
    const markerSize = new kakao.maps.Size(24, 24);
    // 마커 이미지 생성
    const userPositionImg = new kakao.maps.MarkerImage(userPositionImgSrc, markerSize);
    // 마커 생성
    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: new kakao.maps.LatLng(userPosition.lat, userPosition.lng), // 마커를 표시할 위치
      image: userPositionImg, // 마커 이미지
    });
    // 마커 클릭 이벤트
    kakao.maps.event.addListener(marker, "click", () => {
      map.setLevel(4, { anchor: new kakao.maps.LatLng(userPosition.lat, userPosition.lng) });
    });
  }, [userPosition]);

  return (
    <KakaoMap id="map">
      <CafeList
        cafeData={filterdCafeData}
        focusedCafe={focusedCafe}
        setFocusedCafe={setFocusedCafe}
      />
      <StyledMapIconSet>
        <StyledMapIcon
          onClick={() => {
            map.setCenter(new kakao.maps.LatLng(35.7, window.innerWidth <= 600 ? 128 : 128.8));
            map.setLevel(13);
          }}
        >
          <TbZoomCancel size={24} />
        </StyledMapIcon>
        <StyledMapIcon
          onClick={() => {
            map.setCenter(new kakao.maps.LatLng(userPosition.lat, userPosition.lng));
            map.setLevel(8);
          }}
        >
          <TbLocation size={24} />
        </StyledMapIcon>
      </StyledMapIconSet>
    </KakaoMap>
  );
}

export default React.memo(CafeMap);

const KakaoMap = styled.div`
  width: 100%;
  height: 100%;
  ${(props) =>
    props.theme.isDark // 지도 이미지 다크모드
      ? `
  & > div > div > div > div {
    filter: saturate(80%) brightness(1.2);
  }
  & > div > div > div > img {
    filter: invert(100%) sepia(65%) hue-rotate(190deg) saturate(80%);
  }
  `
      : null};
`;

const StyledMapIconSet = styled.div`
  z-index: 50;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100px;
  height: 100px;
  color: ${(props) => props.theme.colors.primaryText};
`;
const StyledMapIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.styles.button};
  width: 48px;
  height: 48px;
  margin: 8px;
  background-color: ${(props) => props.theme.colors.primaryBg};
  color: ${(props) => props.theme.colors.primaryText};
`;
