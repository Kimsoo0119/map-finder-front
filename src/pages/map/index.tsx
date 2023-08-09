import styled from "@emotion/styled";
import axios from "axios";
import { SearchedPlace } from "common/interface/place-interface";
import Map from "components/Map";
import PlaceBox from "components/PlaceBox";
import SearchBox from "components/SearchBox";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchedPlace, setSearchedPlace] = useState<SearchedPlace>();
  const placeName = location.state?.title;

  useEffect(() => {
    if (location.state?.title) {
      setSearchedPlace(location.state);
    }
  }, [location.state]);

  useEffect(() => {});

  function handlePrevious() {
    navigate(-1);
  }

  return (
    <Container>
      {placeName && (
        <Title id="title">
          <PreButton src="/icons/arrow-back-8.svg" onClick={handlePrevious} />
          {placeName}
        </Title>
      )}

      {placeName && (
        <Place id="place">
          <PlaceBox searchedPlace={searchedPlace} />
        </Place>
      )}
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
  width: 100vw;
`;

const MapContainer = styled.div`
  z-index: 1;
  flex: 1;
  height:100vh
  position: relative;
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

const Place = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: column;
  border-radius: 13px 13px 0 0;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  max-height: 100vh;

  background-color: #ffff;
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

const CancelButton = styled.img`
  width: 25px;
  height: 25px;
`;
