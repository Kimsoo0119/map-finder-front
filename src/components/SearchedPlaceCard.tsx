import axios from "axios";
import { Resizable } from "re-resizable";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PlaceDetails from "./PlaceDetails";
import { PlaceDetail, SearchedPlace } from "common/interface/place-interface";

export interface SearchedPlaceProps {
  searchedPlace: SearchedPlace | undefined;
}

function PlaceBox({ searchedPlace }: SearchedPlaceProps) {
  const [firstHeight, setFirstHeight] = useState<number>(0);
  const [showSearchPlaceCard, setShowSearchPlaceCard] = useState<boolean>(false);
  const [showPlaceDetails, setShowPlaceDetails] = useState<boolean>(true);
  const resizableRef = useRef<HTMLElement | null | undefined>(null);
  const [placeDetail, setPlaceDetail] = useState<PlaceDetail>();
  const defaultHeight = "23vh";
  function handleResizeStart(elementRef: HTMLElement) {
    const height = parseInt(elementRef.style.height || "0", 10);

    if (height >= 90) {
      setFirstHeight(90);
    }
  }

  function handleResizeStop(ref: HTMLElement) {
    const height = parseInt(ref.style.height || "0", 10);

    const titleContainer = document.getElementById("title")?.style;
    const placeContainer = document.getElementById("place")?.style;

    if (firstHeight === 90 && placeContainer) {
      //전체화면일때
      titleContainer?.setProperty("display", "");
      placeContainer?.setProperty("border-radius", " 13px 13px 0 0");
      ref.style.height = defaultHeight;
      setFirstHeight(0);
      setShowSearchPlaceCard(false);
      setShowPlaceDetails(true);
    } else if (height >= 40 && placeContainer) {
      //화면을 올릴때
      setShowSearchPlaceCard(true);
      setShowPlaceDetails(false);

      titleContainer?.setProperty("display", "none");
      placeContainer?.setProperty("border-radius", " 0 0 0 0");

      ref.style.height = "100vh";
    } else {
      // 살짝 튕길때
      ref.style.height = defaultHeight;
    }
  }

  function handleResize() {
    if (showSearchPlaceCard) {
      setShowSearchPlaceCard(false);
      setShowPlaceDetails(true);
    }
  }

  return (
    <Resizable
      ref={(ref) => {
        resizableRef.current = ref?.resizable;
      }}
      enable={resizableEnable}
      style={style.resizable}
      defaultSize={{ width: `100%`, height: defaultHeight }}
      maxHeight={"100vh"}
      minHeight={"17vh"}
      onResizeStop={(e, direction, ref, d) => {
        handleResizeStop(ref);
      }}
      onResizeStart={(e, direction, ref) => {
        handleResizeStart(ref);
      }}
      onResize={(e, direction, ref, d) => {
        handleResize();
      }}
    >
      <PlaceCardContainer id="placeCard" hidden={showSearchPlaceCard}>
        <IconWrapper>
          <img width={"30"} src="/icons/dash.svg" alt="Collapse icon" />
        </IconWrapper>
        <SearchedPlaceCard>
          <ThumbnailContainer>
            <ThumbnailImage src={placeDetail?.thum_url} alt="Place thumbnail" />
          </ThumbnailContainer>
          <PlaceInfoContainer>
            <Category>
              {searchedPlace?.place_category.main}
              {" > "}
              {searchedPlace?.place_category.sub}
            </Category>
            <Title>{searchedPlace?.title}</Title>
            <Address>
              {searchedPlace?.region.administrative_district}
              {searchedPlace?.region.district}
              {searchedPlace?.address}
            </Address>
          </PlaceInfoContainer>
        </SearchedPlaceCard>
      </PlaceCardContainer>
      <PlaceDetailsContainer hidden={showPlaceDetails}>
        <PlaceDetails
          searchedPlace={searchedPlace}
          setFirstHeight={setFirstHeight}
          setShowSearchPlaceCard={setShowSearchPlaceCard}
          setShowPlaceDetails={setShowPlaceDetails}
          resizableRef={resizableRef}
          placeDetail={placeDetail}
          setPlaceDetail={setPlaceDetail}
          defaultHeight={defaultHeight}
        />
      </PlaceDetailsContainer>
    </Resizable>
  );
}

const style = {
  resizable: {
    display: "flex",
    alignItems: "top",
    justifyContent: "center",
    background: "#0000",
  },
};

const resizableEnable = {
  top: true,
  right: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

const PlaceCardContainer = styled.div<{ hidden: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20vh;
  padding-top: 5vh;
  padding-bottom: 1vh;
  padding-right: 1vh;
  padding-left: 1vh;
  position: relative;
  ${({ hidden }) => (hidden ? "display: none;" : "")};
`;

const PlaceDetailsContainer = styled.div<{ hidden: boolean }>`
  width: 100%;

  position: relative;
  ${({ hidden }) => (hidden ? "display: none;" : "")};
`;

const SearchedPlaceCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
`;

const ThumbnailContainer = styled.div`
  flex: 4;
  padding: 2px;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const PlaceInfoContainer = styled.div`
  flex: 6;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const Category = styled.h3`
  font-size: 0.75rem;
  color: gray;
`;

const Address = styled.h5`
  font-size: 0.8rem;
  color: gray;
`;
export default PlaceBox;
