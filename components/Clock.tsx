import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TimeOfDay = () => {
  const [time, setTime] = useState(new Date());
  const [timeOfDay, setTimeOfDay] = useState('day');

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime);
      // Xác định nếu là ban ngày (6h sáng đến 6h chiều)
      if (currentTime.getHours() >= 6 && currentTime.getHours() < 18) {
        setTimeOfDay('day');
      } else {
        setTimeOfDay('night');
      }
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(interval); // Dọn dẹp khi component bị hủy
  }, []);

  // Định dạng giờ theo định dạng hh:mm
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Định dạng ngày tháng năm theo định dạng dd mmm yyyy (ví dụ: 29 Dec 2023)
  const formattedDate = time.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div>
      <p>Current date: {formattedDate}</p>
      <p>Current time: {formattedTime}</p>
      <p>
        {timeOfDay === 'day' ? (
          <i className="fas fa-sun"></i> // Icon mặt trời
        ) : (
          <i className="fas fa-moon"></i> // Icon mặt trăng
        )}
      </p>
    </div>
  );
};

export default TimeOfDay;
