import { Resizable } from "re-resizable";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PlaceDetails from "./PlaceDetails";
import { PlaceDetail, SearchedPlace } from "common/interface/place-interface";
import LoadingSpinner from "./LoadingSpinner";

export interface SearchedPlaceProps {
  placeDetail: PlaceDetail | undefined;
}

function SearchedPlaceCard({ placeDetail }: SearchedPlaceProps) {
  const [firstHeight, setFirstHeight] = useState<number>(0);
  const [showSearchPlaceCard, setShowSearchPlaceCard] = useState<boolean>(false);
  const [showPlaceDetails, setShowPlaceDetails] = useState<boolean>(true);
  const resizableRef = useRef<HTMLElement | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const defaultHeight = "23vh";
  useEffect(() => {
    if (placeDetail) {
      setLoading(false);
    }
  }, [placeDetail]);
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

  function handleResize(ref: HTMLElement) {
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
        handleResize(ref);
      }}
    >
      <PlaceCardContainer id="placeCard" hidden={showSearchPlaceCard}>
        <IconWrapper>
          <img width={"30"} src="/icons/dash.svg" alt="Collapse icon" />
        </IconWrapper>
        {loading ? (
          <LoadingSpinnerContainer>
            <LoadingSpinner />
          </LoadingSpinnerContainer>
        ) : (
          <PlaceCard>
            <ThumbnailContainer>
              <ThumbnailImage src={placeDetail?.thum_url} alt="Place thumbnail" />
            </ThumbnailContainer>
            <PlaceInfoContainer>
              <Category>
                {placeDetail?.place_category.main}
                {" > "}
                {placeDetail?.place_category.sub}
              </Category>
              <Title>{placeDetail?.title}</Title>
              <Address>
                {placeDetail?.region.administrative_district} {placeDetail?.region.district}{" "}
                {placeDetail?.address}
              </Address>
            </PlaceInfoContainer>
          </PlaceCard>
        )}
      </PlaceCardContainer>
      <PlaceDetailsContainer hidden={showPlaceDetails}>
        <PlaceDetails
          setFirstHeight={setFirstHeight}
          setShowSearchPlaceCard={setShowSearchPlaceCard}
          setShowPlaceDetails={setShowPlaceDetails}
          resizableRef={resizableRef}
          placeDetail={placeDetail}
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

const PlaceCard = styled.div`
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
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 타이틀을 1줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const Category = styled.h3`
  font-size: 0.75rem;
  color: gray;
`;

const Address = styled.h5`
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 타이틀을 2줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.8rem;
  color: gray;
`;

const LoadingSpinnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default SearchedPlaceCard;
