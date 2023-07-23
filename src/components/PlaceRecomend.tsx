import { useEffect, useState } from "react";

function PlaceRecommend() {
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [userAddress, setUserAddress] = useState<naver.maps.Service.ReverseGeocodeAddress>();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      });
    }
  });

  useEffect(() => {
    getUserAddress();
  }, [longitude, latitude]);

  useEffect(() => {
    console.log(userAddress);
  }, [userAddress]);

  async function getUserAddress() {
    await naver.maps.Service.reverseGeocode(
      { coords: new naver.maps.LatLng(latitude, longitude) },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          return alert("Something wrong!");
        }
        const result = response.v2; // 검색 결과의 컨테이너
        setUserAddress(result.address);
      }
    );
  }

  return <h1></h1>;
}

export default PlaceRecommend;
