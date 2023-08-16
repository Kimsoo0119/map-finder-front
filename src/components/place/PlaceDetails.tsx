import { useEffect, useState } from "react";
import { SearchedPlaceProps } from "./SearchedPlaceCard";
import axios from "axios";
import { PlaceDetail, SearchedPlace } from "common/interface/place-interface";
import styled from "styled-components";
import PlaceTopSection from "./PlaceTopSection";

interface PlaceDetailsProps {
  setFirstHeight: React.Dispatch<React.SetStateAction<number>>;
  setShowSearchPlaceCard: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPlaceDetails: React.Dispatch<React.SetStateAction<boolean>>;
  resizableRef: React.MutableRefObject<HTMLElement | null | undefined>;
  placeDetail: PlaceDetail | undefined;
  defaultHeight: string;
}

function PlaceDetails({
  setFirstHeight,
  setShowSearchPlaceCard,
  setShowPlaceDetails,
  resizableRef,
  placeDetail,
  defaultHeight,
}: PlaceDetailsProps) {
  function handleDown() {
    const titleContainer = document.getElementById("title")?.style;
    const placeContainer = document.getElementById("place")?.style;

    titleContainer?.setProperty("display", "");
    placeContainer?.setProperty("border-radius", " 13px 13px 0 0");

    if (resizableRef.current) {
      resizableRef.current.style.height = defaultHeight;
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
      <MainImage src={placeDetail?.thum_url}></MainImage>
      {placeDetail && (
        <PlaceMain id="placeMain">
          <PlaceTopSection placeDetail={placeDetail}></PlaceTopSection>

          {/* <DetailContainer>
            <ImageIcon src="/icons/place/location.png" />
            <h4>
              {placeDetail.region.administrative_district} {placeDetail.region.district}{" "}
              {placeDetail.address}
            </h4>
          </DetailContainer> */}
        </PlaceMain>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Banner = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 100%;
  height: 4vh;
`;

const DownButton = styled.img`
  border: none;
  background: inherit;
  cursor: pointer;
  width: 25px;
  height: 25px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const MainImage = styled.img`
  width: 100vw;
  height: 30vh;
`;

const PlaceMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 20px;
`;

const Title = styled.h2`
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 타이틀을 1줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  margin-bottom: 5px;
`;

const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ImageIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 4px;
`;

const CategoryText = styled.h4`
  color: #666;
  margin-left: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const StarContainer = styled.div`
  display: flex;
`;

export default PlaceDetails;
