import styled from "@emotion/styled";
import axios from "axios";
import { Place } from "../recoil/states";

interface Props {
  places: Place[];
}

const PlacesList = ({ places }: Props) => {
  const handleAddClick = async (place: Place) => {
    try {
      const result = await axios.post("http://localhost:4000/places", place);

      if (result.status == 200) {
        console.log(result.data);
      }

      alert("추가되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {places.length > 0 ? (
        <Container>
          <Title>
            <span>검색목록</span>
            <button>&#8701; </button>
          </Title>
          {places.map((place) => (
            <PlaceContainer key={place.id}>
              <div>
                <span>{place.place_name}</span>
                <span>{place.address_name}</span>
              </div>
              <Button onClick={() => handleAddClick(place)}>추가</Button>
            </PlaceContainer>
          ))}
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  position: absolute;
  top: 152px;
  left: 12%;
  width: 240px;
  height: 460px;
  padding-right: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 99;
  overflow: auto;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 20px;
  border-bottom: 1px solid #aaa;

  & > button {
    font-size: 32px;
  }
`;

const PlaceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 10px 10px;
  border-bottom: 1px solid #aaa;
  font-size: 12px;

  & > div {
    width: 160px;

    & > span:first-of-type {
      font-weight: 700;
    }

    & > span {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;

const Button = styled.button`
  width: 40px;
  height: 24px;
  font-size: 12px;
  color: white;
  background-color: black;
  border-radius: 8px;
`;

export default PlacesList;
