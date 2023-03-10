import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/locals");
  };

  return (
    <InputBox>
      <SearchIcon
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlPSIjQzVDNUM1IiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSI2LjYxMSIgY3k9IjYuNjExIiByPSI1Ljg2MSIvPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTE1LjI1IDE1LjI1bC00LjI0My00LjI0MyIvPjwvZz48L3N2Zz4=
"
      />
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

const SearchIcon = styled.img<{ hover?: boolean }>`
  width: 20px;
  height: 20px;
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
