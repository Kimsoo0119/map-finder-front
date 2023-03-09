import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const { naver } = window;

function MyLocationMap() {
  const [currentLocation, setCurrentLocation] = useState<Partial<GeolocationCoordinates>>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
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

    // watchPosition()으로 등록한 이벤트 핸들러를 해제하기 위해 watchId를 반환하는 함수를 반환
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 표시할 div

    const position = new naver.maps.LatLng(currentLocation.latitude, currentLocation.longitude);
    const mapOptions = {
      center: position,
      zoom: 18,
      minZoom: 6,
    };

    const map = new naver.maps.Map(container, mapOptions);

    const markerOptions = {
      position: position,
      map: map,
      icon: {
        url: "https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg",
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    };

    const marker = new naver.maps.Marker(markerOptions);
  }, [currentLocation]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}

export default MyLocationMap;
