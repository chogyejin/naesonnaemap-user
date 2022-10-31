import { useState } from "react";
import PlacesList from "../src/components/PlacesList";
import Map from "../src/components/Map";
import SearchBar from "../src/components/SearchBar";
import { Place } from "../src/recoil/states";

const Main = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);

  const handleKeywordChange = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handlePlacesChange = (places: Place[]) => {
    setPlaces(places);
  };

  return (
    <>
      <SearchBar
        searchKeyword={searchKeyword}
        onSearchKeywordChange={handleKeywordChange}
      />
      <PlacesList places={places} />
      <Map searchKeyword={searchKeyword} onPlacesChange={handlePlacesChange} />
    </>
  );
};

export default Main;
