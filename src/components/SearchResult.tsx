import axios from "axios";
import { SearchResult } from "pages/search";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  results: SearchResult[];
  placeName: string;
  setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
}

function Result({ results, placeName, setResults }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasResult, setHasResult] = useState<boolean>(true);

  useEffect(() => {
    if (placeName) {
      fetchData();
    }
  }, [placeName, setResults]);

  async function fetchData() {
    try {
      setResults([]);
      setLoading(true);
      setHasResult(true);

      const { data } = await axios.get(`http://localhost:5000/places/${placeName}`);
      setLoading(false);
      if (data.result.length === 0) {
        setHasResult(false);
        setResults([]);
      } else {
        setHasResult(true);
        setResults(data.result);
      }
    } catch (error) {
      setLoading(false);
      setResults([]);
      setHasResult(false);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!hasResult) {
    return <CenteredParagraph>{placeName}에 대한 검색 결과가 없습니다.</CenteredParagraph>;
  }

  return (
    <ResultWrapper>
      {results.map((result) => (
        <LinkWrapper key={result.title}>
          <Link to={`/`} state={result}>
            <div>
              <h2>{result.title}</h2>
              <p>Category: {result.category}</p>
              <p>Address: {result.address}</p>
              <p>Telephone: {result.telephone}</p>
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
  }
`;

const CenteredParagraph = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #666;
`;
