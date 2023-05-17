import { useEffect, useState } from "react";
import { SearchedPlaceProps } from "./PlaceBox";
import { SearchedPlace } from "pages/main";
import axios from "axios";
import { PlaceDetail } from "common/interface/interface";
import styled from "styled-components";

interface PlaceDetailsProps extends SearchedPlaceProps {
  setFirstHeight: React.Dispatch<React.SetStateAction<number>>;
  setShowSearchPlaceCard: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPlaceDetails: React.Dispatch<React.SetStateAction<boolean>>;
  resizableRef: React.MutableRefObject<HTMLElement | null | undefined>;
  setPlaceDetail: React.Dispatch<React.SetStateAction<PlaceDetail | undefined>>;
  placeDetail: PlaceDetail | undefined;
}

function PlaceDetails({
  searchedPlace,
  setFirstHeight,
  setShowSearchPlaceCard,
  setShowPlaceDetails,
  resizableRef,
  setPlaceDetail,
  placeDetail,
}: PlaceDetailsProps) {
  async function fetchPlaceData() {
    try {
      if (searchedPlace) {
        const { address, category, title, telephone }: SearchedPlace = searchedPlace;
        const { data } = await axios.get(process.env.REACT_APP_BACKEND_SERVER + "/places", {
          params: { address, category, title, telephone },
        });
        if (data) {
          setPlaceDetail(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPlaceData();
  }, [searchedPlace]);

  // useEffect(() => {
  //   console.log(":", placeDetail);
  // }, [placeDetail]);
  // placeDetail;

  function handleDown() {
    const titleContainer = document.getElementById("title")?.style;
    const placeContainer = document.getElementById("place")?.style;

    titleContainer?.setProperty("display", "");
    placeContainer?.setProperty("border-radius", " 13px 13px 0 0");

    if (resizableRef.current) {
      resizableRef.current.style.height = "20vh";
    }

    setFirstHeight(0);
    setShowSearchPlaceCard(false);
    setShowPlaceDetails(true);
  }

  return (
    <Container id="placeDetailsContainer">
      <Banner>
        <DownButton src="/icons/arrow-down.svg" onClick={handleDown} />
      </Banner>
      <PlaceMain>
        {searchedPlace && <h1>{searchedPlace.title}</h1>}
        {placeDetail && (
          <h4>
            별점{placeDetail.naverStars} ({placeDetail.naverReviewerCounts})
          </h4>
        )}
      </PlaceMain>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const PlaceMain = styled.div``;
const Banner = styled.div`
  padding-right: 1vh;
  padding-left: 1vh;
  padding-top: 1vh;

  width: 100%
  height: 8vh;
`;

const DownButton = styled.img`
  border: none;
  background: inherit;
  cursor: pointer;
  width: 25px; /* div의 원하는 크기를 설정 */
  height: 25px;
  svg {
    width: 100%;
    height: 100%;
  }
  margin-right: 10px;
`;

export default PlaceDetails;
