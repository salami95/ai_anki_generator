import React, { useState } from 'react';
import { Download, Maximize2, Minimize2 } from 'lucide-react';
import Card from './common/Card';
import Button from './common/Button';
import FlashcardDisplay from './flashcards/FlashcardDisplay';
import NavigationControls from './flashcards/NavigationControls';
import { useCards } from '../context/CardContext';

function FlashcardPreview() {
  const { flashcards } = useCards();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const handleDownload = () => {
    const csvContent = flashcards
      .map(card => `"${card.front}","${card.back}"`)
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'anki-cards.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (flashcards.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <p className="text-gray-500">No flashcards generated yet. Please complete the previous steps.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={isFullscreen ? 'fixed inset-0 z-50' : ''}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Preview Your Flashcards</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
          <Button icon={Download} onClick={handleDownload}>
            Download for Anki
          </Button>
        </div>
      </div>

      <div className="relative">
        <FlashcardDisplay
          front={flashcards[currentIndex].front}
          back={flashcards[currentIndex].back}
          isFlipped={isFlipped}
          onClick={() => setIsFlipped(!isFlipped)}
        />
        <NavigationControls
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>

      <div className="mt-6 flex justify-center">
        <p className="text-sm text-gray-500">
          Card {currentIndex + 1} of {flashcards.length} • Click card to flip
        </p>
      </div>
    </Card>
  );
}

export default FlashcardPreview;