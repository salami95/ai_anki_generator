import React from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
}

function ProgressBar({ progress, total }: ProgressBarProps) {
  const percentage = (progress / total) * 100;

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        {progress} of {total} completed
      </p>
    </div>
  );
}

export default ProgressBar;