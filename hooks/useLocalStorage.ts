import { useState } from "react";

function useLocalStorage(key: string) {
    const initialValue = null;
    const [storedValue, setStoredValue] = useState<any>(() => {
      try {
        const item = window.localStorage.getItem(key);
        if (item)  return JSON.parse(item);
        
        return initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });
  
    const setValue = (value: any) => {
      try {
        const valueToStore = value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    };
  
    return [storedValue, setValue] as const;
  }
  
  export default useLocalStorage;