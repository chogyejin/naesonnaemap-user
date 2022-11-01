import styled from "@emotion/styled";
import axios from "axios";
import { useRef } from "react";
import Map from "../src/components/Map";
import usePlaces from "../src/hooks/usePlaces";

const MyPage = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const places = usePlaces();
  console.log(places);

  const handleDeleteClick = async (placeId: string) => {
    if (!confirm("삭제하시겠습니까?")) {
      return;
    }

    try {
      const result = await axios.delete(
        `http://localhost:4000/places/${placeId}`
      );

      if (result.status === 200) {
        alert("삭제되었습니다");
        window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        return;
      }
      console.error("native error");
    }
  };

  return (
    <div>
      <TitleWrapper>
        <Title>내 찜 리스트 ✅</Title>
      </TitleWrapper>
      <Map myPlaces={places} />
      <div ref={mapDiv} />
    </div>
  );
};

const TitleWrapper = styled.div`
  height: 72px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 32px;
`;

export default MyPage;
