import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { UserContext } from '../../context/UserContext';
import { useApolloClient } from '@apollo/client';
import UserAvatar from '../UserAvatar/userAvatar';
import { useHistory } from 'react-router';

export default function TopNavigation() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory()
  const client = useApolloClient();

  function handleLogout() {
    localStorage.clear();
    setUser(null);
    client.clearStore();
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/" exact>
          <Navbar.Brand>Dev Hunt</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer to="/" exact>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/blog" exact>
            <Nav.Link>Blog</Nav.Link>
          </LinkContainer>
          {!user && (
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
        {user && (
          <div className="d-flex">
            <LinkContainer to="/dashboard">
              <UserAvatar size={30} />
            </LinkContainer>
            <Button  variant="primary" size="sm" className="me-2" onClick={() => history.push('/dashboard')}> 
              Dashboard
            </Button>

            <Button  variant="secondary" size="sm"  onClick={handleLogout}> 
              Logout
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
}
