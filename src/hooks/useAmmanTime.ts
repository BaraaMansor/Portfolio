import { useEffect, useState } from 'react';

const format = () =>
  new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Amman',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

const ammanHour = () =>
  parseInt(
    new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Asia/Amman',
      hour: '2-digit',
      hour12: false,
    }),
    10
  );

/** Amman local time (HH:MM), refreshed twice a minute, not every second. */
export function useAmmanTime() {
  const [time, setTime] = useState(format);

  useEffect(() => {
    const interval = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export function isAwake() {
  const hour = ammanHour();
  return hour >= 8 && hour < 21;
}
