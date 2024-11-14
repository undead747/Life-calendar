"use client";
import { useWeatherContext } from '@/context/WeatherContext';
import React from 'react'

export default function Background({ style }: { style?: React.CSSProperties }) {
    const { weather, fetchWeather, error, loading } = useWeatherContext();
    let src = '/videos/wallpaper.mp4';

    if (weather) {
        let isDaytime = weather.dt > weather.sys.sunset ? true : false;
        let isRaining = weather.weather.some(w => w.main.toLowerCase() === 'rain');
        let isStorm = weather.weather.some(w => w.main.toLowerCase() === 'storm');

        if (isDaytime) {
            if (isRaining) {

            } else {

            }
        } else {
            if (isRaining) {

            } else {

            }
        }
    }

    return (
        <video autoPlay loop muted style={style}>
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}
