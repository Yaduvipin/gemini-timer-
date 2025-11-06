import React from 'react';
import { TimerStatus } from '../types';

interface TimerDisplayProps {
  secondsRemaining: number;
  initialSeconds: number;
  status: TimerStatus;
}

const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ secondsRemaining, initialSeconds, status }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = initialSeconds > 0 ? (secondsRemaining / initialSeconds) : 0;
  const offset = circumference * (1 - progress);

  const isFinished = status === TimerStatus.IDLE && secondsRemaining === 0 && initialSeconds > 0;

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      <svg className="absolute w-full h-full" viewBox="0 0 200 200">
        <circle
          className="text-gray-700"
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="100"
          cy="100"
        />
        <circle
          className="text-cyan-400 transition-all duration-500 ease-linear"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="100"
          cy="100"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <div className={`text-center font-mono transition-colors duration-300 ${isFinished ? 'animate-pulse' : ''}`}>
        <div className={`text-5xl font-bold tracking-tighter ${isFinished ? 'text-red-400' : 'text-gray-100'}`}>
          {isFinished ? "Done!" : formatTime(secondsRemaining)}
        </div>
        <div className="text-sm text-gray-400 uppercase tracking-widest mt-1">
          {status}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
