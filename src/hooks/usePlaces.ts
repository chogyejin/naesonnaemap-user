import axios from "axios";
import { useEffect, useState } from "react";
import { Place } from "../recoil/states";

const usePlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const result = await axios.get("http://localhost:4000/places");

        if (result.status === 200) {
          setPlaces(result.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
          return;
        }
        console.error("native error");
      }
    };

    fetchPlaces();
  }, []);

  return places;
};

export default usePlaces;
