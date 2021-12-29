import React from 'react'
import styled from 'styled-components'
import Message from './Message';
const MessagesStyled = styled.div`
  flex: auto;
  overflow-x: scroll;
  margin-bottom: 10px;
`;

export default function Messages({ comments }) {
  return (
    <MessagesStyled>
      {comments.map((comment) => (
        <Message key={comment.id} comment={comment} />
      )).reverse().slice(-10)}
    </MessagesStyled>
  );
}
