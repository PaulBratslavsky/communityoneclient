import { useState, useEffect, useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import { UserContext } from "../context/UserContext"
function idleTimer(timeout, setTimeout, user, setUser, client) {

  if (user === null) {
    localStorage.clear()
    setTimeout(true)
    return null;
  }

  setTimeout(false)
  
  let _interval = null;

  const _expiredTime = parseInt(localStorage.getItem("expiredTime"), 10);

  if (_expiredTime > 0 && _expiredTime < Date.now()) {
    setTimeout(true);
    return;
  } 

  function startInterval() {
    updateExpiredTime()

    _interval = setInterval(() => {
      const expiredTime = parseInt(localStorage.getItem('expiredTime'), 10)

      if (expiredTime < Date.now()) {
        if (setTimeout) {
          setTimeout(true)
          cleanUp()
        }
      }
    }, 1000)
  }

  function updateExpiredTime() {
    localStorage.setItem('expiredTime', Date.now() + timeout * 1000);
  }

  function tracker() {
    window.addEventListener("mousemove", updateExpiredTime)
    window.addEventListener("scroll", updateExpiredTime)
    window.addEventListener("keydown", updateExpiredTime)
  }

  function cleanUp() {
    localStorage.clear()
    clearInterval(_interval)
    client.clearStore();
    setUser(null)
    window.removeEventListener("mousemove", updateExpiredTime)
    window.removeEventListener("scroll", updateExpiredTime)
    window.removeEventListener("keydown", updateExpiredTime)
  }

  tracker()
  startInterval()

  return {
    cleanUp,
  }
}

export default function useTimeout(time) {
  const { user, setUser } = useContext(UserContext);
  const client = useApolloClient();
  const [timeout, setTimeout] = useState(true);

  useEffect(() => {
    const timer = idleTimer(time, setTimeout, user, setUser, client);
    return () => timer?.cleanUp();

  }, [time, user, setUser]);

  console.log(timeout, "WHAT IS THIS")
  return {
    timeout,
  };
}
