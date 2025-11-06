import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerStatus } from '../types';

export const useTimer = (initialSeconds: number, onComplete?: () => void) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.IDLE);
  
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setSecondsRemaining(initialSeconds);
  }, [initialSeconds]);

  const clearTimer = useCallback(() => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  }, []);

  useEffect(() => {
    if (status === TimerStatus.RUNNING) {
      timerId.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearTimer();
            setStatus(TimerStatus.IDLE);
            if (onCompleteRef.current) {
                onCompleteRef.current();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimer();
    }

    return () => clearTimer();
  }, [status, clearTimer]);


  const start = useCallback(() => {
    if (secondsRemaining > 0) {
      setStatus(TimerStatus.RUNNING);
    }
  }, [secondsRemaining]);

  const pause = useCallback(() => {
    if (status === TimerStatus.RUNNING) {
      setStatus(TimerStatus.PAUSED);
    } else if (status === TimerStatus.PAUSED) {
      setStatus(TimerStatus.RUNNING); // Resume
    }
  }, [status]);
  
  const reset = useCallback((newInitialSeconds?: number) => {
    clearTimer();
    setStatus(TimerStatus.IDLE);
    setSecondsRemaining(newInitialSeconds ?? initialSeconds);
  }, [clearTimer, initialSeconds]);

  return { time: secondsRemaining, status, start, pause, reset };
};
