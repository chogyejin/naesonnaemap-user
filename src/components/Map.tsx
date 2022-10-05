import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import useCurrentLoaction from "../hooks/useCurrentLocation";
import { Place } from "../recoil/states";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  searchKeyword: string;
}

const Map = ({ searchKeyword }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { myLat, myLng } = useCurrentLoaction();
  const { kakao } = window;
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (myLat && myLng) {
      const coords = new kakao.maps.LatLng(myLat, myLng);
      const options = {
        center: coords,
        level: 9,
      };
      const map = new kakao.maps.Map(mapRef.current, options);
      const marker = new kakao.maps.Marker({
        position: coords,
      });

      marker.setMap(map);

      const iwContent = "현 위치";
      const iwRemoveable = true;

      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      infowindow.open(map, marker);
    }
  }, [myLat, myLng]);

  useEffect(() => {
    if (searchKeyword) {
      console.log("gdgdgd");
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      const coords = new kakao.maps.LatLng(myLat, myLng);
      const options = {
        center: coords,
        level: 9,
      };
      const map = new kakao.maps.Map(mapRef.current, options);

      kakao.maps.event.addListener(map, "click", () => {
        infowindow.close();
      });

      const placesSearchCB = (data: Place[], status: any, pagination: any) => {
        setPlaces(data);

        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          map.setBounds(bounds);
        } else {
          alert("다시 검색하세요");
          return;
        }
      };

      // 지도에 마커를 표시하는 함수
      const displayMarker = (place: Place) => {
        // 마커를 생성하고 지도에 표시
        const marker = new kakao.maps.Marker({
          map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });

        // 마커에 클릭이벤트를 등록
        kakao.maps.event.addListener(marker, "click", function () {
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
            </div>`
          );
          infowindow.open(map, marker);
        });
      };

      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(searchKeyword, placesSearchCB);
    }
  }, [searchKeyword]);

  return <Container ref={mapRef} />;
};

export default dynamic(() => Promise.resolve(Map), {
  ssr: false,
});

const Container = styled.div`
  width: 300px;
  height: 300px;
`;
