import { useRef, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import KakaomapComponent from '../components/KaKaoMap';
import SearchBar from '../components/KaKaoMap/SearchBar';
import useLocation from '../hooks/useLocation';
import {
  ILocation,
  IPlace,
  locationState,
  placesState,
} from '../recoil/states';

export default function Main() {
  const kakaoMap = useRef(null);
  const [keyword, setKeyword] = useState<string>('');
  const myLocation = useRecoilValue<ILocation>(locationState);
  const [places, setPlaces] = useRecoilState<IPlace[]>(placesState);

  function getKeyword(searchKeyword: string) {
    setKeyword(searchKeyword);
  }

  //현재 위치 가져오는 훅
  useLocation();

  //처음 렌더링 되는 지도
  useEffect(() => {
    const { kakao } = window as any;
    const coords = new kakao.maps.LatLng(myLocation.myLat, myLocation.myLng);
    const options = {
      center: coords,
      level: 9,
    };
    const map = new kakao.maps.Map(kakaoMap.current, options);
    const marker = new kakao.maps.Marker({
      position: coords,
      map,
    });
    // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출
    map.relayout();

    const iwContent = '현 위치', // 인포윈도우에 표시할 내용
      iwRemoveable = true;

    // 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 인포윈도우를 마커위에 표시
    infowindow.open(map, marker);
  }, [kakaoMap && myLocation]);

  // keyword로 검색 시 생기는 지도
  useEffect(() => {
    const { kakao } = window as any;
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const coords = new kakao.maps.LatLng(myLocation.myLat, myLocation.myLng);
    const options = {
      center: coords,
      level: 9,
    };
    const map = new kakao.maps.Map(kakaoMap.current, options);

    //맵 클릭하면 인포윈도우 닫기
    kakao.maps.event.addListener(map, 'click', function () {
      infowindow.close();
    });

    function placesSearchCB(data: IPlace[], status: any, pagination: any) {
      setPlaces(data);

      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      } else {
        alert('다시 검색하세요');
        setKeyword('');
        return;
      }
    }

    // 지도에 마커를 표시하는 함수
    function displayMarker(place: IPlace) {
      // 마커를 생성하고 지도에 표시
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, 'click', function () {
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
            </div>
          </div>`,
        );
        infowindow.open(map, marker);
      });
    }

    if (keyword) {
      // 장소 검색 객체를 생성합니다
      const ps = new kakao.maps.services.Places();
      // 키워드로 장소를 검색합니다
      ps.keywordSearch(keyword, placesSearchCB);
    }
  }, [keyword]);

  // useEffect(() => {
  //   if (places.length !== 0) {
  //     console.log(places);
  //   }
  // }, [places]);

  return (
    <>
      <SearchBar getKeyword={getKeyword} />
      {keyword && <div>{keyword}</div>}
      <KakaomapComponent ref={kakaoMap} />
      <div></div>
    </>
  );
}
