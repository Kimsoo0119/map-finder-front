import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlaceCard from "./PlaceCard";
import { PlaceCoordinates } from "common/interface/place-interface";
import LoadingSpinner from "../LoadingSpinner";

const backEndUrl = process.env.REACT_APP_BACKEND_SERVER;

interface PlaceRecommendProps {
  userCoordinates: PlaceCoordinates;
}

function PlaceRecommend({ userCoordinates }: PlaceRecommendProps) {
  const [userAddress, setUserAddress] = useState<string>();
  const [recommendedPlaces, setRecommendedPlaces] = useState<any[]>([]);
  const slickRef = useRef<Slider | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const previous = useCallback(() => slickRef.current?.slickPrev(), []);
  const next = useCallback(() => slickRef.current?.slickNext(), []);

  useEffect(() => {
    if (userCoordinates) {
      getUserAddress();
    }
  }, [userCoordinates]);

  useEffect(() => {
    if (userAddress) {
      getRecommendedPlaces();
    }
  }, [userAddress]);

  async function getRecommendedPlaces() {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get(
        backEndUrl + `/places/recommended/list/${userAddress}/restaurant`
      );
      if (response.data) {
        setRecommendedPlaces(response.data);
      } else {
        console.log("서버정보 불러오기 실패");
      }
    } catch (error) {
      console.error("Error fetching recommended places:", error);
    } finally {
      setLoading(false); // Set loading to false whether the fetch is successful or not.
    }
  }

  async function getUserAddress() {
    await naver.maps.Service.reverseGeocode(
      { coords: new naver.maps.LatLng(userCoordinates.latitude, userCoordinates.longitude) },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          return;
        }

        const result = response.v2;
        if (result.address.jibunAddress) {
          setUserAddress(result.address.jibunAddress);
        } else if (result.address.roadAddress) {
          setUserAddress(result.address.roadAddress);
        }
      }
    );
  }
  const slickSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2, // 화면에 보여질 슬라이드 개수
    slidesToScroll: 1, // 한 번에 스크롤될 슬라이드 개수
    autoplay: false,
    autoplaySpeed: 5000,
    dots: false,
  };

  return (
    <Container id="placeRecommendContainer">
      <TopContainer>
        <DivPre onClick={previous}>
          <img src={"/icons/previous.png"} alt={"previous-arrow"} />
        </DivPre>
        <h3 style={{ textAlign: "center" }}>근처 맛집 어때?</h3>
        <DivNext onClick={next}>
          <img src={"/icons/next.png"} alt={"next-arrow"} />
        </DivNext>
      </TopContainer>

      {loading ? (
        <LoadingSpinnerContainer>
          <LoadingSpinner />
        </LoadingSpinnerContainer>
      ) : recommendedPlaces.length > 0 ? (
        <StyledSlider {...slickSettings} ref={slickRef}>
          {recommendedPlaces.map((restaurant) => (
            <PlaceCard key={restaurant.id} place={restaurant} />
          ))}
        </StyledSlider>
      ) : (
        <NoPlacesMessage>추천 장소가 없습니다.</NoPlacesMessage>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 15px;
  background-color: #ffffff;
  width: 96%;
  border-radius: 10px;
  margin-bottom: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DivPre = styled.div`
  width: 25px;
  height: 25px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const DivNext = styled.div`
  width: 25px;
  height: 25px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 3px;
`;

const StyledSlider = styled(Slider)`
  height: 100%;
  width: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    cursor: pointer;
  }
`;

const LoadingSpinnerContainer = styled.div`
  display: flex;
  height: 25vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const NoPlacesMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vh;
  font-size: 16px;
  color: #666;
`;

export default PlaceRecommend;
