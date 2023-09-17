import React, { useState, useEffect } from 'react';

export const TypingTimer = ({ onUpdate }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed(prevSeconds => {
        const newValue = parseFloat((prevSeconds + 0.01).toFixed(2));
        setTimeout(() => {
          onUpdate(newValue);
        }, 0);
        return newValue;
      })
    }, 10);

    return () => clearInterval(interval);
   }, []);

   return (
    <div>
      経過時間: {secondsElapsed} 秒
    </div>
   );
}