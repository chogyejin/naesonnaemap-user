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
    const kakao = (window as any).daum;
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

  return (
    <>
      <SearchBar getKeyword={getKeyword} />
      <div>{keyword}</div>
      <KakaomapComponent ref={kakaoMap} />
    </>
  );
}
