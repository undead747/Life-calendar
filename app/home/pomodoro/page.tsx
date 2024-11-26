'use client';
import VideoList from '@/components/VideoList';
import { usePomodoroContext } from '@/context/PomodoroContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faCog } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { POMODORO_STORAGE_KEY } from '@/lib/const';

export default function Pomodoro() {
  const { selectedVideo, isPopupVisible, setIsPopupVisible, isVideoListVisible, setIsVideoListVisible } = usePomodoroContext();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [studyTime, setStudyTime] = useState(25);
  const [restTime, setRestTime] = useState(5);
  const [isStudyPhase, setIsStudyPhase] = useState(true);
  const [timeLeft, setTimeLeft] = useState(studyTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [tempStudyTime, setTempStudyTime] = useState(studyTime);
  const [tempRestTime, setTempRestTime] = useState(restTime);
  const [pomodoroValue, setPomodoroValue, isPromodoroLoaded] = useLocalStorage(POMODORO_STORAGE_KEY);

  useEffect(() => {
    if(isPromodoroLoaded){
      if(!pomodoroValue) setPomodoroValue({studyTime, restTime});
      else {
        setStudyTime(pomodoroValue.studyTime);
        setRestTime(pomodoroValue.restTime);
        setTimeLeft(pomodoroValue.studyTime*60);
      }
    }
  }, [isPromodoroLoaded])

  useEffect(() => {
    //TODO
    if (videoRef.current && selectedVideo?.video) {
      const handleLoadedData = () => {
      };
  
      const videoElement = videoRef.current;
  
      videoElement.addEventListener("loadeddata", handleLoadedData);
      videoElement.load();
  
      return () => {
        videoElement.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, [selectedVideo]);
  

  useEffect(() => {
    if (isRunning && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsStudyPhase(!isStudyPhase);
            return (isStudyPhase ? restTime : studyTime) * 60;
          }

          return prevTime - 1;
        });
      }, 1000);
    }

    if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (videoRef.current && selectedVideo?.video) {
      videoRef.current.load();
    }
  }, [selectedVideo]);

  const toggleVideoList = () => {
    setIsVideoListVisible((prev: boolean) => !prev);
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(studyTime * 60);
    setIsStudyPhase(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const openPopup = () => {
    setTempStudyTime(studyTime);
    setTempRestTime(restTime);
    setIsPopupVisible(true);
  };

  const saveTimes = () => {
    setStudyTime(tempStudyTime);
    setRestTime(tempRestTime);
    setIsPopupVisible(false);
    setIsRunning(false);
    setTimeLeft(tempStudyTime * 60);
    debugger
    setPomodoroValue({studyTime:tempStudyTime, restTime:tempRestTime});
    setIsStudyPhase(true);
  };

  const cancelPopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="w-screen h-screen">
      <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2] w-[45%] h-2/5 flex flex-col items-center justify-center rounded-sm text-white">
        <h1 className="text-4xl mb-8">{isStudyPhase ? 'Study Time' : 'Rest Time'}</h1>
        <div className="text-6xl font-bold mb-8">{formatTime(timeLeft)}</div>
        <div className="flex relative">
          {
            isRunning ? <button
              onClick={toggleTimer}
              className={`px-6 py-3 bg-red-500 rounded-md hover:bg-red-600 focus:outline-none hover:outline-none`}
            >
              Pause
            </button> : <button
              onClick={toggleTimer}
              className={`px-6 py-3 bg-green-500 rounded-md hover:bg-green-600 focus:outline-none hover:outline-none`}
            >
              Start
            </button>
          }
          <button
            onClick={resetTimer}
            className="px-6 py-3 ml-4 bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none hover:outline-none"
          >
            Reset
          </button>
          <button
            onClick={openPopup}
            className="focus:outline-none hover:outline-none absolute -right-[30%] top-[50%] -translate-y-1/2"
          >
            <FontAwesomeIcon icon={faCog} className="text-white-500 text-4xl" />
          </button>
        </div>
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[3]">
          <div className="bg-white p-8 rounded-md shadow-md text-black">
            <h2 className="text-2xl font-bold mb-4">Edit Times</h2>
            <div className="mb-4">
              <label className="block mb-2">Study Time (minutes):</label>
              <input
                type="number"
                value={tempStudyTime}
                onChange={(e) => setTempStudyTime(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Rest Time (minutes):</label>
              <input
                type="number"
                value={tempRestTime}
                onChange={(e) => setTempRestTime(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelPopup}
                className="px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-600 text-white focus:outline-none hover:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={saveTimes}
                className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 text-white focus:outline-none hover:outline-none"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: '116px',
          left: 0,
          width: '100%',
          height: 'calc(100% - 116px)',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        {selectedVideo?.video && <source src={selectedVideo.video} type="video/mp4" />}
        {!selectedVideo?.video && <p>Loading video...</p>}
        Your browser does not support the video tag.
      </video>

      <div
        className={`fixed left-0 w-full bg-black bg-opacity-50 transition-all duration-500 ${isVideoListVisible ? 'bottom-0' : '-bottom-[132px]'
          }`}
      >
        <button
          onClick={toggleVideoList}
          className="absolute -top-[45px] right-[5px] bg-gray-800 text-white w-10 h-10 flex justify-center items-center rounded-full shadow-md hover:bg-gray-700 focus:outline-none hover:outline-none"
        >
          {
            isVideoListVisible ? <FontAwesomeIcon
              icon={faChevronUp}
            />
              : <FontAwesomeIcon
                icon={faChevronDown}
              />
          }
        </button>
        <VideoList />
      </div>

      <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1] w-[45%] h-2/5 flex flex-col items-center justify-center bg-black opacity-70 rounded-sm text-white">
      </div>
    </div>
  );
}
