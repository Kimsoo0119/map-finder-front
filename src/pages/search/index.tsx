import LocationSearchBox from "components/LocationSearchBox";
import styled from "styled-components";
import { useState } from "react";
import Result from "components/SearchResult";
export interface SearchResult {
  title: string;
  category: string;
  address: string;
  telephone: string;
}
function LocalSearchPage() {
  const [placeName, setPlaceName] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  return (
    <Container>
      <SearchBoxContainer>
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
  height: 100%;
`;
