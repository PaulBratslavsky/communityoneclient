import React from 'react';
import styled from 'styled-components';

const MessageFormStyled = styled.div`
  margin-top: 1rem;
  .input-group {
    display: flex;
    flex-wrap: nowrap;

    input {
      display: block;
      width: 100%;
      padding: 0.45rem 0.9rem;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      color: #6c757d;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: 0.2rem;
    }

    button {
      display: block;
      width: 100%;
      padding: 0.45rem 0.9rem;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      color: #fff;
      background-color: #8c4bff;
      border-radius: 0.2rem;

      border: none;
      width: 140px;
      margin-left: 8px;
    }

    button:disabled,
    button[disabled] {
      background-color: #EBEBEB;
      color: #666666;
    }
  }
`;

export default function MessageForm({ callback }) {
  
  const [message, setMessage] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (message) {
      callback(message);
      setMessage('');
    }
  }

  console.log(message, "heello")

  return (
    <MessageFormStyled>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            id="message"
            name="message"
            type="text"
            placeholder="Leave comment"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" disabled={!message}>
            Send
          </button>
        </div>
      </form>
    </MessageFormStyled>
  );
}
