import axios from 'axios';
import { useEffect } from 'react';
import { IPlace } from '../recoil/states';

interface MyPageProps {
  places: IPlace[];
}

export default function MyPage(props: MyPageProps) {
  console.log(props);
  console.log(props.places[0]);
  const myLists = props.places;

  return (
    <div>
      <div>
        <h1>내 찜 리스트</h1>
      </div>
      {myLists.map((list, key) => (
        <div key={key}>
          <div>{list.place_name}</div>
          <div>{list.address_name}</div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const result = await axios.get('http://localhost:4000/places');
  const places = result.data;

  return {
    props: {
      places,
    },
  };
}
