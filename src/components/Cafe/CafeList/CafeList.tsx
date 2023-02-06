import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { TbChevronUp, TbChevronDown } from "react-icons/tb";
import CafeListContent from "../CafeListContent/CafeListContent";
import { SearchInput } from "../../common/input";
import { CafeFilterSwiper } from "..";
import { TbX } from "react-icons/tb";

interface IProps {
  cafeData: {
    animal_store_id: number;
    store_name: string;
    description: string;
    address: string;
    tel: string;
    profile_img: string;
    lat: number;
    lng: number;
  }[];
  focusedCafe: number | null;
  setFocusedCafe: (id: number | null) => void;
}

function CafeList(props: IProps) {
  // 모바일 카페 리스트 전체화면 여부
  const [isListMax, setIsListMax] = useState(false);
  // 동물 정보 더미데이터
  const animalList = [
    { animalName: "도마뱀", imgUrl: "https://picsum.photos/200/300" },
    { animalName: "뱀", imgUrl: "https://picsum.photos/200/300" },
    { animalName: "거북이", imgUrl: "https://picsum.photos/200/300" },
    { animalName: "악어", imgUrl: "https://picsum.photos/200/300" },
    { animalName: "고등어초밥", imgUrl: "https://picsum.photos/200/300" },
  ];

  // focus된 아이콘
  const [focusdFilter, setFocusdFilter] = useState<number | null>(null);
  // search keyword
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null);

  // search keyword 변화에 다른 hook
  useEffect(() => {
    if (searchKeyword === "") {
      setSearchKeyword(null);
    }
    console.log(searchKeyword);
  }, [searchKeyword]);

  // 카페 리스트에 맞는 목록 컨텐츠 리스트 생성
  const CafeList = props.cafeData.map((cafe, index) => {
    return (
      <CafeListContent
        key={`cafe-${index}`}
        cafe={cafe}
        focusedCafe={props.focusedCafe}
        setFocusedCafe={props.setFocusedCafe}
      ></CafeListContent>
    );
  });

  return (
    <StyledCafeList isListMax={isListMax} cafeDataLen={props.cafeData.length}>
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
            setSearchKeyword(value);
          }} // value값을 전달받을 함수
          placeholder="검색어를 입력해주세요"
          onSearch={(value: string) => {
            setSearchKeyword(value);
          }}
        ></SearchInput>
      </StyledSearchInputBox>
      <CafeFilterSwiper
        animalList={animalList}
        focusdFilter={focusdFilter}
        setFocusdFilter={setFocusdFilter}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      ></CafeFilterSwiper>
      {searchKeyword === null || "" ? null : (
        <StyledTitle>
          {`"${searchKeyword}" 검색결과`}
          <StyledSearchResetBtn
            onClick={() => {
              setSearchKeyword(null);
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
  width: 90%;
  min-height: 60px;
  max-width: 927px;
  @media screen and (max-width: 900px) {
    max-width: 620px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 16px;
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
