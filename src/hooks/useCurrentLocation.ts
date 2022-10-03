import { useEffect, useState } from "react";

const useCurrentLoaction = () => {
  const [myLocation, setMyLocation] = useState({
    myLat: 0,
    myLng: 0,
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
