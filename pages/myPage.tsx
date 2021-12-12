import axios from 'axios';
import { useEffect } from 'react';
import { IPlace } from '../recoil/states';

interface MyPageProps {
  places: IPlace[];
}

export default function MyPage({ places }: MyPageProps) {
  console.log(places);
  return (
    <div>
      <div>
        <h1>내 찜 리스트</h1>
      </div>
      {places.map((place, key) => (
        <div key={key}>
          <div>{place.place_name}</div>
          <div>{place.address_name}</div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const result = await axios.get('http://localhost:4000/places');
  const places = await result.data;

  return {
    props: {
      places,
    },
  };
}
