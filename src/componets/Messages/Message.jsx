import React from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';

const MessageStyled = styled.div`
  border-bottom: 1px solid rgba(222, 226, 230, 0.5);
  overflow: hidden;
  padding: 0.625rem 0;
  position: relative;

  .author {
    color: #8c4bff;
    display: block;
    margin-bottom: 3px;
    margin-top: 3px;
    font-weight: bold;
  }

  .text {
    color: #848c8f;
    display: block;
    font-size: 0.9125rem;
    margin: 0;
    overflow: hidden;
    font-weight: bold;
  }

  .date {
    position: absolute;
    top: 10px;
    right: 5px;
    font-size: 0.8125rem;
    font-weight: bold;
    margin: 0;
    overflow: hidden;
    background: #fd798c;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

export default function Message({ comment }) {
  const {  comment: text, created_at, author: { firstName, lastName, avatarImage: { url } } } = comment;
  const name = `${firstName} ${lastName[0]}`
  return (
    <div>
      <MessageStyled>
        <Avatar src={url} alt={name} />
        <p className="author">{name}</p>
        <p className="text">{text}</p>
        <p className="date">{new Date(created_at).toLocaleDateString()}</p>
      </MessageStyled>
    </div>
  );
}
