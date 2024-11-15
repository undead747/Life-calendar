import React, { useContext } from "react";//+
import { useWeatherContext } from "@/context/WeatherContext"; // Assuming WeatherContext is defined in a separate file//+

const Weather = ({ style }: { style?: React.CSSProperties }) => {
    const { weather, fetchWeather, error, loading } = useWeatherContext();

    return (
        <div style={style}>
            {weather ? (
                <div className="flex rounded-full items-center">
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
                <span>Loading...</span>
            ) : (
                <button type="button" className="nes-btn is-warning shadow-lg text-xs h-10 mt-2 mr-2" onClick={() => fetchWeather()} style={{padding: "0px 4px", margin: "0", }} >fetch weather</button>
            )}
        </div>
    );
};

export default Weather;