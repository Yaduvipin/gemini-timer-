import React from 'react';
import { TimerStatus } from '../types';

interface ControlsProps {
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isStartDisabled: boolean;
}

const Controls: React.FC<ControlsProps> = ({ status, onStart, onPause, onReset, isStartDisabled }) => {
  const isRunning = status === TimerStatus.RUNNING;
  const isPaused = status === TimerStatus.PAUSED;
  const isIdle = status === TimerStatus.IDLE;

  const renderStartPauseButton = () => {
    if (isIdle) {
      return (
        <button
          onClick={onStart}
          disabled={isStartDisabled}
          className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-800 disabled:text-gray-500 disabled:cursor-not-allowed text-gray-900 font-bold py-3 px-6 rounded-full text-lg uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30"
        >
          Start
        </button>
      );
    }

    const label = isRunning ? 'Pause' : 'Resume';
    const bgColor = isRunning ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-green-500 hover:bg-green-400';
    const shadowColor = isRunning ? 'shadow-yellow-500/30' : 'shadow-green-500/30';

    return (
      <button
        onClick={onPause}
        className={`w-full ${bgColor} ${shadowColor} text-gray-900 font-bold py-3 px-6 rounded-full text-lg uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex space-x-4">
      <div className="flex-grow">
        {renderStartPauseButton()}
      </div>
      <button
        onClick={onReset}
        disabled={isIdle}
        className="flex-shrink-0 bg-gray-600 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-full text-lg uppercase tracking-wider transition-all transform hover:scale-105"
      >
        Reset
      </button>
    </div>
  );
};

export default Controls;
