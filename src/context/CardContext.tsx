import React, { createContext, useContext, useState } from 'react';
import { CardContext, CardPreference, Flashcard } from '../types';

const defaultPreferences: CardPreference = {
  cardStyle: 'basic',
  contentLength: 'concise',
  includeImages: true,
  includeMnemonics: true,
};

const defaultContext: CardContext = {
  preferences: defaultPreferences,
  flashcards: [],
  setFlashcards: () => {},
  pdfContent: [],
  setPdfContent: () => {},
  setPreferences: () => {},
};

const CardContext = createContext<CardContext>(defaultContext);

export function CardProvider({ children }: { children: React.ReactNode }) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [pdfContent, setPdfContent] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<CardPreference>(defaultPreferences);

  return (
    <CardContext.Provider
      value={{
        preferences,
        flashcards,
        setFlashcards,
        pdfContent,
        setPdfContent,
        setPreferences,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export function useCards() {
  return useContext(CardContext);
}