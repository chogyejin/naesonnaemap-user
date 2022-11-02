import styled from "@emotion/styled";
import Map from "../src/components/Map";
import MyPlacesList from "../src/components/MyPlacesList";
import usePlaces from "../src/hooks/usePlaces";

const MyPage = () => {
  const places = usePlaces();

  return (
    <div>
      <ContentContainer>
        <Map myPlaces={places} width={50} />
        <MyPlacesList places={places} />
      </ContentContainer>
    </div>
  );
};

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 100px;
`;

export default MyPage;
