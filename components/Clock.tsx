import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

const TimeOfDay = () => {
  const [time, setTime] = useState(() => new Date()); 
  const [hoursAndMinutes, setHoursAndMinutes] = useState<string>('');
  const [amPm, setAmPm] = useState<string>('');
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [isDayTime, setIsDayTime] = useState<boolean | null>(null);
  const [midnight, setMidnight] =  useState<string>('');
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    setHoursAndMinutes(time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).split(' ')[0]);

    setAmPm(time.toLocaleTimeString([], { hour12: true }).split(' ')[1]);

    setFormattedDate(time.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }));
    
    setIsDayTime(time.getHours() >= 6 && time.getHours() < 18);
    const midnightVal = new Date(time);
    midnightVal.setHours(0, 0, 0, 0); // Set to midnight
    setMidnight(midnight);
    const secondsInDay = 86400; // Total seconds in a day
    const elapsedSeconds = (time.getTime() - midnightVal.getTime()) / 1000;
    setProgress((elapsedSeconds / secondsInDay) * 100);
    
    const interval = setInterval(() => setTime(new Date()), 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="flex items-center space-x-4">
      <div>
        <span className="text-lg font-semibold">{hoursAndMinutes}</span>
        <span className="text-xs font-normal text-gray-500 ml-1">{amPm}</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="flex items-center justify-center w-14 h-14 mb-1 p-2 bg-gray-100 rounded-full">
          <span
            className={`flex justify-center items-center w-9 h-9 rounded-full animate-rotate ${
              isDayTime ? "bg-yellow-300" : "bg-gray-400"
            }`}
          >
            <FontAwesomeIcon
              icon={isDayTime ? faSun : faMoon}
              size="lg"
              className={`${isDayTime ? "text-yellow-600" : "text-gray-100"}`}
              aria-label={isDayTime ? "Sun icon for daytime" : "Moon icon for nighttime"}
            />
          </span>
        </span>
        <div className="w-12 h-2 bg-gray-300 rounded-full relative">
          <div
            className="h-full bg-black rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <span className="text-lg font-medium">{formattedDate}</span>

      <div aria-live="polite" className="sr-only">
        {hoursAndMinutes} {amPm}
      </div>
    </div>
  );
};

export default TimeOfDay;
