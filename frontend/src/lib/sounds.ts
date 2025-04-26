// Small base64 encoded error beep sound for minimal size
const ERROR_BEEP =
  "data:audio/wav;base64,UklGRh4BAABXQVZFZm10IBAAAAABAAEAgD4AAIA+AAABAAgAZGF0YQABAH8A/v/9AP3//P/+//7//f/+//7//v/+//3//v/+//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/9//7//f/+//3//v/+//7//f/+//7//v/9//7//v8=";

export const playErrorBeep = () => {
  const audio = new Audio(ERROR_BEEP);
  audio.volume = 0.2; // Keep it subtle
  audio.play().catch(() => {}); // Ignore autoplay restrictions
};
