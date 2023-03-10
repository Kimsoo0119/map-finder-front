import styled from "@emotion/styled";
import MyLocationMap from "components/MyLocationMap";
import SearchBox from "components/SearchBox";
import { useLocation } from "react-router-dom";

function MapPage() {
  const location = useLocation();

  const placeName = location.state?.title;

  return (
    <Container>
      {placeName ? (
        <Title>{placeName}</Title>
      ) : (
        <SearchBoxContainer>
          <SearchBox />
        </SearchBoxContainer>
      )}
      <MapContainer>
        <MyLocationMap />
      </MapContainer>
    </Container>
  );
}

export default MapPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MapContainer = styled.div`
  z-index: 1;
  flex: 1;
  position: relative;
`;

const SearchBoxContainer = styled.div`
  z-index: 2;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 560px;
  display: flex;
  justify-content: center;

  > * {
    margin: 0 auto;
  }
`;

const Title = styled.div`
  z-index: 2;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  color: #3f3c3c;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh / 13);
  background-color: #ffff;
`;
