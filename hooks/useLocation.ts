import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ILocation, locationState } from '../recoil/states';

export default function useLoaction() {
  const [myLocation, setMyLocation] = useRecoilState<ILocation>(locationState);
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
  return myLocation;
}
