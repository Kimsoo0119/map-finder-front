import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const { naver } = window;
interface LocationProps {
  mapInit: boolean;
  setMapInit: React.Dispatch<React.SetStateAction<boolean>>;
}

function MyLocationMap({ mapInit, setMapInit }: LocationProps) {
  const location = useLocation();
  const searchedPlace = location.state;
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [currentLocation, setCurrentLocation] = useState<Partial<GeolocationCoordinates>>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      createMap(position);
    });
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
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  function createMap(position: GeolocationPosition) {
    const container = document.getElementById("map"); // 지도를 표시할 div
    mapRef.current = new naver.maps.Map(container, {
      center: naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
    });

    mapRef.current = new naver.maps.Marker({
      position: new naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
      map: mapRef.current,
      icon: {
        url: "https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg",
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    });
  }

  // useEffect(() => {
  //   const container = document.getElementById("map"); // 지도를 표시할 div

  //   if (searchedPlace) {
  //     const tm128 = new naver.maps.Point(searchedPlace.mapX, searchedPlace.mapY);
  //     const latlng = naver.maps.TransCoord.fromTM128ToLatLng(tm128);
  //     const position = new naver.maps.LatLng(latlng.lat(), latlng.lng());

  //     const mapOptions = {
  //       center: position,
  //       icon: {
  //         url: "https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg",
  //         origin: new naver.maps.Point(0, 0),
  //         anchor: new naver.maps.Point(25, 26),
  //       },
  //     };

  //     const map = new naver.maps.Map(container, mapOptions);
  //     const markerOptions = {
  //       position: position,
  //       map: map,
  //       icon: {
  //         url: "https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg",
  //         origin: new naver.maps.Point(0, 0),
  //         anchor: new naver.maps.Point(25, 26),
  //       },
  //     };

  //     new naver.maps.Marker(markerOptions);
  //   }
  // else {
  //   const mapOptions = {
  //     center: naver.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
  //     icon: {
  //       url: "https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg",
  //       origin: new naver.maps.Point(0, 0),
  //       anchor: new naver.maps.Point(25, 26),
  //     },
  //   };

  //   const map = new naver.maps.Map(container, mapOptions);

  //   const markerOptions = {
  //     position: naver.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
  //     map: map,
  //     icon: {
  //       url: "https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg",
  //       origin: new naver.maps.Point(0, 0),
  //       anchor: new naver.maps.Point(25, 26),
  //     },
  //   };
  //   new naver.maps.Marker(markerOptions);
  // }
  // }, [createMap]);

  // useEffect(() => {
  //   //searchedPlace가 있을떄와 없을때를 기준으로
  //   const container = document.getElementById("map"); // 지도를 표시할 div

  //   let position = null;

  //   // 검색한 장소가 없으면 현재 위치로 설정
  //   position = new naver.maps.LatLng(currentLocation.latitude, currentLocation.longitude);

  //   const mapOptions = {
  //     icon: {
  //       url: "https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg",
  //       origin: new naver.maps.Point(0, 0),
  //       anchor: new naver.maps.Point(25, 26),
  //     },
  //   };
  //   const map = new naver.maps.Map(container, mapOptions);

  // const markerOptions = {
  //   position: position,
  //   map: map,
  //   icon: {
  //     url: "https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg",
  //     origin: new naver.maps.Point(0, 0),
  //     anchor: new naver.maps.Point(25, 26),
  //   },
  // };

  // const marker = new naver.maps.Marker(markerOptions);
  //   if (mapInit) {
  //     marker.setMap(null);
  //   }
  //   // 검색한 장소가 있으면 현재 위치 마커는 그대로 유지하면서 해당 좌표로 map의 위치를 변경
  //   if (searchedPlace) {
  //     const center = map.getCenter();
  //     console.log(center);
  //     console.log(position);

  //     map.setCenter(position);
  //   }
  // }, [currentLocation, searchedPlace, mapInit]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}

export default MyLocationMap;
