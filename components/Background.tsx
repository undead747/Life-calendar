"use client";
import { useWeatherContext } from "@/context/WeatherContext";
import { VIDEO_NAMES } from "@/lib/const";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

interface WeatherData{
  main: string
}

export default function Background({ style }: { style?: React.CSSProperties }) {
  const { weather } = useWeatherContext();
  const [src, setSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const hours = new Date().getHours();
    const isDaytime = hours >= 6 && hours < 18;
    const month = new Date().getMonth() + 1;
    let audio = null;

    if (weather) {
      const isRaining = weather.weather.some((w: WeatherData) => w.main.toLowerCase() === "rain");
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

    setIsPopupVisible(true);

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

  const togglePlayVideo = () => {
    if (videoRef.current && src) {
      videoRef.current.load();
      videoRef.current
        .play()
        .catch((error) => alert("Video playback failed:" + error));
    }

    setIsPopupVisible(false);
  }

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
      {isPopupVisible && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <p className="mb-4">We need your permission to play the background video. 😊</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={togglePlayVideo}
                className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 text-white focus:outline-none hover:outline-none"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <video ref={videoRef} autoPlay loop muted playsInline style={style} key={src}>
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
