import React, { useState, useEffect } from "react";
import { TbX } from "react-icons/tb";
import styled from "styled-components";

import { SearchInput } from "../../../components/common/input";
import { HomeFilterSwiper, HomeLiveGrid } from "../../../components/user/Home";
import { SideBg } from "../../../components/common/background";
import { getBroadcastList, getSearchedBroadcastList, getSpeciesList } from "../../../api";

function Home() {
  const [speciesList, setSpeciesList] = useState<ISpecies[] | null>();
  const [allOfBroadcastList, setAllOfBroadcastList] = useState<IBroadcast[]>([]);
  const [searchedBroadcastList, setSearchedBroadcastList] = useState<IBroadcast[]>([]);

  // focus된 아이콘
  const [focusdFilter, setFocusdFilter] = useState<number | null>(null);

  // search keyword
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null);

  // 첫 렌더링
  useEffect(() => {
    // DB에 저장된 종 정보 요청하기
    getSpeciesList()
      .then((res) => setSpeciesList(res.data.species))
      .catch((err) => console.log(err));

    // 현재 방송 중인 모든 방송 요청하기
    getBroadcastList()
      .then((res) => setAllOfBroadcastList(res.data.onAir))
      .catch((err) => console.log(err));
  }, []);

  // search keyword 변화에 다른 hook
  // 검색 시 0.3초 동안 검색 멈추면 해당 종이 출연하는 방송 정보 요청하기
  useEffect(() => {
    if (!searchKeyword) {
      setSearchKeyword(null);
      return;
    }
    const timeout = setTimeout(() => {
      getSearchedBroadcastList({ keyword: searchKeyword })
        .then((res) => setSearchedBroadcastList(res.data.onAir))
        .catch(() => setSearchedBroadcastList([]));
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchKeyword]);

  return (
    <StyledMain>
      <SideBg></SideBg>
      <StyledSpacer space={180} />
      {speciesList && (
        <>
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
          <HomeFilterSwiper
            speciesList={speciesList}
            focusdFilter={focusdFilter}
            setFocusdFilter={setFocusdFilter}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
          <StyledTitle>
            {searchKeyword === null || ""
              ? "지금 진행중인 방송이에요"
              : `"${searchKeyword}" 키워드의 방송입니다.`}
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

          {/* 검색 키워드가 있을 때만 검색 조건에 해당하는 방송 정보 렌더링 */}
          {/* 검색 키워드 없을 때는 모든 방송 정보 렌더링 */}

          {searchKeyword ? (
            <HomeLiveGrid broadcastList={searchedBroadcastList} />
          ) : (
            <HomeLiveGrid broadcastList={allOfBroadcastList} />
          )}
        </>
      )}
    </StyledMain>
  );
}

export default Home;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  min-height: 100vh;
`;

const StyledHomeInput = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  @media screen and (max-width: 600px) {
    margin-top: -80px;
  }
  @media screen and (min-width: 600px) {
    margin-top: 0px;
    margin-bottom: 20px;
  }
`;

const StyledTitle = styled.h4`
  font: ${(props) => props.theme.fonts.header4};
  color: ${(props) => props.theme.colors.primaryText};
  text-align: left;
  width: 100%;
  max-width: 927px;
  padding-inline: 16px;
  box-sizing: border-box;
  @media screen and (max-width: 900px) {
    max-width: 620px;
  }
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
  margin-left: 8px;
  padding-inline: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
