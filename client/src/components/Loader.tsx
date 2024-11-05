// SquarePulseLoader.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const primaryColor = '#51a1e3';

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const LoaderContainer = styled.div`
  height: 80svh;
  display: grid;
  place-items: center;
`;

const SquaresContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Square = styled.div<{ delay: string }>`
  width: 16px;
  height: 16px;
  background-color: ${primaryColor};
  animation: ${pulse} 1s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};
`;

// Loader component
const SquarePulseLoader: React.FC = () => (
  <LoaderContainer>
    <SquaresContainer>
      <Square delay="0s" />
      <Square delay="0.2s" />
      <Square delay="0.4s" />
    </SquaresContainer>
  </LoaderContainer>
);

export default SquarePulseLoader;
