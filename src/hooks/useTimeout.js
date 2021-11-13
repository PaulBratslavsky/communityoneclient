import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

function idleTimer(timeout, setIdleTimeout, user) {
  if (user === null) {
    localStorage.clear();
    setIdleTimeout(false);
    return null;
  }

  setIdleTimeout(false);

  let _interval = null;

  const _expiredTime = parseInt(localStorage.getItem("expiredTime"), 10);

  if (_expiredTime > 0 && _expiredTime < Date.now()) {
    setIdleTimeout(true);
    return;
  }

  function startInterval() {
    updateExpiredTime();

    _interval = setInterval(() => {
      const expiredTime = parseInt(localStorage.getItem("expiredTime"), 10);

      if (expiredTime < Date.now()) {
        if (setIdleTimeout) {
          setIdleTimeout(true);
          cleanUp();
        }
      }
    }, 1000);
  }

  function updateExpiredTime() {
    localStorage.setItem("expiredTime", Date.now() + timeout * 1000);
  }

  function tracker() {
    window.addEventListener("mousemove", updateExpiredTime);
    window.addEventListener("scroll", updateExpiredTime);
    window.addEventListener("keydown", updateExpiredTime);
  }

  function resetInterval() {
    setIdleTimeout(false);
    tracker();
    startInterval();
  }

  function cleanUp() {
    localStorage.removeItem("expiredTime");
    clearInterval(_interval);
    window.removeEventListener("mousemove", updateExpiredTime);
    window.removeEventListener("scroll", updateExpiredTime);
    window.removeEventListener("keydown", updateExpiredTime);
  }

  tracker();
  startInterval();

  return {
    cleanUp,
    resetInterval,
  };
}

export default function useTimeout(time) {
  const { user } = useContext(UserContext);
  const [idleTimeout, setIdleTimeout] = useState(false);
  const [timerFunc, setTimerFunc] = useState(null);

  useEffect(() => {
    const timer = idleTimer(time, setIdleTimeout, user);
    setTimerFunc(timer);
    return () => timer?.cleanUp();
  }, [time, user]);

  return {
    idleTimeout,
    setIdleTimeout,
    resetInterval: timerFunc?.resetInterval,
  };
}
