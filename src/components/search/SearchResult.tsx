import axios from "axios";
import { SearchResult } from "pages/search";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../LoadingSpinner";

interface Props {
  results: SearchResult[];
  placeName: string;
  setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  isInit: Boolean;
  setIsInit: React.Dispatch<React.SetStateAction<Boolean>>;
}

const backEndUrl = process.env.REACT_APP_BACKEND_SERVER;

function Result({ results, placeName, setResults, isInit, setIsInit }: Props) {
  console.log(placeName);

  const [loading, setLoading] = useState<boolean>(false);
  const [hasResult, setHasResult] = useState<boolean>(true);

  useEffect(() => {
    if (placeName) {
      fetchData();
    }
  }, [placeName, setResults]);

  useEffect(() => {
    if (isInit) {
      initResults();
    }
  }, [isInit]);

  function initResults() {
    setResults([]);
    setLoading(false);
    setHasResult(true);
    setIsInit(false);
  }

  async function fetchData() {
    try {
      setResults([]);
      setLoading(true);
      setHasResult(true);

      const { data: places } = await axios.get(`${backEndUrl}/places/list/${placeName}`);

      setLoading(false);
      if (places.length === 0) {
        setHasResult(false);
        setResults([]);
      } else {
        setHasResult(true);
        setResults(places);
      }
    } catch (error) {
      setResults([]);
      setLoading(false);
      setHasResult(false);
    }
  }

  if (loading) {
    return (
      <LoadingSpinnerContainer>
        <LoadingSpinner />
      </LoadingSpinnerContainer>
    );
  }

  if (!hasResult) {
    return <CenteredParagraph>{placeName}에 대한 검색 결과가 없습니다.</CenteredParagraph>;
  }

  return (
    <ResultWrapper>
      {results.map((result) => (
        <LinkWrapper key={result.title}>
          <Link to={`/place`} state={result}>
            <div>
              <p>{result.category.replace(/>/g, " > ")}</p>
              <h3>
                {result.title}
                {"\n"}
              </h3>
              <p>{result.address}</p>
            </div>
          </Link>
        </LinkWrapper>
      ))}
    </ResultWrapper>
  );
}

export default Result;

const ResultWrapper = styled.div`
  div:not(:last-child) {
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
`;

const LinkWrapper = styled.div`
  a {
    color: #000;
    text-decoration: none;
    margin-bottom: 1px;
  }
  h3 {
    margin-bottom: 3px;
  }
  div {
    margin: 0 10px;
  }
`;

const CenteredParagraph = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #666;
`;

const LoadingSpinnerContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: -10vh;
`;
