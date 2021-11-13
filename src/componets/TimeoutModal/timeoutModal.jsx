import { useState, useEffect, useContext, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router";

const INITIAL_START = 20;
export default function TimeoutModal({
  idleTimeout,
  setIdleTimeout,
  resetInterval,
}) {
  const [show, setShow] = useState(false);
  const [seconds, setSeconds] = useState(INITIAL_START);
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const client = useApolloClient();

  useEffect(() => {
    setShow(idleTimeout);
  }, [idleTimeout, seconds]);

  const handleClose = useCallback(() => {
    setSeconds(INITIAL_START);
    setShow(false);
    setIdleTimeout(false);
    localStorage.clear();
    setUser(null);
    client.clearStore();
    history.push("/login");
  }, [setIdleTimeout, history, client, setUser]);

  useEffect(() => {
    let timer = null;
    if (idleTimeout) {
      timer = setInterval(() => {
        setSeconds((prevState) => prevState - 1);
        if (seconds === 1) {
          handleClose();
        }
      }, 1000);
    } else {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [idleTimeout, handleClose, setSeconds, seconds]);

  const handleReset = () => {
    resetInterval();
    setSeconds(INITIAL_START);
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleReset} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {seconds}Woohoo, you're reading this text in a modal!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReset}>
            Still Working
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
