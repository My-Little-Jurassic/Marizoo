import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { TbX } from "react-icons/tb";
import { TbChevronUp, TbChevronDown } from "react-icons/tb";
import { CafeFilterSwiper, CafeListContent } from ".";
import { SearchInput } from "../common/input";
import { searchStores } from "../../api";
import { ICafe } from "./type";

const { kakao } = window as any;

interface IProps {
  map: any;
  cafeDataList: ICafe[] | [];
  setCafeDataList: (cafeList: ICafe[]) => void;
  originalCafeDataList: ICafe[] | [];
  focusedCafe: number | null;
  setFocusedCafe: (id: number | null) => void;
  searchKeyword: string | null;
  setSearchKeyword: (index: string | null) => void;
  filterKeyword: string | null;
  setFilterKeyword: (index: string | null) => void;
}

function CafeList(props: IProps) {
  // 모바일 카페 리스트 전체화면 여부
  const [isListMax, setIsListMax] = useState(false);
  // 동물 정보 더미데이터
  const animalList = [
    { species_id: 0, animalName: "도마뱀", imgUrl: "https://picsum.photos/200/300" },
    { species_id: 1, animalName: "뱀", imgUrl: "https://picsum.photos/200/300" },
    { species_id: 2, animalName: "거북이", imgUrl: "https://picsum.photos/200/300" },
    { species_id: 3, animalName: "악어", imgUrl: "https://picsum.photos/200/300" },
  ];

  // focus된 아이콘
  const [focusdFilter, setFocusdFilter] = useState<number | null>(null);
  // search keyword

  const [searchCafeData, setSearchCafeData] = useState<ICafe[] | []>(props.cafeDataList);

  const [activeSearch, setActiveSearch] = useState<boolean>(true);

  // cafe data 변화에 다른 hook
  useEffect(() => {
    if (props.searchKeyword === null) {
      setSearchCafeData(props.cafeDataList);
    }
  }, [props.cafeDataList]);

  // search keyword 변화에 다른 hook
  useEffect(() => {
    if (props.searchKeyword === "" || null) {
      props.setSearchKeyword(null);
      props.setFilterKeyword(null);
      props.setCafeDataList(props.originalCafeDataList);
      setSearchCafeData(props.cafeDataList);
    } else if (props.searchKeyword) {
      if (activeSearch) {
        setActiveSearch(false);
        setTimeout(() => {
          return setActiveSearch(true);
        }, 500);
      }
    }
  }, [props.searchKeyword]);

  // filter keyword 변화에 다른 hook
  useEffect(() => {
    searchStores({ classification: props.filterKeyword })
      .then((res) => {
        console.log("필터결과", res.data.stores);
        props.setCafeDataList(res.data.stores);
        setSearchCafeData(res.data.stores);
      })
      .catch((e) => console.log("카페 검색 데이터 요청 실패", e));
  }, [props.filterKeyword]);

  useEffect(() => {
    if (activeSearch && props.searchKeyword) {
      searchStores({ storename: props.searchKeyword })
        .then((res) => {
          console.log("검색결과", res.data.stores);
          props.setCafeDataList(res.data.stores);
          setSearchCafeData(res.data.stores);
        })
        .catch((e) => console.log("카페 검색 데이터 요청 실패", e));
    }
  }, [activeSearch]);

  // 카페 리스트에 맞는 목록 컨텐츠 리스트 생성
  const CafeList = searchCafeData.map((cafe, index) => {
    return (
      <CafeListContent
        key={`searchCafe-${index}`}
        cafeData={cafe}
        focusedCafe={props.focusedCafe}
        setFocusedCafe={props.setFocusedCafe}
      ></CafeListContent>
    );
  });

  return (
    <StyledCafeList isListMax={isListMax} cafeDataLen={props.cafeDataList.length}>
      <StyledMaxBar
        onClick={() => {
          setIsListMax(!isListMax);
        }}
      >
        {isListMax ? <TbChevronDown size={32} /> : <TbChevronUp size={32} />}
      </StyledMaxBar>
      <StyledSearchInputBox>
        <SearchInput
          value={""} // 초기 값
          setValue={(value: string) => {
            props.setSearchKeyword(value);
          }} // value값을 전달받을 함수
          placeholder="검색어를 입력해주세요"
          onSearch={(value: string) => {
            props.setSearchKeyword(value);
          }}
        ></SearchInput>
      </StyledSearchInputBox>
      <CafeFilterSwiper
        animalList={animalList}
        focusdFilter={focusdFilter}
        setFocusdFilter={setFocusdFilter}
        searchKeyword={props.searchKeyword}
        setSearchKeyword={props.setSearchKeyword}
        filterKeyword={props.filterKeyword}
        setFilterKeyword={props.setFilterKeyword}
      ></CafeFilterSwiper>
      {props.searchKeyword === null && props.filterKeyword === null ? null : (
        <StyledTitle>
          {props.searchKeyword !== null
            ? `"${props.searchKeyword}" 검색 결과 ${searchCafeData.length}건`
            : `"${props.filterKeyword}" 필터 결과 ${searchCafeData.length}건`}
          <StyledSearchResetBtn
            onClick={() => {
              props.setSearchKeyword(null);
              props.setFilterKeyword(null);
              setSearchCafeData(props.cafeDataList);
              props.setCafeDataList(props.originalCafeDataList);
              props.map.setCenter(
                new kakao.maps.LatLng(35.7, window.innerWidth <= 600 ? 128 : 128.8),
              );
              props.map.setLevel(13);
            }}
          >
            <TbX></TbX>
          </StyledSearchResetBtn>
        </StyledTitle>
      )}
      {CafeList}
    </StyledCafeList>
  );
}

export default React.memo(CafeList);

const StyledCafeList = styled.aside<{ isListMax: boolean; cafeDataLen: number }>`
  z-index: 50;
  position: absolute;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: all 0.5s;
  @media screen and (max-width: 600px) {
    height: ${(props) => (props.cafeDataLen > 0 ? (props.isListMax ? "90%" : "40%") : "10%")};
    width: 100vw;
    bottom: 0px;
    border-radius: 32px 32px 0px 0px;
    background-color: ${(props) => props.theme.colors.secondaryBg + "cc"};
    backdrop-filter: blur(10px);
    padding: 0px 16px 16px 16px;
    box-sizing: border-box;
  }
  @media screen and (min-width: 600px) {
    z-index: 50;
    position: absolute;
    top: 0px;
    right: 0px;
    min-width: 260px;
    width: 32vw;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.secondaryBg + "33"};
    backdrop-filter: blur(10px);
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledMaxBar = styled.div`
  @media screen and (max-width: 600px) {
    cursor: pointer;
    z-index: 60;
    position: sticky;
    top: 0px;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.colors.secondaryText};
  }
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

const StyledSearchInputBox = styled.div`
  @media screen and (max-width: 600px) {
    margin-bottom: 16px;
  }
`;

const StyledTitle = styled.h4`
  font: ${(props) => props.theme.fonts.tinyContentBold};
  color: ${(props) => props.theme.colors.primaryText};
  text-align: left;
  width: 100%;
  min-height: 60px;
  max-width: 927px;
  @media screen and (max-width: 900px) {
    max-width: 620px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 16px;
  word-break: break-all;
  margin: 16px;
  box-sizing: border-box;
`;

const StyledSearchResetBtn = styled.button`
  ${(props) => props.theme.styles.button};
  font: ${(props) => props.theme.fonts.tinyContent};
  color: ${(props) => props.theme.colors.secondaryText};
  background-color: ${(props) => props.theme.colors.secondaryBg};
  outline: none;
  border: none;
  margin-left: 8px;
  padding-inline: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
