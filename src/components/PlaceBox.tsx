import axios from "axios";
import { SearchedPlace } from "pages/main";
import { Resizable } from "re-resizable";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PlaceDetails from "./PlaceDetails";

export interface SearchedPlaceProps {
  searchedPlace: SearchedPlace | undefined;
}

function PlaceBox({ searchedPlace }: SearchedPlaceProps) {
  const [firstHeight, setFirstHeight] = useState<number>(0);
  const [showSearchPlaceCard, setShowSearchPlaceCard] = useState<boolean>(false);
  const [showPlaceDetails, setShowPlaceDetails] = useState<boolean>(true);
  const resizableRef = useRef<HTMLElement | null | undefined>(null);

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
      ref.style.height = "20vh";
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
      ref.style.height = "20vh";
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
      defaultSize={{ width: `100%`, height: `20vh` }}
      maxHeight={"100vh"}
      minHeight={"11vh"}
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
          <img width={"40vh"} src="/icons/dash.svg"></img>
        </IconWrapper>
        <SearchedPlaceCard>
          <div style={{ flex: "7" }}>
            <h2>{searchedPlace?.title}</h2>
            <h3 style={{ color: "gray" }}>{searchedPlace?.category}</h3>
            <h5 style={{ color: "gray" }}>{searchedPlace?.address}</h5>
          </div>
          <div style={{ flex: "3", backgroundColor: "gray" }}>사진입니다</div>
        </SearchedPlaceCard>
      </PlaceCardContainer>
      <PlaceDetailsContainer hidden={showPlaceDetails}>
        <PlaceDetails
          searchedPlace={searchedPlace}
          setFirstHeight={setFirstHeight}
          setShowSearchPlaceCard={setShowSearchPlaceCard}
          setShowPlaceDetails={setShowPlaceDetails}
          resizableRef={resizableRef}
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
  height: 17vh;
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

export default PlaceBox;
