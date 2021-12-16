import axios from 'axios';
import { useEffect, useRef } from 'react';
import { IPlace } from '../recoil/states';

interface MyPageProps {
  myPlaces: IPlace[];
}

export default function MyPage({ myPlaces }: MyPageProps) {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { kakao } = window as any;
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const coords = new kakao.maps.LatLng(37.574515, 126.97693); //위도, 경도 순
    const options = {
      center: coords,
      level: 10,
    };
    const map = new kakao.maps.Map(mapDiv.current, options);

    kakao.maps.event.addListener(map, 'click', function () {
      infowindow.close();
    });

    function displayMarker(place: IPlace) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(
          `<div style="padding:5px;font-size:12px;">
            <div style="display:flex;">
              <div>${place.place_name}</div>
            </div>
            <div>
              <div>
                ${place.road_address_name}
              </div>
              <div>
                ${place.address_name}
              </div>
              <div>
                ${place.phone}
              </div>
              <div>
                <a href=${place.place_url} target=_blank>
                홈페이지
                </a>
              </div>
            </div>
          </div>`,
        );
        infowindow.open(map, marker);
      });
    }

    myPlaces.map((place) => displayMarker(place));
  }, [mapDiv]);

  async function onDelete(placeId: string) {
    const isDeleted = confirm('삭제하시겠습니까?');
    if (isDeleted) {
      const result = await axios.delete(
        `http://localhost:4000/places/${placeId}`,
      );
      if (result.status === 200) {
        alert('삭제되었습니다');
        window.location.reload();
      }
    }
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '60vw', height: '80vh' }}>
          <div ref={mapDiv} style={{ width: '100%', height: '100%' }}></div>
        </div>
        <div>
          <div>
            <h1>내 찜 리스트</h1>
          </div>
          {myPlaces.map((place, key) => (
            <div
              key={key}
              style={{
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <div style={{ textAlign: 'left' }}>
                <div>{place.place_name}</div>
                <div>{place.address_name}</div>
              </div>
              <div>
                <button onClick={() => onDelete(place.id)}>삭제</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const result = await axios.get('http://localhost:4000/places');
  const myPlaces = await result.data;

  return {
    props: {
      myPlaces,
    },
  };
}
