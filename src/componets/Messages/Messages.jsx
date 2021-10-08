import React from 'react'
import styled from 'styled-components'
import Message from './Message';
const MessagesStyled = styled.div`
  height: 290px;
  overflow-x: scroll;
  margin-bottom: 10px;
`;

export default function Messages({ messages }) {
  return (
    <MessagesStyled>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      )).reverse().slice(-10)}
    </MessagesStyled>
  );
}
