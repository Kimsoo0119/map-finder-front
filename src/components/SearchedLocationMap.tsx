import { useState } from "react";
import { useLocation } from "react-router-dom";

function SearchedLocationMap() {
  // const [currentLocation, setCurrentLocation] = useState<Partial<GeolocationCoordinates>>({
  //   latitude: 0,
  //   longitude: 0,
  // });

  const location = useLocation();
  const searchedPlace = location.state;
  console.log(searchedPlace);

  return <p>1</p>;
}
export default SearchedLocationMap;
