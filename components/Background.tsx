"use client";
import { useWeatherContext } from "@/context/WeatherContext";
import { VIDEO_NAMES } from "@/lib/const";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

export default function Background({ style }: { style?: React.CSSProperties }) {
  const { weather } = useWeatherContext();
  const [src, setSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const hours = new Date().getHours();
    const isDaytime = hours >= 6 && hours < 18;
    const month = new Date().getMonth() + 1;
    let audio = null;

    if (weather) {
      const isRaining = weather.weather.some((w) => w.main.toLowerCase() === "rain");
      if (isRaining) {
        if (isDaytime) {
          if (month >= 3 && month <= 5) {
            setSrc(VIDEO_NAMES.spring_day_rain_1.video);
            audio = VIDEO_NAMES.spring_day_rain_1.audio;
          } else if (month >= 6 && month <= 8) {
            setSrc(VIDEO_NAMES.summer_day_rain_1.video);
            audio = VIDEO_NAMES.summer_day_rain_1.audio;
          } else if (month >= 9 && month <= 11) {
            setSrc(VIDEO_NAMES.autumn_day_rain_1.video);
            audio = VIDEO_NAMES.autumn_day_rain_1.audio;
          } else {
            setSrc(VIDEO_NAMES.winter_day_rain_1.video);
            audio = VIDEO_NAMES.winter_day_rain_1.audio;
          }
        } else {
          if (month >= 3 && month <= 5) {
            setSrc(VIDEO_NAMES.spring_night_rain_1.video);
            audio = VIDEO_NAMES.spring_night_rain_1.audio;
          } else if (month >= 6 && month <= 8) {
            setSrc(VIDEO_NAMES.summer_night_rain_1.video);
            audio = VIDEO_NAMES.summer_night_rain_1.audio;
          } else if (month >= 9 && month <= 11) {
            setSrc(VIDEO_NAMES.autumn_night_rain_1.video);
            audio = VIDEO_NAMES.autumn_night_rain_1.audio;
          } else {
            setSrc(VIDEO_NAMES.winter_night_rain_1.video);
            audio = VIDEO_NAMES.winter_night_rain_1.audio;
          }
        }
      } else {
        if (isDaytime) {
          if (month >= 3 && month <= 5) {
            setSrc(VIDEO_NAMES.spring_day_1.video);
            audio = VIDEO_NAMES.spring_day_1.audio;
          } else if (month >= 6 && month <= 8) {
            setSrc(VIDEO_NAMES.summer_day_1.video);
            audio = VIDEO_NAMES.summer_day_1.audio;
          } else if (month >= 9 && month <= 11) {
            setSrc(VIDEO_NAMES.autumn_day_1.video);
            audio = VIDEO_NAMES.autumn_day_1.audio;
          } else {
            setSrc(VIDEO_NAMES.winter_day_1.video);
            audio = VIDEO_NAMES.winter_day_1.audio;
          }
        } else {
          if (month >= 3 && month <= 5) {
            setSrc(VIDEO_NAMES.spring_night_1.video);
            audio = VIDEO_NAMES.spring_night_1.audio;
          } else if (month >= 6 && month <= 8) {
            setSrc(VIDEO_NAMES.summer_night_1.video);
            audio = VIDEO_NAMES.summer_night_1.audio;
          } else if (month >= 9 && month <= 11) {
            setSrc(VIDEO_NAMES.autumn_night_1.video);
            audio = VIDEO_NAMES.autumn_night_1.audio;
          } else {
            setSrc(VIDEO_NAMES.winter_night_1.video);
            audio = VIDEO_NAMES.winter_night_1.audio;
          }
        }
      }
    }

    if (audio) {
      const sound = new Audio(audio);
      audioRef.current = sound;
      sound.loop = true;

      sound.addEventListener("play", () => setIsPlaying(true));
      sound.addEventListener("pause", () => setIsPlaying(false));

      return () => {
        sound.pause();
        sound.removeEventListener("play", () => setIsPlaying(true));
        sound.removeEventListener("pause", () => setIsPlaying(false));
        audioRef.current = null;
      };
    }
  }, [weather]);

  const togglePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.warn("Audio playback failed:", error);
        }
      }
    }
  };

  return (
    <div>
      <video autoPlay loop muted style={style} key={src}>
        {src && <source src={src} type="video/mp4" />}
        {!src && <p>Loading video...</p>}
        Your browser does not support the video tag.
      </video>
      <button className="absolute bottom-[10px] right-[10px] bg-gray-800 text-white w-10 h-10 flex justify-center items-center rounded-full shadow-md hover:bg-gray-700 focus:outline-none hover:outline-none"
        onClick={() => togglePlayPause()}
      >
        {
          isPlaying ? <FontAwesomeIcon
            icon={faPause}
          />
            : <FontAwesomeIcon
              icon={faPlay}
            />
        }
      </button>
    </div>
  );
}
