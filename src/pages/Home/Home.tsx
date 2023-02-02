import React, { useState, useEffect } from "react";
import { TbX } from "react-icons/tb";
import styled from "styled-components";
import { SearchInput } from "../../components/common/input";

import { HomeNav } from "../../components/common/navbar";
import { FilterSwiper, LiveGrid } from "../../components/Home";

function Home() {
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
    console.log(searchKeyword);
    if (searchKeyword === "") {
      setSearchKeyword(null);
    }
  }, [searchKeyword]);

  return (
    <StyledMain>
      <StyledHomeInput>
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
      </StyledHomeInput>
      <StyledSpacer space={32} />
      <FilterSwiper
        animalList={animalList}
        focusdFilter={focusdFilter}
        setFocusdFilter={setFocusdFilter}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <StyledTitle>
        {searchKeyword === null || ""
          ? "지금 진행중인 방송이에요"
          : `"${searchKeyword}"키워드의 방송입니다.`}
        {searchKeyword === null || "" ? null : (
          <StyledSearchResetBtn
            onClick={() => {
              setSearchKeyword(null);
            }}
          >
            초기화
            <TbX></TbX>
          </StyledSearchResetBtn>
        )}
      </StyledTitle>
      <LiveGrid></LiveGrid>
    </StyledMain>
  );
}

export default Home;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primaryBg};
  @media screen and (max-width: 600px) {
    margin-bottom: 72px;
  }
`;

const StyledHomeInput = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  @media screen and (max-width: 600px) {
    margin-top: 96px;
  }
  @media screen and (min-width: 600px) {
    margin-top: 180px;
  }
`;

const StyledTitle = styled.h4`
  font: ${(props) => props.theme.fonts.header4};
  color: ${(props) => props.theme.colors.primaryText};
  text-align: left;
  width: 90%;
  max-width: 927px;
  @media screen and (max-width: 900px) {
    max-width: 620px;
  }
  margin-bottom: 32px;
`;

const StyledSpacer = styled.div<{ space: number }>`
  height: ${(props) => props.space}px;
  width: 100%;
`;

const StyledSearchResetBtn = styled.button`
  ${(props) => props.theme.styles.button};
  font: ${(props) => props.theme.fonts.tinyContent};
  color: ${(props) => props.theme.colors.secondaryText};
  background-color: ${(props) => props.theme.colors.secondaryBg};
  outline: none;
  border: none;
  margin-left: 5px;
  padding-inline: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
