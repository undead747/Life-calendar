import useWeather from "@/hooks/useWeather";
import { Weather } from "@/lib/const";
import { createContext, ReactNode, useState } from "react";

type WeatherContextType = {
    weather: Weather | null,
    fetchWeather:  () => Promise<void>;
    error: string | null;
    loading: boolean;
} | null;

// Create a context with `WeatherContextType`
const WeatherContext = createContext<WeatherContextType>(null);

interface WeatherProviderProps {
    children: ReactNode;
  }

  export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
    const { weather, fetchWeather, error, loading } = useWeather();
    
    const returnValue = {
        weather,
        fetchWeather,
        error,
        loading,
      };

    return (
      <WeatherContext.Provider value={returnValue}>
        {children}
      </WeatherContext.Provider>
    );
  };
  