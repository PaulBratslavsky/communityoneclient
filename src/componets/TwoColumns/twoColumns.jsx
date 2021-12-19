import React from "react";
import styled from "styled-components";

const TwoColumnsStyled = styled.div`
  height: 100vh;
  background: ${({ background }) => (background ? background : "whtie")};
  color: ${({ color }) => (color ? color : "black")};
  display: grid;
  grid-template-columns: ${({ left, right }) =>
    left && right ? `${left} ${right}` : "1fr 3fr"};
  grid-gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default function TwoColumns({
  children,
  color,
  background,
  leftSize,
  rightSize,
}) {
  const [left, right] = children;
  return (
    <TwoColumnsStyled
      color={color}
      background={background}
      left={leftSize}
      right={rightSize}
    >
      <div>{left}</div>
      <div>{right}</div>
    </TwoColumnsStyled>
  );
}
