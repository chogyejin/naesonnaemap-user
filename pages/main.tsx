import { useRef, useEffect, useState } from 'react';
import KakaomapComponent from '../components/KaKaoMap';
import SearchBar from '../components/KaKaoMap/SearchBar';

export default function Map() {
  const kakaoMap = useRef(null);
  let myLat = 37.574515; //위도
  let myLng = 126.97693; //경도
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    console.log(keyword);
  }, [keyword]);

  function createMap() {
    const coords = new (window as any).daum.maps.LatLng(myLat, myLng);
    const options = {
      center: coords,
      level: 9,
    };
    const map = new (window as any).daum.maps.Map(kakaoMap.current, options);
    const marker = new (window as any).daum.maps.Marker({
      position: coords,
      map,
    });
    // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출
    map.relayout();

    // 확대 축소 줌 컨트롤
    const zoomControl = new (window as any).daum.maps.ZoomControl();
    map.addControl(
      zoomControl,
      (window as any).daum.maps.ControlPosition.RIGHT,
    );
  }

  function getKeyword(searchKeyword: string) {
    setKeyword(searchKeyword);
  }

  useEffect(() => {
    if (kakaoMap && kakaoMap.current) {
      const ps = new (window as any).daum.maps.services.Places();
      console.log(ps);
      //GPS 지원되면
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            createMap();
          },
          //지원 안 되면 광화문
          () => {
            createMap();
          },
        );
      }
    }
  }, [kakaoMap]);
  return (
    <>
      <SearchBar getKeyword={getKeyword} />
      <div>{keyword}</div>
      <KakaomapComponent ref={kakaoMap} />
    </>
  );
}
