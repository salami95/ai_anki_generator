import React from 'react';

interface FlashcardDisplayProps {
  front: string;
  back: string;
  isFlipped: boolean;
  onClick: () => void;
}

function FlashcardDisplay({ front, back, isFlipped, onClick }: FlashcardDisplayProps) {
  return (
    <div
      className={`relative w-full aspect-[3/2] cursor-pointer transition-transform duration-700 transform-gpu ${
        isFlipped ? 'rotate-y-180' : ''
      }`}
      style={{ perspective: '1000px' }}
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 backface-hidden ${
          isFlipped ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="h-full bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 flex items-center justify-center text-center">
          <p className="text-xl text-gray-900">{front}</p>
        </div>
      </div>
      <div
        className={`absolute inset-0 backface-hidden rotate-y-180 ${
          isFlipped ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 flex items-center justify-center text-center">
          <p className="text-xl text-gray-900 whitespace-pre-line">{back}</p>
        </div>
      </div>
    </div>
  );
}

export default FlashcardDisplay;