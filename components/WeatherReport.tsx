import React from "react";
import { useWeatherContext } from "@/context/WeatherContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Weather = ({ style }: { style?: React.CSSProperties }) => {
    const { weather, toggleGetWeather, loading } = useWeatherContext();

    return (
        <div style={style}>
            {weather ? (
                <div className="flex rounded-full items-center">
                    <div className="relative w-12 h-12">
                        <Image
                            className="nes-avatar is-rounded bg-black"
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </div>
                    <div className="ml-2 flex flex-col">
                        <span className="text-xs">{weather.weather[0].description}</span>
                        <span className="text-base">{weather.main.temp}°C</span>
                        <span className="text-xs flex items-center">
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                size="lg"
                                className="mr-2"
                            />
                            {weather.name}, {weather.sys.country}
                        </span>
                    </div>
                </div>
            ) : loading ? (
                <span>Loading...</span>
            ) : (
                <button
                    type="button"
                    className="nes-btn is-warning shadow-lg text-xs h-10 mt-2 mr-2"
                    onClick={() => toggleGetWeather()}
                    style={{ padding: "0px 4px", margin: "0" }}
                >
                    Fetch Weather
                </button>
            )}
        </div>
    );
};

export default Weather;
