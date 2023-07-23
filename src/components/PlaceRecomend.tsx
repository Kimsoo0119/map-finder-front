import { useEffect } from "react";

function PlaceRecommend() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      });
    }
  });
  return <h1></h1>;
}

export default PlaceRecommend;
