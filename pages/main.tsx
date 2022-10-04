import { useRef, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Map from "../src/components/Map";
import SearchBar from "../src/components/SearchBar";
import useLocation from "../src/hooks/useCurrentLocation";
import { locationState, Place, placesState } from "../src/recoil/states";

const Main = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleKeywordChange = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <>
      <SearchBar
        searchKeyword={searchKeyword}
        onSearchKeywordChange={handleKeywordChange}
      />
      <Map searchKeyword={searchKeyword} />
    </>
  );
};

export default Main;
