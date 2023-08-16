import styled from "@emotion/styled";
import { PlaceCoordinates } from "common/interface/place-interface";
import MainTopBar from "components/home/MainTopBar";
import PlaceRecommend from "components/home/PlaceRecommend";
import { useEffect, useState } from "react";

function MainPage() {
  const [userCoordinates, setUserCoordinates] = useState<PlaceCoordinates>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <Container>
      <MainTopBar />
      <PlaceRecommend userCoordinates={userCoordinates} />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #f3f2f2;
  align-items: center;
`;

export default MainPage;
