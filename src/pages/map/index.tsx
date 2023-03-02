import styled from "@emotion/styled";
import Map from "components/Map";
import SearchBox from "components/SearchBox";
function MapPage() {
  return (
    <Container>
      <SearchBoxContainer>
        <SearchBox />
      </SearchBoxContainer>
      <MapContainer>
        <Map />
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
`;
