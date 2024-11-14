'use client'
import useWeather from "@/hooks/useWeather";
import { Weather } from "@/lib/const";
import { createContext, ReactNode, useContext } from "react";

type WeatherContextType = {
    weather: Weather | null;
    fetchWeather: () => Promise<void>;
    error: string | null;
    loading: boolean;
};

const defaultContextValue: WeatherContextType = {
    weather: null,
    fetchWeather: async () => {},
    error: null,
    loading: false,
};

// Create a context with a default value
const WeatherContext = createContext<WeatherContextType>(defaultContextValue);

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

// Custom hook for consuming the context
export const useWeatherContext = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error("useWeatherContext must be used within a WeatherProvider");
    }
    return context;
};
