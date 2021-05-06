import React, { useEffect, useState } from "react";

export default function Stopwatch() {
  // time counts hundredths of a second
  const [time, setTime] = useState(0);

  const incrementTime = () => setTime((prev) => prev + 1);

  useEffect(() => {
    const intervalId = window.setInterval(incrementTime, 10);
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const setDigits = (number, numberOfDigits = 2) =>
    number.toLocaleString("en-US", {
      minimumIntegerDigits: numberOfDigits,
      useGrouping: false,
    });

  const displayTime = () => {
    const ms = Math.floor(time % 100);
    const s = setDigits(Math.floor((time / 100) % 60), 2);
    const m = setDigits(Math.floor((time / (100 * 60)) % 60), 2);
    return m + ":" + s + "." + ms;
  };

  return <div>{displayTime()}</div>;
}
