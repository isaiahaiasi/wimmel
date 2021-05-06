import React, { useEffect, useState } from "react";
import displayTime from "../logic/display-time";

export default function Stopwatch() {
  // time counts hundredths of a second
  const [time, setTime] = useState(0);

  const incrementTime = () => setTime((prev) => prev + 10);

  useEffect(() => {
    const intervalId = window.setInterval(incrementTime, 10);
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return <div>{displayTime(time)}</div>;
}
