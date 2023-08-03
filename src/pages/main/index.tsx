import styled from "@emotion/styled";
import { PlaceCoordinates } from "common/interface/place-interface";
import PlaceRecommend from "components/PlaceRecommend";
import { KakaoSignIn } from "components/kakao/KakaoSignIn";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const [userCoordinates, setUserCoordinates] = useState<PlaceCoordinates>({
    latitude: 0,
    longitude: 0,
  });
  const handleClick = () => {
    navigate("/locals");
  };
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
      <MainTopBar>
        <SearchIcon
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlPSIjQzVDNUM1IiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSI2LjYxMSIgY3k9IjYuNjExIiByPSI1Ljg2MSIvPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTE1LjI1IDE1LjI1bC00LjI0My00LjI0MyIvPjwvZz48L3N2Zz4=
"
          onClick={() => handleClick()}
        />
        <KakaoSignIn></KakaoSignIn>
      </MainTopBar>

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
  justify-content: center;
  align-items: center;
`;

const MainTopBar = styled.div`
  padding-right: 2vh;
  padding-left: 2vh;
  z-index: 1;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 560px;
  position: relative;
`;

const MainBody = styled.div`
  padding-right: 2vh;
  padding-left: 2vh;
  z-index: 1;
  flex: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 560px;
  position: relative;
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;
export default MainPage;
