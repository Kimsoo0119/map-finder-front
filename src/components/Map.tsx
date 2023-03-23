import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const { naver } = window;
interface LocationProps {
  mapInit: boolean;
  setMapInit: React.Dispatch<React.SetStateAction<boolean>>;
}

function Map({ mapInit, setMapInit }: LocationProps) {
  const location = useLocation();
  const searchedPlace = location.state;
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [currentLocation, setCurrentLocation] = useState<Partial<GeolocationCoordinates>>({
    latitude: 0,
    longitude: 0,
  });
  const [markers, setMarkers] = useState<any[]>([]);
  var locationBtnHtml = '<img src="/icons/my-location.svg" />';
  var blankHtml = '<img src="/icons/blank.svg" />';

  useEffect(() => {
    //첫 마운트 시 현재위치를 받아오는 기능
    navigator.geolocation.getCurrentPosition((position) => {
      initMap(position); // 현재 포지션을 기준으로 지도 생성, mapRef에 map 정보 저장 이후 수정에 용이
    });
    //현재 위치를 계속 받아오는 기능 위치가 이동할때마다 latLon변경
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
      //마운트 해제시 watchPosition 해제
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  function initMap(position: GeolocationPosition) {
    const container = document.getElementById("map"); // 지도를 표시할 div
    mapRef.current = new naver.maps.Map(container, {
      center: new naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
    });
    setMarkers([
      new naver.maps.Marker({
        position: new naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: mapRef.current,
      }),
    ]);

    if (mapRef.current) {
      naver.maps.Event.once(mapRef.current, "init", function () {
        let blank = new naver.maps.CustomControl(blankHtml, {
          position: naver.maps.Position.LEFT_BOTTOM,
        });

        blank.setMap(mapRef.current);

        let customControl = new naver.maps.CustomControl(locationBtnHtml, {
          position: naver.maps.Position.LEFT_BOTTOM,
        });
        customControl.setMap(mapRef.current);
        naver.maps.Event.addDOMListener(customControl.getElement(), "click", function () {
          mapRef.current.setCenter(
            new naver.maps.LatLng(position.coords.latitude, position.coords.longitude)
          );
        });
      });
    }
  }

  useEffect(() => {
    if (markers[0]) {
      const marker = markers[0];
      const latLng = convertLatlng(currentLocation);
      marker.setPosition(latLng);
    }

    if (searchedPlace) {
      const tm128 = new naver.maps.Point(searchedPlace.mapX, searchedPlace.mapY);
      const { x, y } = naver.maps.TransCoord.fromTM128ToLatLng(tm128);

      if ((x !== markers[1]?.position.x && y !== markers[1]?.position.y) || !markers[1]) {
        console.log(markers);

        const searchedPlaceLocation = new naver.maps.Marker({
          position: new naver.maps.LatLng({ lat: y, lng: x }),
          map: mapRef.current,
        });

        const center = new naver.maps.LatLng({ lat: y, lng: x });

        mapRef.current?.setCenter(center);

        setMarkers([markers[0], searchedPlaceLocation]);
      }
    }
  }, [currentLocation, searchedPlace]);

  function convertLatlng(location: Partial<GeolocationCoordinates>) {
    const latLng = {
      x: location.longitude,
      y: location.latitude,
      _lat: location.latitude,
      _lng: location.longitude,
    };
    return latLng;
  }

  function updateMarker(positions: any[]) {
    try {
      positions.map((position) => {
        new naver.maps.Marker({
          map: mapRef.current,
          position: new naver.maps.LatLng(position.latitude, position.longitude),
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   const container = document.getElementById("map"); // 지도를 표시할 div

  //   if (searchedPlace) {
  // const tm128 = new naver.maps.Point(searchedPlace.mapX, searchedPlace.mapY);
  // const latlng = naver.maps.TransCoord.fromTM128ToLatLng(tm128);
  // const position = new naver.maps.LatLng(latlng.lat(), latlng.lng());

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

export default Map;
