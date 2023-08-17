import { PlaceDetail } from "common/interface/place-interface";
import styled from "styled-components";

interface PlaceHomeProps {
  placeDetail: PlaceDetail | undefined;
}
function PlaceHome({ placeDetail }: PlaceHomeProps) {
  return (
    <Container>
      <PlaceDetailContainer>
        <img src={"icons/place/location.png"} />
        <PlaceDetailText>
          {placeDetail?.region.administrative_district} {placeDetail?.region.district}{" "}
          {placeDetail?.address}
        </PlaceDetailText>
      </PlaceDetailContainer>

      <PlaceDetailContainer>
        <img src={"icons/place/clock.png"} />
        <PlaceDetailText>
          {placeDetail?.operatingHours ? placeDetail.operatingHours : "운영 시간을 알려주세요!"}
        </PlaceDetailText>
      </PlaceDetailContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ffffff;
`;

const PlaceDetailContainer = styled.div`
  height: 5vh;
  display: flex;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
    margin-right: 7px;
  }
  padding-left: 5px;
  padding-right: 5px;
`;

const PlaceDetailText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  white-space: normal; /* 줄바꿈 설정 */
  font-size: 1rem;
`;

export default PlaceHome;
