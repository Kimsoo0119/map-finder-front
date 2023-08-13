import LocationSearchBox from "components/LocationSearchBox";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Result from "components/SearchResult";
import { PlaceCoordinates } from "common/interface/place-interface";

export interface SearchResult {
  title: string;
  category: string;
  address: string;
  telephone: string;
}

function LocalSearchPage() {
  const [placeName, setPlaceName] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isInit, setIsInit] = useState<Boolean>(false);
  const [userCoordinates, setUserCoordinates] = useState<PlaceCoordinates>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <Container>
      <SearchBoxContainer id="search">
        <LocationSearchBox
          placeName={placeName}
          setPlaceName={setPlaceName}
          setResults={setResults}
          setIsInit={setIsInit}
          userCoordinates={userCoordinates}
        />
      </SearchBoxContainer>

      <SearchResultContainer>
        <Result
          results={results}
          placeName={placeName}
          setResults={setResults}
          isInit={isInit}
          setIsInit={setIsInit}
        />
      </SearchResultContainer>
    </Container>
  );
}

export default LocalSearchPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SearchResultContainer = styled.div`
  margin-top: 10px;
  flex: 9;
`;

const SearchBoxContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  button {
    margin-right: 10px; /* 버튼과 검색박스 사이 간격 추가 */
  }
`;
