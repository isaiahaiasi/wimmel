const setDigitLength = (number, numberOfDigits = 2) =>
  number.toLocaleString("en-US", {
    minimumIntegerDigits: numberOfDigits,
    useGrouping: false,
  });

// return a time in milliseconds in the form MM:ss.mm
export default function displayTime(time) {
  const d = new Date(time);
  const m = setDigitLength(d.getMinutes());
  const s = setDigitLength(d.getSeconds());
  const ms = setDigitLength(Math.floor(d.getMilliseconds() / 10));
  return m + ":" + s + "." + ms;
}
