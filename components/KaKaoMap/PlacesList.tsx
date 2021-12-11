import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { IPlace, placesState } from '../../recoil/states';

export default function PlacesList() {
  const places = useRecoilValue<IPlace[]>(placesState);

  return (
    <div>
      <div
        style={{
          width: '20vw',
          height: '40vh',
          position: 'relative',
          opacity: '0.7',
          backgroundColor: 'white',
          top: '-80vh',
          zIndex: '1',
          float: 'left',
        }}>
        <div style={{ fontSize: '10px' }}>
          {places.map((place, key) => (
            <div key={key}>{place.place_name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
