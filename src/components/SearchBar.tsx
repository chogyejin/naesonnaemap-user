import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

interface Props {
  searchKeyword: string;
  onSearchKeywordChange: (keyword: string) => void;
}

const SearchBar = ({ searchKeyword, onSearchKeywordChange }: Props) => {
  const [inputText, setInputText] = useState<string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSearchClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!inputText) {
      alert("검색어를 입력하세요");
      return;
    }
    onSearchKeywordChange(inputText);
    setInputText("");
  };

  return (
    <Container>
      <Form>
        <Input
          type="text"
          placeholder="장소 입력하세요"
          value={inputText}
          onChange={handleTextChange}
        />
        <Button type="submit" onClick={handleSearchClick}>
          검색
        </Button>
      </Form>
      <Keyword>{searchKeyword}</Keyword>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Form = styled.form``;

const Input = styled.input`
  width: 300px;
  height: 30px;
  padding: 5px;
  margin-right: 5px;
  font-size: 12px;
  border: 1px solid gray;
  border-radius: 10px;
  &:focus {
    box-shadow: 0 0 5px black;
  }
`;

const Button = styled.button`
  width: 50px;
  height: 30px;
  color: white;
  background-color: black;
  border-radius: 10px;
`;

const Keyword = styled.div``;

export default SearchBar;
