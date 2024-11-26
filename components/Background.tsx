"use client";
import { useWeatherContext } from '@/context/WeatherContext';
import { VIDEO_NAMES } from '@/lib/const';
import React, { useEffect, useState } from 'react';

export default function Background({ style }: { style?: React.CSSProperties }) {
  const { weather } = useWeatherContext();
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const hours = new Date().getHours();
    const isDaytime = hours >= 6 && hours < 18;
    const month = new Date().getMonth() + 1;

    if (weather) {
      const currentTimestamp = weather.dt;
      const sunriseTimestamp = weather.sys.sunrise;
      const sunsetTimestamp = weather.sys.sunset;
      const isRaining = weather.weather.some(w => w.main.toLowerCase() === 'rain');
      if (isRaining) {
        if (isDaytime) {
          if (month >= 3 && month <= 5) {
            setSrc(VIDEO_NAMES.spring_day_rain_1.video);
          } else if (month >= 6 && month <= 8) {
            setSrc(VIDEO_NAMES.summer_day_rain_1.video);
          } else if (month >= 9 && month <= 11) {
            setSrc(VIDEO_NAMES.autumn_day_rain_1.video);
          } else {
            setSrc(VIDEO_NAMES.winter_day_rain_1.video);
          }
        } else {
          if (month >= 3 && month <= 5) {
            setSrc(VIDEO_NAMES.spring_night_rain_1.video);
          } else if (month >= 6 && month <= 8) {
            setSrc(VIDEO_NAMES.summer_night_rain_1.video);
          } else if (month >= 9 && month <= 11) {
            setSrc(VIDEO_NAMES.autumn_night_rain_1.video);
          } else {
            setSrc(VIDEO_NAMES.winter_night_rain_1.video);
          }
        }
      } else {
        if (isDaytime) {
          if (month >= 3 && month <= 5) {
            setSrc(VIDEO_NAMES.spring_day_1.video);
          } else if (month >= 6 && month <= 8) {
            setSrc(VIDEO_NAMES.summer_day_1.video);
          } else if (month >= 9 && month <= 11) {
            setSrc(VIDEO_NAMES.autumn_day_1.video);
          } else {
            setSrc(VIDEO_NAMES.winter_day_1.video);
          }
        } else {
          if (month >= 3 && month <= 5) {
            setSrc(VIDEO_NAMES.spring_night_1.video);
          } else if (month >= 6 && month <= 8) {
            setSrc(VIDEO_NAMES.summer_night_1.video);
          } else if (month >= 9 && month <= 11) {
            setSrc(VIDEO_NAMES.autumn_night_1.video);
          } else {
            setSrc(VIDEO_NAMES.winter_night_1.video);
          }
        }
      }

      if (currentTimestamp >= sunriseTimestamp && currentTimestamp < sunsetTimestamp) {
        return;
      } else if (currentTimestamp >= sunsetTimestamp) {
        setSrc(VIDEO_NAMES.sunset.video);
      } else {
        setSrc(VIDEO_NAMES.sundown.video);
      }
    } else {
      if (isDaytime) {
        if (month >= 3 && month <= 5) {
          setSrc(VIDEO_NAMES.spring_day_1.video);
        } else if (month >= 6 && month <= 8) {
          setSrc(VIDEO_NAMES.summer_day_1.video);
        } else if (month >= 9 && month <= 11) {
          setSrc(VIDEO_NAMES.autumn_day_1.video);
        } else {
          setSrc(VIDEO_NAMES.winter_day_1.video);
        }
      } else {
        if (month >= 3 && month <= 5) {
          setSrc(VIDEO_NAMES.spring_night_1.video);
        } else if (month >= 6 && month <= 8) {
          setSrc(VIDEO_NAMES.summer_night_1.video);
        } else if (month >= 9 && month <= 11) {
          setSrc(VIDEO_NAMES.autumn_night_1.video);
        } else {
          setSrc(VIDEO_NAMES.winter_night_1.video);
        }
      }
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
