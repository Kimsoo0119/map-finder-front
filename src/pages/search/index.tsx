import LocationSearchBox from "components/LocationSearchBox";
import styled from "styled-components";
import { useState } from "react";
import Result from "components/SearchResult";
import { useNavigate } from "react-router-dom"; // useHistory import

export interface SearchResult {
  title: string;
  category: string;
  address: string;
  telephone: string;
}

function LocalSearchPage() {
  const [placeName, setPlaceName] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate(); // useHistory 초기화

  const handleGoBack = () => {
    navigate(-1); // 브라우저의 이전 페이지로 이동
  };

  return (
    <Container>
      <SearchBoxContainer id="search">
        <PreButton src="/icons/arrow-back-8.svg" onClick={handleGoBack}></PreButton>{" "}
        <LocationSearchBox placeName={placeName} setPlaceName={setPlaceName} />
      </SearchBoxContainer>
      <SearchResultContainer>
        <Result results={results} placeName={placeName} setResults={setResults} />
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

const PreButton = styled.img`
  position: absolute;
  border: none;
  background: inherit;
  cursor: pointer;
  width: 35px; /* div의 원하는 크기를 설정 */
  height: 35px;
  svg {
    width: 100%; /* svg의 width와 height를 100%로 설정 */
    height: 100%;
  }
  left: 10px; /* 검색창 왼쪽으로 10px 이동 */
`;
