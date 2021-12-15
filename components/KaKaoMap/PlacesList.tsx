import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { IPlace, placesState } from '../../recoil/states';

export default function PlacesList() {
  const places = useRecoilValue<IPlace[]>(placesState);

  async function onAdd(place: IPlace) {
    const result = await axios.post('http://localhost:4000/places', place);

    if (result) {
      console.log(result.data);
    }

    alert('추가되었습니다.');
  }

  return (
    <div>
      <div
        style={{
          width: '20vw',
          height: '70vh',
          position: 'relative',
          opacity: '0.7',
          backgroundColor: 'white',
          top: '-80vh',
          zIndex: '1',
          float: 'left',
        }}>
        <div style={{ borderBottom: 'solid 2px' }}>검색목록</div>
        <div style={{ fontSize: '10px' }}>
          {places.map((place, key) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: 'solid 1px',
                height: '32px',
              }}
              key={key}>
              <div
                style={{
                  paddingBottom: '10px',
                  paddingTop: '5px',
                }}>
                {place.place_name.length > 10 ? (
                  <div>
                    <div>{place.place_name.slice(0, 13)}...</div>
                    <div>{place.address_name.slice(0, 13)}</div>
                  </div>
                ) : (
                  <div>
                    <div>{place.place_name}</div>
                    <div>{place.address_name}</div>
                  </div>
                )}
              </div>
              <div>
                <button onClick={() => onAdd(place)}>추가</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
