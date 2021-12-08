import { useRef, useEffect, useState } from 'react';
import KakaomapComponent from '../components/KaKaoMap';
import SearchBar from '../components/KaKaoMap/SearchBar';

interface ILocation {
  myLat: number;
  myLng: number;
}

export default function Map() {
  const kakaoMap = useRef(null);
  const [keyword, setKeyword] = useState<string>('');
  const [myLocation, setMyLocation] = useState<ILocation>({
    myLat: 37.574515,
    myLng: 126.97693,
  });

  function getKeyword(searchKeyword: string) {
    setKeyword(searchKeyword);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation({
            myLat: position.coords.latitude,
            myLng: position.coords.longitude,
          });
        },
        //지원 안 되면 광화문
        () => {
          setMyLocation({
            myLat: 37.574515,
            myLng: 126.97693,
          });
        },
      );
    }
  }, []);

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

    // 확대 축소 줌 컨트롤
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

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

  useEffect(() => {
    const { kakao } = window as any;
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const coords = new kakao.maps.LatLng(myLocation.myLat, myLocation.myLng);
    const options = {
      center: coords,
      level: 9,
    };
    const map = new kakao.maps.Map(kakaoMap.current, options);

    function placesSearchCB(
      data: string | any[],
      status: any,
      pagination: any,
    ) {
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
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place: { y: any; x: any; place_name: string }) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>',
        );
        infowindow.open(map, marker);
      });
    }

    if (keyword) {
      console.log('12312');

      // 장소 검색 객체를 생성합니다
      const ps = new kakao.maps.services.Places();
      // 키워드로 장소를 검색합니다
      ps.keywordSearch(keyword, placesSearchCB);
    }
  }, [keyword]);

  return (
    <>
      <SearchBar getKeyword={getKeyword} />
      <div>{keyword}</div>
      <KakaomapComponent ref={kakaoMap} />
    </>
  );
}
