import { useState, useEffect, useContext, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const INITIAL_START = 20;
export default function TimeoutModal({
  idleTimeout,
  setIdleTimeout,
  resetInterval,
}) {
  const [show, setShow] = useState(false);
  const [seconds, setSeconds] = useState(INITIAL_START);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
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
    navigate("/login");
  }, [setIdleTimeout, navigate, client, setUser]);

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
          <Modal.Title>WARNING</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`You will be logged off in ${seconds} seconds!`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Log off 
          </Button>
          <Button variant="primary" onClick={handleReset}>
            Still Working
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
