import styled from "@emotion/styled";
import axios from "axios";
import React from "react";
import { Place } from "../recoil/states";

interface Props {
  places: Place[];
}

const MyPlacesList = ({ places }: Props) => {
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
    <Container>
      <TitleWrapper>
        <Title>내 찜 리스트 ✅</Title>
      </TitleWrapper>
      {places.map((place) => (
        <InfoContainer key={place.id}>
          <InfoText>
            <span>{place.place_name}</span>
            <span>{place.address_name}</span>
          </InfoText>
          <Button onClick={() => handleDeleteClick(place.id)}>삭제</Button>
        </InfoContainer>
      ))}
    </Container>
  );
};

const Container = styled.div`
  height: 500px;
  overflow: auto;
`;

const TitleWrapper = styled.div`
  height: 60px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 32px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const InfoText = styled.div`
  & > span {
    display: block;
  }

  & > span:first-of-type {
    font-weight: 700;
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

export default MyPlacesList;
