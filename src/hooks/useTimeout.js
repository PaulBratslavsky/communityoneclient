import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

function idleTimer(timeout, setTimeout, user) {
  if (user === null) {
    localStorage.clear();
    setTimeout(false);
    return null;
  }

  setTimeout(false);

  let _interval = null;

  const _expiredTime = parseInt(localStorage.getItem('expiredTime'), 10);

  if (_expiredTime > 0 && _expiredTime < Date.now()) {
    setTimeout(true);
    return;
  }

  function startInterval() {
    updateExpiredTime();

    _interval = setInterval(() => {
      const expiredTime = parseInt(localStorage.getItem('expiredTime'), 10);

      if (expiredTime < Date.now()) {
        if (setTimeout) {
          setTimeout(true);
          cleanUp();
        }
      }
    }, 1000);
  }

  function updateExpiredTime() {
    localStorage.setItem('expiredTime', Date.now() + timeout * 1000);
  }

  function tracker() {
    window.addEventListener('mousemove', updateExpiredTime);
    window.addEventListener('scroll', updateExpiredTime);
    window.addEventListener('keydown', updateExpiredTime);
  }
  
  function resetInterval() {
    setTimeout(false);
    tracker();
    startInterval();
  }

  function cleanUp() {
    localStorage.removeItem('expiredTime');
    clearInterval(_interval);
    window.removeEventListener('mousemove', updateExpiredTime);
    window.removeEventListener('scroll', updateExpiredTime);
    window.removeEventListener('keydown', updateExpiredTime);
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
  const [timeout, setTimeout] = useState(false);
  const [timerFunc, setTimerFunc] = useState(null);

  useEffect(() => {
    const timer = idleTimer(time, setTimeout, user);
    setTimerFunc(timer);
    return () => timer?.cleanUp();
  }, [time, user]);

  return {
    timeout,
    setTimeout,
    resetInterval: timerFunc?.resetInterval,
  };
}
