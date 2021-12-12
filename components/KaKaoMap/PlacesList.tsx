import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { IPlace, placesState } from '../../recoil/states';

export default function PlacesList() {
  const places = useRecoilValue<IPlace[]>(placesState);

  function onAdd() {
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
        <div style={{ fontSize: '12px' }}>
          {places.map((place, key) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: 'solid 1px',
                height: '32px',
              }}>
              <div
                style={{
                  paddingBottom: '10px',
                  paddingTop: '5px',
                }}
                key={key}>
                {place.place_name.length > 10 ? (
                  <div>{place.place_name.slice(0, 13)}...</div>
                ) : (
                  <div>{place.place_name}</div>
                )}
              </div>
              <div>
                <button onClick={onAdd}>버튼</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
