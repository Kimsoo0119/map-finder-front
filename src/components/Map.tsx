import { PlaceCoordinates } from "common/interface/place-interface";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const { naver } = window;

interface LocationProps {
  mapInit: boolean;
  setMapInit: React.Dispatch<React.SetStateAction<boolean>>;
}

function Map() {
  const location = useLocation();
  const searchedPlace = location.state;
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  // var locationBtnHtml = '<img src="/icons/my-location.svg" />';
  // var blankHtml = '<img src="/icons/blank.svg" />';
  const [placeCoordinate, setPlaceCoordinate] = useState<PlaceCoordinates>();
  useEffect(() => {
    initMap();
  }, []);

  function initMap() {
    try {
      const container = document.getElementById("map"); // 지도를 표시할 div
      mapRef.current = new naver.maps.Map(container);

      // if (mapRef.current) {
      //   naver.maps.Event.once(mapRef.current, "init", function () {
      //     let blank = new naver.maps.CustomControl(blankHtml, {
      //       position: naver.maps.Position.LEFT_BOTTOM,
      //     });

      //     blank.setMap(mapRef.current);

      //     let customControl = new naver.maps.CustomControl(locationBtnHtml, {
      //       position: naver.maps.Position.LEFT_BOTTOM,
      //     });
      //     customControl.setMap(mapRef.current);
      //     naver.maps.Event.addDOMListener(customControl.getElement(), "click", function () {
      //       mapRef.current.setCenter(new naver.maps.LatLng(position.latitude, position.longitude));
      //     });
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (searchedPlace?.region) {
      const placeAddress = `${searchedPlace.region.administrative_district} ${searchedPlace.region.district} ${searchedPlace.address}`;
      getSearchedPlaceCoordinate(placeAddress);
    } else if (searchedPlace?.address) {
      const placeAddress = searchedPlace.address;
      getSearchedPlaceCoordinate(placeAddress);
    }
  }, [searchedPlace]);

  useEffect(() => {
    if (placeCoordinate?.latitude && placeCoordinate?.longitude) {
      console.log(placeCoordinate);

      const { latitude: y, longitude: x } = placeCoordinate;

      if ((x !== markers[1]?.position._lng && y !== markers[1]?.position._lat) || !markers[1]) {
        const searchedPlaceLocation = new naver.maps.Marker({
          position: new naver.maps.LatLng({ lat: y, lng: x }),
          map: mapRef.current,
        });

        const center = new naver.maps.LatLng({ lat: y, lng: x });

        mapRef.current?.setCenter(center);

        setMarkers([markers[0], searchedPlaceLocation]);
      }
    }
  }, [placeCoordinate]);

  async function getSearchedPlaceCoordinate(placeAddress: string) {
    await naver.maps.Service.geocode({ query: placeAddress }, (status: any, response: any) => {
      if (status !== naver.maps.Service.Status.OK) {
        return;
      }

      const result = response.v2;
      if (result.addresses[0].x && result.addresses[0].y) {
        setPlaceCoordinate({ longitude: result.addresses[0].x, latitude: result.addresses[0].y });
      }
    });
  }

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}

export default Map;
