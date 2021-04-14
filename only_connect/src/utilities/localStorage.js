import { useState, useEffect } from "react";
function useLocalStorageState(key, defaultVal) {

  const [state, setState] = useState(() => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || defaultVal
      );
      console.log(`GetItem: ${key}, ${value}`);
    } catch (e) {
      value = defaultVal;
    }
    return value;
  });
  
  useEffect(() => {
    console.log(`SetItem: ${key}, ${state}`)
    window.localStorage.setItem(key, JSON.stringify(state));
    setState(state);
  }, [state, key]);
  return [state, setState];
}
export { useLocalStorageState };