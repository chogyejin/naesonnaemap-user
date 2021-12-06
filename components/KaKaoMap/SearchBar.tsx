import React, { useEffect, useState } from 'react';

interface SearchBarProps {
  getKeyword: (keyword: string) => void;
}

export default function SearchBar({ getKeyword }: SearchBarProps) {
  const [inputText, setInputText] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    getKeyword(searchKeyword);
  }, [searchKeyword]);

  function onClickButton(e: React.FormEvent) {
    e.preventDefault();
    if (!inputText) {
      alert('검색어를 입력하세요');
    }
    setSearchKeyword(inputText);
    setInputText('');
  }
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="장소 입력하세요"
          value={inputText}
          onChange={(event) => {
            setInputText(event.target.value);
          }}
        />
        <button type="submit" onClick={onClickButton}>
          검색
        </button>
      </form>
    </div>
  );
}
