import styled from "@emotion/styled";
import axios from "axios";
import { PlaceDetail, SearchedPlace } from "common/interface/place-interface";
import Map from "components/place/Map";
import SearchedPlaceCard from "components/place/SearchedPlaceCard";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const backEndUrl = process.env.REACT_APP_BACKEND_SERVER;

function PlacePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const placeName = location.state?.title;
  const [placeDetail, setPlaceDetail] = useState<PlaceDetail>();
  useEffect(() => {
    fetchPlaceData();
  }, []);

  async function fetchPlaceData() {
    try {
      if (location.state) {
        const { address, category, title }: SearchedPlace = location.state;
        const { data } = await axios.get(backEndUrl + "/places", {
          params: { address, category, title },
        });
        if (data) {
          setPlaceDetail(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handlePrevious() {
    navigate(-1);
  }

  return (
    <Container>
      {placeName && (
        <TopBar>
          <PreButton src="/icons/arrow-back-8.svg" onClick={handlePrevious} />
        </TopBar>
      )}

      {placeName && (
        <Place id="place">
          <SearchedPlaceCard placeDetail={placeDetail} />
        </Place>
      )}
      <MapContainer>
        <Map />
      </MapContainer>
    </Container>
  );
}

export default PlacePage;

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

const TopBar = styled.div`
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
  background-color: transparent;
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
  width: 30px;
  height: 30px;
  svg {
    width: 100%;
    height: 100%;
  }
  margin-right: 10px;
`;

const CancelButton = styled.img`
  width: 25px;
  height: 25px;
`;
