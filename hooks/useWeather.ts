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
    const [error, setError] = useState<string | null>(null);  // Ensure error state is strictly string or null
    const [loading, setLoading] = useState<boolean>(true);

    // Only trigger fetch if currPostition is set
    const { data, loading: fetchLoading, error: fetchError } = useFetch<any>(
        currPostition
            ? `https://api.openweathermap.org/data/2.5/weather?lat=${currPostition.latitude}&lon=${currPostition.longitude}&units=metric&appid=${WEATHER_KEY}`
            : ''
    );

    // Fetch current weather data
    const fetchWeather = async () => {
        setLoading(true); // Start loading when fetchWeather is called
        try {
            if (typeof window !== 'undefined' && 'geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrPostition({ latitude, longitude });
                    },
                    (err) => {
                        setError('Unable to retrieve location');
                        setLoading(false);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser');
                setLoading(false);
            }
        } catch (err) {
            setError('Unable to fetch weather data');
            setLoading(false);
        }
    };

    // Update weather when data changes
    useEffect(() => {
        if (data) {
            setWeather(data);
        }
    }, [data]);

    // Handle fetch error
    useEffect(() => {
        if (fetchError) {
            setError('Unable to fetch weather data');
            setLoading(false);
        }
    }, [fetchError]);

    return { weather, fetchWeather, error, loading: loading || fetchLoading };
};

export default useWeather;
