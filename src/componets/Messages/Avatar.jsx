import React from 'react';
import styled from 'styled-components';

const AvatarStyled = styled.div`
  display: block;
  float: left;
  margin-right: 15px;
  width: 40px;

  img {
    border-radius: 50%;
    width: 100%;
  }
`;

export default function Avatar({ src, alt }) {
  return (
    <AvatarStyled>
      <img src={src} alt={alt} />
    </AvatarStyled>
  );
}
