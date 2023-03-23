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

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}

export default Map;
