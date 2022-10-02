import { useEffect, useState } from "react";

const useCurrentLoaction = () => {
  const [myLocation, setMyLocation] = useState({
    myLat: 37.574515,
    myLng: 126.97693,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation((prevState) => ({
            ...prevState,
            myLat: position.coords.latitude,
            myLng: position.coords.longitude,
          }));
        },
        () => {
          console.warn("Cannot find current location ");
        }
      );
    }
  }, []);

  return myLocation;
};

export default useCurrentLoaction;
