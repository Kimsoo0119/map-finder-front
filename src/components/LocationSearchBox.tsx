import styled from "@emotion/styled";
import { SearchResult } from "pages/search";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // useHistory import

interface SearchProps {
  placeName: string;
  setPlaceName: React.Dispatch<React.SetStateAction<string>>;
  setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  setIsInit: React.Dispatch<React.SetStateAction<Boolean>>;
}
function LocationSearchBox({ placeName, setPlaceName, setResults, setIsInit }: SearchProps) {
  const navigate = useNavigate(); // useHistory 초기화
  const [searchTearm, setSearchTearm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGoBack = () => {
    navigate("/"); // 브라우저의 이전 페이지로 이동
  };

  function handleInit() {
    setSearchTearm("");
    setResults([]);
    setIsInit(true);
    inputRef.current?.focus();
  }
  return (
    <InputBox>
      <SearchIcon src="/icons/arrow-back-8.svg" onClick={handleGoBack}></SearchIcon>

      <Input
        placeholder="장소를 입력해주세요."
        maxLength={20}
        value={searchTearm}
        onChange={({ target: { value } }) => setSearchTearm(value)}
        onKeyDown={({ key }) => {
          if (key === "Enter" && searchTearm !== placeName) {
            setPlaceName(searchTearm);
          }
        }}
        ref={inputRef}
        autoFocus
      />
      {searchTearm && (
        <SearchIcon
          id="delete"
          hover
          onClick={() => handleInit()}
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPgogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMykiPgogICAgICAgICAgICA8Y2lyY2xlIGZpbGw9IiNDNUM1QzUiIGN4PSI5IiBjeT0iOSIgcj0iOSIvPgogICAgICAgICAgICA8cGF0aCBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Im02IDYgNi4wMDUgNi4wMDZNMTIuMDA1IDYgNiAxMi4wMDYiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=
"
        />
      )}
    </InputBox>
  );
}

export default LocationSearchBox;

const InputBox = styled.div`
  width: 500px;
  height: 50px;
  background-color: #f1f2f3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  align-self: center;
  @media (max-width: 600px) {
    width: 100%;
    max-width: 560px;
  }
`;

const SearchIcon = styled.img<{ hover?: boolean }>`
  width: 25px;
  height: 25px;
  cursor: ${({ hover }) => (hover ? "pointer" : "default")};
`;

const Input = styled.input`
  margin: 0 10px;
  background-color: #f1f2f3;
  font-size: 0.875rem;
  border: none;
  width: 100%;
  height: 100%;
  color: #333;

  outline: none;
  ::placeholder {
    color: #999;
    font-size: 0.875rem;
  }
`;
