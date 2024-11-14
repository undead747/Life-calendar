"use client";
import { useWeatherContext } from '@/context/WeatherContext';
import React, { useEffect, useState } from 'react';

export default function Background({ style }: { style?: React.CSSProperties }) {
    const { weather } = useWeatherContext();
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        if (weather) {
            const isDaytime = weather.dt < weather.sys.sunset;
            const isRaining = weather.weather.some(w => w.main.toLowerCase() === 'rain');

            if (isDaytime) {
                setSrc(isRaining ? '/videos/day-rain.mp4' : '/videos/day.mp4');
            } else {
                setSrc(isRaining ? '/videos/night-rain.mp4' : '/videos/night.mp4');
            }
        } else {
            const hours = new Date().getHours();
            const isDaytime = hours >= 6 && hours < 18;
            setSrc(isDaytime ? '/videos/day.mp4' : '/videos/night.mp4');
        }
    }, [weather]);

    return (
        <video autoPlay loop muted style={style} key={src}>
            {src && <source src={src} type="video/mp4" />}
            {!src && <p>Loading video...</p>}
            Your browser does not support the video tag.
        </video>
    );
}
