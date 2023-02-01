import React from "react";
import styled from "styled-components";
import { TbSearch } from "react-icons/tb";

const StyledDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 516px;
  height: 60px;
  border: 4px solid ${({ theme }) => theme.colors.green};
  border-radius: 32px;
  padding: auto 28px;
  display: flex;
  align-items: center;
  overflow: hidden;
  ${({ theme }) => theme.shadow}; //shadow CSS
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  transition: all 0.1s ease-in-out;

  &:focus-within {
    border-width: 6px;
    & > label svg {
      margin: auto 8px auto 22px;
    }
  }

  & > label svg {
    transition: all 0.1s ease-in-out;
    font-size: 25px;
    margin: auto 8px auto 24px;
    stroke-width: 3px;
    color: ${({ theme }) => theme.colors.green};
  }

  & > input {
    width: 424px;
    height: 100%;
    border: none;
    background: none;
    font: ${({ theme }) => theme.fonts.subContentBold};
    color: ${({ theme }) => theme.colors.primaryText};

    &:focus {
      outline: none;
    }
    &::placeholder {
      font: ${({ theme }) => theme.fonts.subContentBold};
      color: ${({ theme }) => theme.colors.brandColors.basaltGray[400]};
    }
  }
`;

interface IProps {
  value?: string; // 초기 값
  setValue(value: string): void; // value값을 전달받을 함수
  placeholder?: string;
  onSearch(value: string): void; // Enter시 value 값을 전달받을 함수
}

const SearchInput = ({ value = "", setValue, placeholder = "", onSearch }: IProps): JSX.Element => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onKeyup = (e: React.KeyboardEvent & React.ChangeEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch(e.target.value);
  };

  return (
    <StyledDiv>
      <label>
        <TbSearch />
      </label>
      <input defaultValue={value} placeholder={placeholder} onChange={onChange} onKeyUp={onKeyup} />
    </StyledDiv>
  );
};

export default React.memo(SearchInput);
