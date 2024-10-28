import React, { useState, useEffect } from 'react';
import { Brain, ThumbsUp, Settings, ArrowRight } from 'lucide-react';
import Card from './common/Card';
import Button from './common/Button';
import ProgressBar from './common/ProgressBar';
import { useCards } from '../context/CardContext';
import { CardGenerator } from '../services/cardGenerator';

interface PreferenceTrainerProps {
  onComplete: () => void;
}

function PreferenceTrainer({ onComplete }: PreferenceTrainerProps) {
  const { preferences, setPreferences, pdfContent, setFlashcards } = useCards();
  const [step, setStep] = useState<'questionnaire' | 'comparison'>('questionnaire');
  const [progress, setProgress] = useState(0);
  const totalPairs = 5;
  const [cardGenerator, setCardGenerator] = useState<CardGenerator | null>(null);
  const [currentPair, setCurrentPair] = useState<[Flashcard, Flashcard]>([
    {
      id: '1',
      front: "Loading...",
      back: "Loading..."
    },
    {
      id: '2',
      front: "Loading...",
      back: "Loading..."
    }
  ]);

  useEffect(() => {
    if (step === 'comparison' && !cardGenerator) {
      const generator = new CardGenerator(preferences);
      generator.setContent(pdfContent);
      setCardGenerator(generator);
      generateNextPair(generator);
    }
  }, [step, cardGenerator, preferences, pdfContent]);

  const generateNextPair = (generator: CardGenerator) => {
    const concept = pdfContent[progress] || 'Sample concept';
    const pair = generator.generateCardPair(concept);
    setCurrentPair([pair.option1, pair.option2]);
  };

  const handlePreferenceChange = (key: keyof typeof preferences, value: any) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const handleQuestionnaireComplete = () => {
    setStep('comparison');
  };

  const handleSelection = (index: number) => {
    if (!cardGenerator) return;

    cardGenerator.updateLearningStyle(index, {
      concept: pdfContent[progress] || 'Sample concept',
      option1: currentPair[0],
      option2: currentPair[1]
    });

    if (progress < totalPairs - 1) {
      setProgress(prev => prev + 1);
      generateNextPair(cardGenerator);
    } else {
      const finalCards = cardGenerator.generateFinalCards();
      setFlashcards(finalCards);
      onComplete();
    }
  };

  // Rest of the component remains the same...
  if (step === 'questionnaire') {
    return (
      <Card>
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Settings className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">Initial Preferences</h2>
        </div>

        <div className="space-y-8">
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-4">
              What type of flashcards do you prefer?
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(['basic', 'cloze', 'qa'] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => handlePreferenceChange('cardStyle', style)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    preferences.cardStyle === style
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <h3 className="font-medium text-gray-900 capitalize mb-2">{style}</h3>
                  <p className="text-sm text-gray-500">
                    {style === 'basic' && 'Question on front, answer on back'}
                    {style === 'cloze' && 'Fill in the blank style'}
                    {style === 'qa' && 'Detailed Q&A format'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-900 block mb-4">
              How detailed should the content be?
            </label>
            <div className="grid grid-cols-2 gap-4">
              {(['concise', 'detailed'] as const).map((length) => (
                <button
                  key={length}
                  onClick={() => handlePreferenceChange('contentLength', length)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    preferences.contentLength === length
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <h3 className="font-medium text-gray-900 capitalize mb-2">{length}</h3>
                  <p className="text-sm text-gray-500">
                    {length === 'concise' && 'Brief, to-the-point content'}
                    {length === 'detailed' && 'More comprehensive explanations'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-900 block">
              Additional Features
            </label>
            <div className="space-y-3">
              {[
                { key: 'includeImages', label: 'Include relevant medical images when available' },
                { key: 'includeMnemonics', label: 'Include helpful mnemonics when available' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences[key as keyof typeof preferences]}
                    onChange={(e) => handlePreferenceChange(key as keyof typeof preferences, e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button icon={ArrowRight} onClick={handleQuestionnaireComplete}>
              Continue to Fine-tuning
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-center space-x-3 mb-8">
        <Brain className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-900">Fine-tune Your Preferences</h2>
      </div>

      <div className="mb-6">
        <ProgressBar progress={progress + 1} total={totalPairs} />
      </div>

      <p className="text-center text-gray-700 mb-6">
        Choose which flashcard style you prefer to help the AI understand your learning preferences
      </p>

      <div className="grid gap-6">
        {[0, 1].map((index) => (
          <div
            key={index}
            onClick={() => handleSelection(index)}
            className="border rounded-lg p-6 cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all duration-200"
          >
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Front:</h3>
              <p className="text-gray-700">{currentPair[index].front}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Back:</h3>
              <p className="text-gray-700">{currentPair[index].back}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="secondary" icon={ThumbsUp}>
                Select this style
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default PreferenceTrainer;