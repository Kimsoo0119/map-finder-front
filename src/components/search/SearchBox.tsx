import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/locals");
  };

  return (
    <InputBox>
      <SearchIcon src="icons/navigation/home-inactive.svg" />
      <Input placeholder="장소를 입력해주세요." maxLength={20} onClick={() => handleClick()} />
    </InputBox>
  );
}

export default SearchBox;

const InputBox = styled.div`
  width: 500px;
  height: 50px;
  background-color: #f1f2f3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  align-self: center;
  box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.2);
  @media (max-width: 600px) {
    width: 100%;
    max-width: 560px;
  }
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
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
