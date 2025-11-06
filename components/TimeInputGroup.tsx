import React from 'react';

interface TimeInputProps {
  value: number;
  setValue: (value: number) => void;
  max: number;
  label: string;
  isDisabled: boolean;
}

const TimeInput: React.FC<TimeInputProps> = ({ value, setValue, max, label, isDisabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let num = parseInt(e.target.value, 10);
    if (isNaN(num) || num < 0) {
      num = 0;
    }
    if (num > max) {
      num = max;
    }
    setValue(num);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
          setValue(0);
      }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="number"
        value={value.toString().padStart(2, '0')}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isDisabled}
        className="font-mono bg-gray-700/50 text-white text-4xl w-24 text-center rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        min="0"
        max={max}
      />
      <span className="text-xs text-gray-400 mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );
};

interface TimeInputGroupProps {
    hours: number;
    minutes: number;
    seconds: number;
    setHours: (h: number) => void;
    setMinutes: (m: number) => void;
    setSeconds: (s: number) => void;
    isDisabled: boolean;
}

const TimeInputGroup: React.FC<TimeInputGroupProps> = (props) => {
    return (
        <div className="flex items-start justify-center space-x-2 md:space-x-4">
            <TimeInput value={props.hours} setValue={props.setHours} max={99} label="Hours" isDisabled={props.isDisabled} />
            <span className="text-4xl font-mono text-gray-500 pt-2">:</span>
            <TimeInput value={props.minutes} setValue={props.setMinutes} max={59} label="Minutes" isDisabled={props.isDisabled} />
            <span className="text-4xl font-mono text-gray-500 pt-2">:</span>
            <TimeInput value={props.seconds} setValue={props.setSeconds} max={59} label="Seconds" isDisabled={props.isDisabled} />
        </div>
    );
};

export default TimeInputGroup;
