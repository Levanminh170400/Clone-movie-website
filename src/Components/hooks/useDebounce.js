import { useState, useEffect } from "react";
function useDebounce(initialValue, timer = 1000) {
  const [debounceValue, setDebounceValue] = useState("");
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebounceValue(initialValue);
    }, timer);
    return () => {
      clearTimeout(delay);
    };
  }, [initialValue]);
  return debounceValue;
}
export default useDebounce;
// using delay call API
