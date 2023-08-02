import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlaceCard from "./PlaceCard";

const backEndUrl = process.env.REACT_APP_BACKEND_SERVER;

function PlaceRecommend() {
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [userAddress, setUserAddress] = useState<string>();
  const [recommendedPlaces, setRecommendedPlaces] = useState<any[]>([]); // Change 'any' to the appropriate type for restaurant data
  const slickRef = useRef<Slider | null>(null);

  const previous = useCallback(() => slickRef.current?.slickPrev(), []);
  const next = useCallback(() => slickRef.current?.slickNext(), []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      });
    }
  }, []);

  useEffect(() => {
    if (longitude && latitude) {
      getUserAddress();
    }
  }, [longitude, latitude]);

  useEffect(() => {
    if (userAddress) {
      getRecommendedPlaces();
    }
  }, [userAddress]);

  async function getRecommendedPlaces() {
    try {
      const response = await axios.get(
        backEndUrl + `/places/recommended/list/${userAddress}/restaurant`
      );
      if (response.data) {
        console.log(response.data);

        setRecommendedPlaces(response.data); // Assuming the response data is an array of restaurants
      } else {
        console.log("서버정보 불러오기 실패");
      }
    } catch (error) {
      console.error("Error fetching recommended places:", error);
    }
  }

  async function getUserAddress() {
    await naver.maps.Service.reverseGeocode(
      { coords: new naver.maps.LatLng(latitude, longitude) },
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
        <h2 style={{ textAlign: "center" }}>근처 맛집 어때?</h2>
        <DivNext onClick={next}>
          <img src={"/icons/next.png"} alt={"next-arrow"} />
        </DivNext>
      </TopContainer>

      <StyledSlider {...slickSettings} ref={slickRef}>
        {recommendedPlaces.map((restaurant) => (
          <PlaceCard key={restaurant.id} place={restaurant} />
        ))}
      </StyledSlider>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
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
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: space-between; /* 버튼이 양쪽 끝으로 보이도록 수정 */
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
    //슬라이더  컨텐츠
    cursor: pointer;
  }
`;

export default PlaceRecommend;
