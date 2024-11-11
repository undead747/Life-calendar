// hooks/useWeather.js
import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { Weather, WEATHER_KEY } from '@/lib/const';

interface CurrPostition {
    latitude: number;
    longitude: number;
}

const useWeather = () => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [currPostition, setCurrPostition] = useState<CurrPostition | null>(null);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const { data, loading: fetchLoading, error: fetchError } = useFetch<any>(
        currPostition
            ? `https://api.openweathermap.org/data/2.5/weather?lat=${currPostition.latitude}&lon=${currPostition.longitude}&units=metric&appid=${WEATHER_KEY}`
            : ''
    );

    if(currPostition) console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${currPostition.latitude}&lon=${currPostition.longitude}&units=metric&appid=${WEATHER_KEY}`);

    const fetchWeather = async () => {
        try {
            if (typeof window !== 'undefined' && "geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrPostition({latitude: latitude, longitude: longitude});
                    },
                    (err) => {
                        setError("Unable to retrieve location");
                        setLoading(false);
                    }
                );
            }
        } catch (err) {
            setError("Unable to fetch weather data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            if(data) setWeather(data);
    }, [data])

    useEffect(() => {
        if (fetchError) {
            setError("Unable to fetch weather data");
            setLoading(false);
        }
    }, [fetchError]);

    return { weather, fetchWeather, error, loading: loading || fetchLoading  };
};

export default useWeather;
