import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import useCurrentLoaction from "../hooks/useCurrentLocation";
import useScript from "../hooks/useScript";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const { kakao } = window;
  const mapRef = useRef(null);
  const myLocation = useCurrentLoaction();
  const isLoaded = useScript();

  useEffect(() => {
    if (!isLoaded) return;

    const coords = new kakao.maps.LatLng(myLocation.myLat, myLocation.myLng);
    const options = {
      center: coords,
      level: 9,
    };
    const map = new kakao.maps.Map(mapRef.current, options);
    const marker = new kakao.maps.Marker({
      position: coords,
      map,
    });

    map.relayout();

    const iwContent = "현 위치", // 인포윈도우에 표시할 내용
      iwRemoveable = true;

    // 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 인포윈도우를 마커위에 표시
    infowindow.open(map, marker);
  }, [
    isLoaded,
    kakao.maps.InfoWindow,
    kakao.maps.LatLng,
    kakao.maps.Map,
    kakao.maps.Marker,
    myLocation.myLat,
    myLocation.myLng,
  ]);

  return <Container ref={mapRef} />;
};

export default dynamic(() => Promise.resolve(Map), {
  ssr: false,
});

const Container = styled.div`
  width: 300px;
  height: 300px;
`;
