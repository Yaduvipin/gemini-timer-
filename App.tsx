import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useTimer } from './hooks/useTimer';
import TimerDisplay from './components/TimerDisplay';
import TimeInputGroup from './components/TimeInputGroup';
import Controls from './components/Controls';
import { TimerStatus } from './types';
import { NOTIFICATION_SOUND_BASE64 } from './constants';

const App: React.FC = () => {
  const [inputHours, setInputHours] = useState<number>(0);
  const [inputMinutes, setInputMinutes] = useState<number>(5);
  const [inputSeconds, setInputSeconds] = useState<number>(0);
  
  const initialTotalSeconds = useMemo(() => {
    return (inputHours * 3600) + (inputMinutes * 60) + inputSeconds;
  }, [inputHours, inputMinutes, inputSeconds]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Pre-load the audio element
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio(NOTIFICATION_SOUND_BASE64);
    }
  }, []);

  const handleTimerComplete = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
    // You could also add a visual notification here, e.g., a modal.
  }, []);

  const {
    time,
    status,
    start,
    pause,
    reset,
  } = useTimer(initialTotalSeconds, handleTimerComplete);

  const handleStart = () => {
    if (initialTotalSeconds > 0) {
      start();
    }
  };

  const isInputDisabled = status !== TimerStatus.IDLE;

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-300">Gemini Timer</h1>
          <p className="text-gray-400 mt-2">A sleek countdown timer for your tasks.</p>
        </header>

        <main className="bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl shadow-cyan-500/10 p-6 md:p-10">
          <TimerDisplay
            secondsRemaining={time}
            initialSeconds={initialTotalSeconds}
            status={status}
          />

          <div className="mt-8">
            <TimeInputGroup
              hours={inputHours}
              minutes={inputMinutes}
              seconds={inputSeconds}
              setHours={setInputHours}
              setMinutes={setInputMinutes}
              setSeconds={setInputSeconds}
              isDisabled={isInputDisabled}
            />
          </div>

          <div className="mt-10">
            <Controls
              status={status}
              onStart={handleStart}
              onPause={pause}
              onReset={() => reset(initialTotalSeconds)}
              isStartDisabled={initialTotalSeconds === 0}
            />
          </div>
        </main>
        
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
