import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

function NavigationControls({ onPrevious, onNext }: NavigationControlsProps) {
  return (
    <>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={onPrevious}
          className="p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={onNext}
          className="p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}

export default NavigationControls;