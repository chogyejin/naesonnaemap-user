import { useState } from "react";
import PlacesList from "../src/components/PlacesList";
import Map from "../src/components/Map";
import SearchBar from "../src/components/SearchBar";
import { Place } from "../src/recoil/states";
import styled from "@emotion/styled";

const Main = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [isShow, setIsShow] = useState(false);

  const handleKeywordChange = (keyword: string) => {
    setSearchKeyword(keyword);
    setIsShow(true);
  };

  const handlePlacesChange = (places: Place[]) => {
    setPlaces(places);
  };

  const handleCloseClick = () => {
    setIsShow(false);
  };

  return (
    <>
      <SearchBar
        searchKeyword={searchKeyword}
        onSearchKeywordChange={handleKeywordChange}
      />
      <MapConatiner>
        <PlacesList
          places={places}
          isShow={isShow}
          onCloseClick={handleCloseClick}
        />
        <Map
          searchKeyword={searchKeyword}
          onPlacesChange={handlePlacesChange}
        />
      </MapConatiner>
    </>
  );
};

const MapConatiner = styled.div`
  position: relative;
`;

export default Main;
