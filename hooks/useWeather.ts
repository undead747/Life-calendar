import { useState, useEffect, useRef } from 'react';
import { Weather, WEATHER_KEY, WEATHER_STORAGE_KEY } from '@/lib/const';
import useLocalStorage from './useLocalStorage';

interface CurrPosition {
    latitude: number;
    longitude: number;
}

const useWeather = () => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const geolocation = useRef<CurrPosition | null>(null);
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
                    () => reject(new Error('Unable to retrieve location'))
                );
            } else {
                reject(new Error('Geolocation is not supported by this browser'));
            }
        });
    };

    const fetchWeather = async () => {
        if (!geolocation.current) {
            setError('Geolocation is not available');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${geolocation.current.latitude}&lon=${geolocation.current.longitude}&units=metric&appid=${WEATHER_KEY}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const data = await response.json();
            const timestamp = new Date().toISOString();
            const weatherData = { weather: data, geolocation: geolocation.current, timestamp };

            setValue(weatherData);
            setWeather(data);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const toggleGetWeather = async () => {
        const position = await getGeolocation();
        geolocation.current = position;
        await fetchWeather();

        setInterval(fetchWeather, 60 * 60 * 1000);
    }

    useEffect(() => {
        const initializeWeather = async () => {
            if (storedValue) {
                const parsedWeather: Weather = storedValue.weather;
                const storedTimestamp = new Date(storedValue.timestamp);
                const location = storedValue.geolocation;
                const now = new Date();

                geolocation.current = location;
                if (
                    storedTimestamp.getFullYear() === now.getFullYear() &&
                    storedTimestamp.getMonth() === now.getMonth() &&
                    storedTimestamp.getDate() === now.getDate() &&
                    storedTimestamp.getHours() === now.getHours()
                ) {
                    setWeather(parsedWeather);
                } else {
                    fetchWeather();
                }

                const interval = setInterval(fetchWeather, 60 * 60 * 1000);
                return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
            }
        };

        initializeWeather();
    }, [storedValue]);

    return { weather, toggleGetWeather, error, loading };
};

export default useWeather;
