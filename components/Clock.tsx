import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

const TimeOfDay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Lấy giờ phút mà không có AM/PM
  const hoursAndMinutes = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).split(' ')[0]; // Chỉ lấy phần giờ và phút

  // Lấy AM/PM
  const amPm = time.toLocaleTimeString([], { hour12: true }).split(' ')[1];

  const formattedDate = time.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const isDayTime = time.getHours() >= 6 && time.getHours() < 18;

  return (
    <div className="flex items-center space-x-4 p-1">
      {/* Time */}
      <div>
        <span className="text-lg font-semibold">{hoursAndMinutes}</span>
        <span className="text-xs font-normal text-gray-500 ml-1">{amPm}</span>
      </div>

      {/* Day/Night Icon */}
      <span className="flex items-center p-2 bg-gray-100 rounded-full">
        <span
          className={`w-10 h-10 flex justify-center items-center rounded-full ${
            isDayTime ? 'bg-yellow-300' : 'bg-gray-400'
          }`}
        >
          <FontAwesomeIcon
            icon={isDayTime ? faSun : faMoon}
            size="lg"
            className={isDayTime ? 'text-yellow-600' : 'text-gray-100'}
            aria-label={isDayTime ? 'Sun icon for daytime' : 'Moon icon for nighttime'}
          />
        </span>
      </span>

      {/* Date */}
      <span className="text-lg font-medium">{formattedDate}</span>
    </div>
  );
};

export default TimeOfDay;
