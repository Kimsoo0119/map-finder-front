import { useEffect, useState } from "react";

const { naver } = window;
function Map() {
  const [currentLocation, setCurrentLocation] = useState<Partial<GeolocationCoordinates>>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 표시할 div

    const position = new naver.maps.LatLng(currentLocation.latitude, currentLocation.longitude);
    const mapOptions = {
      center: position,
      zoom: 18,
      minZoom: 6,
      // zoomControl: true,
      // zoomControlOptions: {
      //   position: naver.maps.Position.TOP_RIGHT,
      // },
    };

    const map = new naver.maps.Map(container, mapOptions);

    const markerOptions = {
      position: position,
      map: map,
      icon: {
        url: "https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg",
        //size: new naver.maps.Size(50, 52),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    };

    const marker = new naver.maps.Marker(markerOptions);
  }, [currentLocation]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}

export default Map;
