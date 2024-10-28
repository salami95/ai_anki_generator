import React from 'react';
import { Upload, BookOpen, Brain, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import PDFUploader from './components/PDFUploader';
import PreferenceTrainer from './components/PreferenceTrainer';
import FlashcardPreview from './components/FlashcardPreview';
import { CardProvider } from './context/CardContext';

type Step = 'upload' | 'preferences' | 'preview';

function App() {
  const [currentStep, setCurrentStep] = React.useState<Step>('upload');
  const [file, setFile] = React.useState<File | null>(null);

  const steps = [
    { id: 'upload', title: 'Upload PDF', icon: Upload },
    { id: 'preferences', title: 'Train AI', icon: Brain },
    { id: 'preview', title: 'Preview Cards', icon: BookOpen },
  ];

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setCurrentStep('preferences');
  };

  const handlePreferenceComplete = () => {
    setCurrentStep('preview');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'upload':
        return <PDFUploader onFileUpload={handleFileUpload} />;
      case 'preferences':
        return <PreferenceTrainer onComplete={handlePreferenceComplete} />;
      case 'preview':
        return <FlashcardPreview />;
      default:
        return null;
    }
  };

  return (
    <CardProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Brain className="w-8 h-8 text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-900">MedCards AI</h1>
              </div>
              <a
                href="https://apps.ankiweb.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Download Anki
              </a>
            </div>
          </div>
        </header>

        {/* Progress Steps */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center mb-8">
            <nav aria-label="Progress">
              <ol className="flex items-center">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <li key={step.id} className="relative">
                      {index !== 0 && (
                        <div
                          className={`absolute left-0 top-1/2 -ml-px w-full h-0.5 -translate-y-1/2 ${
                            steps.findIndex(s => s.id === currentStep) > index
                              ? 'bg-indigo-600'
                              : 'bg-gray-200'
                          }`}
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex items-center justify-center">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            currentStep === step.id
                              ? 'bg-indigo-600 text-white'
                              : steps.findIndex(s => s.id === currentStep) > index
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          <StepIcon className="w-5 h-5" />
                        </span>
                        <span className="absolute top-10 text-sm font-medium text-gray-700">
                          {step.title}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>

          {/* Main Content */}
          <div className="max-w-3xl mx-auto">{renderStep()}</div>
        </div>
      </div>
    </CardProvider>
  );
}

export default App;</content>