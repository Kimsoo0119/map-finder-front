import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const { naver } = window;

function MyLocationMap() {
  const location = useLocation();
  const searchedPlace = location.state;

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

    let position = null;
    if (searchedPlace) {
      // 검색한 장소가 있으면 TM128 좌표계를 위도 경도 좌표계로 변환
      const tm128 = new naver.maps.Point(searchedPlace.mapX, searchedPlace.mapY);
      const latlng = naver.maps.TransCoord.fromTM128ToLatLng(tm128);
      console.log(latlng);

      position = new naver.maps.LatLng(latlng.lat(), latlng.lng());
    } else {
      // 검색한 장소가 없으면 현재 위치로 설정
      position = new naver.maps.LatLng(currentLocation.latitude, currentLocation.longitude);
    }

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

    // 검색한 장소가 있으면 현재 위치 마커는 그대로 유지하면서 해당 좌표로 map의 위치를 변경
    if (searchedPlace) {
      map.setCenter(position);
    }
  }, [currentLocation, searchedPlace]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}

export default MyLocationMap;
