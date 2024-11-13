import useWeather from "@/hooks/useWeather";
import React from "react";

const Weather = ({ style }: { style?: React.CSSProperties }) => {
    const { weather, fetchWeather, error, loading } = useWeather();

    return (
        <div style={style}>
            {weather ? (
                <div className="flex rounded-full bg-white p-2 pr-8 shadow-lg h-[30] items-center">
                    <img
                        className="nes-avatar is-rounded w-full bg-black"
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        style={{width: "50px", height: "50px"}}
                    />
                    <div className="ml-2 flex flex-col">
                        <span className="text-sm">Weather: {weather.weather[0].description}</span>
                        <span className="text-base">{weather.main.temp}°C</span>
                        <span className="text-xs">Weather in {weather.name}, {weather.sys.country}</span>
                    </div>
                </div>
            ) : loading ? (
                <p>Loading...</p>
            ) : (
                <button type="button" className="nes-btn is-warning shadow-lg h-10 mt-2 mr-2" onClick={() => fetchWeather()} >fetch weather</button>
            )}
        </div>
    );
};

export default Weather;
