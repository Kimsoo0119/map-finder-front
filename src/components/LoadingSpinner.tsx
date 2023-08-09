import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const RotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export default function LoadingSpinner() {
  return (
    <Wrapper
      name="loadingSpinner"
      style={{
        width: 30,
        height: 30,
      }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="circle"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="tooth"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </Wrapper>
  );
}

const Wrapper = styled.svg`
  color: #666;
  animation-name: ${RotateAnimation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  .circle {
    opacity: 0.35;
  }
  .tooth {
    opacity: 0.85;
  }
`;
