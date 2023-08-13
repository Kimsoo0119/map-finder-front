import styled from "@emotion/styled";
import { PlaceCoordinates } from "common/interface/place-interface";
import { SearchResult } from "pages/search";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // useHistory import

interface SearchProps {
  placeName: string;
  setPlaceName: React.Dispatch<React.SetStateAction<string>>;
  setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  setIsInit: React.Dispatch<React.SetStateAction<Boolean>>;
  userCoordinates: PlaceCoordinates;
}

function LocationSearchBox({
  placeName,
  setPlaceName,
  setResults,
  setIsInit,
  userCoordinates,
}: SearchProps) {
  const navigate = useNavigate(); // useHistory 초기화
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [userAddress, setUserAddress] = useState<string>();

  const handleGoBack = () => {
    navigate("/"); // 브라우저의 이전 페이지로 이동
  };
  useEffect(() => {
    if (userCoordinates) {
      getUserAddress();
    }
  }, [userCoordinates]);

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

  function handleInit() {
    setSearchTerm("");
    setResults([]);
    setIsInit(true);
    inputRef.current?.focus();
  }

  function handleSearch() {
    let finalSearchTerm = searchTerm;
    if (selectedCategory === "Around") {
      console.log(userAddress);

      finalSearchTerm = `${userAddress} ${searchTerm}`;
    }

    if (finalSearchTerm !== placeName) {
      setPlaceName(finalSearchTerm);
    }
  }

  function handlePopoverToggle() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
    setIsPopoverOpen(false);
  }

  function handleContainerClick() {
    if (isPopoverOpen) {
      setIsPopoverOpen(false);
    }
  }

  return (
    <Container onClick={handleContainerClick}>
      <InputBox>
        <SearchIcon src="/icons/arrow-back-8.svg" onClick={handleGoBack}></SearchIcon>

        <Input
          placeholder="장소를 입력해주세요."
          maxLength={20}
          value={searchTerm}
          onChange={({ target: { value } }) => setSearchTerm(value)}
          onKeyDown={({ key }) => {
            if (key === "Enter" && searchTerm !== placeName) {
              handleSearch();
            }
          }}
          ref={inputRef}
          autoFocus
        />
        {searchTerm && (
          <SearchIcon
            id="delete"
            hover
            onClick={() => handleInit()}
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPgogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMykiPgogICAgICAgICAgICA8Y2lyY2xlIGZpbGw9IiNDNUM1QzUiIGN4PSI5IiBjeT0iOSIgcj0iOSIvPgogICAgICAgICAgICA8cGF0aCBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Im02IDYgNi4wMDUgNi4wMDZNMTIuMDA1IDYgNiAxMi4wMDYiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=
"
          />
        )}
      </InputBox>
      <PopoverWrapper>
        <PopoverButton onClick={handlePopoverToggle}>
          {selectedCategory === "All" ? "전체 검색" : "주변 검색"}
          <PopoverButtonIcon src="/icons/down.png" />
        </PopoverButton>
        {isPopoverOpen && (
          <PopoverContent>
            <PopoverOption onClick={() => handleCategoryChange("All")}>전체 검색</PopoverOption>
            <PopoverOption onClick={() => handleCategoryChange("Around")}>주변 검색</PopoverOption>
          </PopoverContent>
        )}
      </PopoverWrapper>
    </Container>
  );
}

const PopoverButtonIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const PopoverWrapper = styled.div`
  z-index: 2;
  width: 90vw;
  position: relative;
  margin: 5px 0 5px;
`;
const PopoverButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  font-size: 0.8rem;
  padding: 5px 20px;
  cursor: pointer;
  outline: none;
`;

const PopoverContent = styled.div`
  position: absolute;
  top: 100%;
  left: 15px;
  background-color: #fff;
  border-radius: 8px;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const PopoverOption = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f2f3;
  }
`;

const InputBox = styled.div`
  margin-top: 10px;
  width: 90vw;
  height: 6vh;
  background-color: #f1f2f3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  align-self: center;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  border-bottom: 1px solid #ccc;
`;

export default LocationSearchBox;
