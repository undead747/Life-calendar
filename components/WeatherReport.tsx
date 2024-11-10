import useWeather from "@/hooks/useWeather";
import React from "react";

const Weather = ({style}: {style?: React.CSSProperties}) => {
    const { weather, fetchWeather, error, loading } = useWeather();

    return (
        <div style={style}>
            {weather ? (
                <>
                    <p>Location: {weather.name}</p>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                </>
            ) : loading ? (
                <p>Loading...</p>
            ) : (
                <button type="button" className="nes-btn is-warning" onClick={() => fetchWeather()}>fetch weather</button>
            )}
        </div>
    );
};

export default Weather;
