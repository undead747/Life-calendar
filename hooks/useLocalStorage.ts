'use client'
import { useState, useEffect } from "react";

function useLocalStorage(key: string) {
    const [storedValue, setStoredValue] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      // This will run only on the client side
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
        setIsLoaded(true);
      }
    }, [key]); // Run effect only when 'key' changes

    const setValue = (value: any) => {
      try {
        const valueToStore = value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    };

    return [storedValue, setValue, isLoaded] as const;
}

export default useLocalStorage;
