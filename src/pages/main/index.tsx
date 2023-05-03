import styled from "@emotion/styled";
import axios from "axios";
import Map from "components/Map";
import PlaceBox from "components/PlaceBox";
import SearchBox from "components/SearchBox";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface SearchedPlace {
  address: string;
  category: string;
  mapX: string;
  mapY: string;
  telephone: string;
  title: string;
}
function MapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchedPlace, setSearchedPlace] = useState<SearchedPlace>();
  const placeName = location.state?.title;
  const [showSearchBox, setShowSearchBox] = useState(!placeName);
  const [mapInit, setMapInit] = useState<boolean>(false);

  useEffect(() => {
    if (location.state?.title) {
      setSearchedPlace(location.state);
    }
  }, [location.state]);

  useEffect(() => {});

  function handlePrevious() {
    navigate(-1);
  }

  function handleCancel() {
    setMapInit(true);
    setShowSearchBox(true);
  }

  return (
    <Container>
      {placeName && (
        <Title id="title" hidden={showSearchBox}>
          <PreButton src="/icons/arrow-back-8.svg" onClick={handlePrevious} />
          {placeName}
          <CancelButton
            onClick={() => handleCancel()}
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPgogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMykiPgogICAgICAgICAgICA8Y2lyY2xlIGZpbGw9IiNDNUM1QzUiIGN4PSI5IiBjeT0iOSIgcj0iOSIvPgogICAgICAgICAgICA8cGF0aCBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Im02IDYgNi4wMDUgNi4wMDZNMTIuMDA1IDYgNiAxMi4wMDYiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=
"
          />
        </Title>
      )}

      {placeName && (
        <Place id="place" hidden={showSearchBox}>
          <PlaceBox searchedPlace={searchedPlace} />
        </Place>
      )}
      {showSearchBox && (
        <SearchBoxContainer>
          <SearchBox />
        </SearchBoxContainer>
      )}
      <MapContainer>
        <Map mapInit={mapInit} setMapInit={setMapInit} />
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
  height:100vh
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
  bottom: 0 > * {
    margin: 0 auto;
  }
`;

const Title = styled.div<{ hidden: boolean }>`
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
  ${({ hidden }) => (hidden ? "display: none;" : "")}
`;

const Place = styled.div<{ hidden: boolean }>`
  z-index: 3;
  display: flex;
  flex-direction: column;
  border-radius: 13px 13px 0 0;
  align-items: center;

  left: 50%;
  transform: translateX(-50%);

  position: absolute;
  bottom: 0;
  width: 100%;
  max-height: 100vh;

  background-color: #ffff;

  ${({ hidden }) => (hidden ? "display: none;" : "")}
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
