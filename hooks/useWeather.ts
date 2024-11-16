import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { Weather, WEATHER_KEY, WEATHER_STORAGE_KEY } from '@/lib/const';
import useLocalStorage from './useLocalStorage';

interface CurrPosition {
    latitude: number;
    longitude: number;
}

const useWeather = () => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [storedValue, setValue] = useLocalStorage(WEATHER_STORAGE_KEY);

    const getGeolocation = (): Promise<CurrPosition> => {
        return new Promise((resolve, reject) => {
            if (typeof window !== 'undefined' && 'geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        resolve({ latitude, longitude });
                    },
                    (err) => reject(new Error('Unable to retrieve location'))
                );
            } else {
                reject(new Error('Geolocation is not supported by this browser'));
            }
        });
    };

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);

        try {
            const position = await getGeolocation();
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&units=metric&appid=${WEATHER_KEY}`;

            const { data, error: fetchError } = await useFetch<Weather>(url);

            if (fetchError) {
                throw new Error('Unable to fetch weather data');
            }

            const timestamp = new Date().toISOString();
            const weatherData = { data, timestamp };
           
            debugger
            setValue(weatherData);
            setWeather(data);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // const initializeWeather = async () => {
        //     if (storedValue) {
        //         const storedTimestamp = new Date(storedValue.timestamp);
        //         const now = new Date();

        //         if (
        //             storedTimestamp.getFullYear() === now.getFullYear() &&
        //             storedTimestamp.getMonth() === now.getMonth() &&
        //             storedTimestamp.getDate() === now.getDate() &&
        //             storedTimestamp.getHours() === now.getHours()
        //         ) {
        //             setWeather(storedValue.data);
        //         } 
        //     } else {
        //         await fetchWeather();
        //     }

        //     const interval = setInterval(fetchWeather, 60 * 60 * 1000);

        //     return () => clearInterval(interval);
        // };

        // initializeWeather();
    }, []);

    return { weather, fetchWeather, error, loading };
};

export default useWeather;
