import styled from "@emotion/styled";
import MyLocationMap from "components/MyLocationMap";
import SearchBox from "components/SearchBox";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const placeName = location.state?.title;

  const [showSearchBox, setShowSearchBox] = useState(!placeName);

  function handleInit() {
    navigate("/");
    setShowSearchBox(true);
  }

  return (
    <Container>
      {placeName && (
        <Title>
          <PreButton src="/icons/arrow-back-8.svg" onClick={handleInit} />
          {placeName}
        </Title>
      )}
      {showSearchBox && (
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
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.3rem;
  color: #3f3c3c;
  font-weight: bold;
  width: 100%;
  height: calc(100vh / 13);
  background-color: #ffff;
  padding-left: 13px;
`;

const PreButton = styled.img`
  border: none;
  background: inherit;
  cursor: pointer;
  width: 30px; /* div의 원하는 크기를 설정 */
  height: 30px;
  svg {
    width: 100%; /* svg의 width와 height를 100%로 설정 */
    height: 100%;
  }
  margin-right: 10px;
`;
