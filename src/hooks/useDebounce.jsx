import { useEffect, useState, useRef } from "react";

const useDebounce = (value, delay) => {
  const timerRef = useRef(null);
  // 1. Set debouncedValue state
  const [debouncedValue, setDebouncedValue] = useState("");

  // 2. useEffect
  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerRef.current);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
