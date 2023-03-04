import axios from "axios";
import { SearchResult } from "pages/search";
import { useState, useEffect } from "react";

type Props = {
  results: SearchResult[];
  placeName: string;
  setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
};

function Result({ results, placeName, setResults }: Props) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/places/${placeName}`);
        console.log(data?.result);
        setResults(data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [placeName]);

  return (
    <div>
      {results.map((result) => (
        <div key={result.title}>
          <h2>{result.title}</h2>
          <p>Category: {result.category}</p>
          <p>Address: {result.address}</p>
          <p>Telephone: {result.telephone}</p>
        </div>
      ))}
    </div>
  );
}

export default Result;
