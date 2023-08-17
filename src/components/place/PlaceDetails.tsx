import { PlaceDetail } from "common/interface/place-interface";
import styled from "styled-components";
import PlaceTopSection from "./PlaceTopSection";
import PlaceTab from "./PlaceTab";

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
      <PlaceTopSection placeDetail={placeDetail}></PlaceTopSection>
      <PlaceTab placeDetail={placeDetail}></PlaceTab>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f3f2f2;
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

export default PlaceDetails;
