import styled from "styled-components";

const GlobalStyle = styled.div`
  * {
    box-sizing: border-box;
  }
  /* 화면 너비가 480px 이하일 때 */
  @media (max-width: 480px) {
    font-size: 16px;
  }

  /* 화면 너비가 768px 이하일 때 */
  @media (max-width: 768px) {
    font-size: 20px;
  }

  /* 화면 너비가 1024px 이하일 때 */
  @media (max-width: 1024px) {
    font-size: 24px;
  }
`;

export default GlobalStyle;
