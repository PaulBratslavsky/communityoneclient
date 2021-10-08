import React, { useContext } from 'react';
import Messages from '../Messages/Messages';
import MessageForm from '../Messages/MessageForm';
import { UserContext } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const tempImage =
  'https://coderthemes.com/ubold/layouts/assets/images/users/user-2.jpg';

const data = [
  {
    id: 1,
    userName: 'Paul',
    userAvatar: tempImage,
    date: 'Wed Oct 06 2021',
    text: "Hey, what's up.  Portfolio looks great!",
  },
  {
    id: 2,
    userName: 'Bob',
    userAvatar: tempImage,
    date: 'Wed Oct 06 2021',
    text: 'Wow, thanks!',
  },
  {
    id: 3,
    userName: 'Jena',
    userAvatar: tempImage,
    date: 'Wed Oct 06 2021',
    text: 'Yeah, you are doing great!',
  },
  {
    id: 4,
    userName: 'Paul',
    userAvatar: tempImage,
    date: 'Wed Oct 06 2021',
    text: "Hey, what's up.  Portfolio looks great!",
  },
  {
    id: 5,
    userName: 'Bob',
    userAvatar: tempImage,
    date: 'Wed Oct 06 2021',
    text: 'Wow, thanks!',
  },
  {
    id: 6,
    userName: 'Jena',
    userAvatar: tempImage,
    date: 'Wed Oct 06 2021',
    text: 'Yeah, you are doing great!',
  },
];

export default function MessageCard() {
  const { user } = useContext(UserContext);
  const history = useHistory()
  function sendMessage() {}
  return (
    <div className="message-area bg-white shadow text-white rounded mb-3 p-3">
      <h3 className="text-dark">Lattest Comments</h3>
      <Messages messages={data} />
      {user ? (
        <MessageForm callback={sendMessage} />
      ) : (
        <div className="d-grid gap-2">
          <Button onClick={() => history.push('/login')} variant="primary" size="sm">
            Login
          </Button>
        </div>
      )}
    </div>
  );
}
