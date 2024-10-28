export interface Flashcard {
  id: string;
  front: string;
  back: string;
  image?: string;
  mnemonic?: string;
}

export interface CardPreference {
  cardStyle: 'basic' | 'cloze' | 'qa';
  contentLength: 'concise' | 'detailed';
  includeImages: boolean;
  includeMnemonics: boolean;
}

export interface CardContext {
  preferences: CardPreference;
  setPreferences: (prefs: CardPreference) => void;
  flashcards: Flashcard[];
  setFlashcards: (cards: Flashcard[]) => void;
  pdfContent: string[];
  setPdfContent: (content: string[]) => void;
}