import React, { useCallback } from 'react';
import { Upload, FileText } from 'lucide-react';
import { extractTextFromPDF, processContent } from '../services/pdfService';
import { useCards } from '../context/CardContext';

interface PDFUploaderProps {
  onFileUpload: (file: File) => void;
}

function PDFUploader({ onFileUpload }: PDFUploaderProps) {
  const { setPdfContent } = useCards();

  const processFile = async (file: File) => {
    try {
      const text = await extractTextFromPDF(file);
      const processedContent = await processContent(text, {});
      setPdfContent(processedContent);
      onFileUpload(file);
    } catch (error) {
      console.error('Error processing PDF:', error);
      // Handle error appropriately
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type === 'application/pdf') {
        processFile(file);
      }
    },
    [onFileUpload]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Rest of the component remains the same
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-500 transition-colors duration-200"
      >
        <div className="flex flex-col items-center">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload your study material</h3>
          <p className="text-gray-500 mb-6">Drag and drop your PDF file here, or click to browse</p>
          
          <label className="relative inline-flex items-center px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 cursor-pointer">
            <FileText className="w-5 h-5 mr-2" />
            Choose PDF file
            <input
              type="file"
              className="sr-only"
              accept=".pdf"
              onChange={handleFileInput}
            />
          </label>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Before you begin:</h4>
        <ul className="space-y-2 text-sm text-gray-500">
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
            Make sure your PDF contains clear, readable text
          </li>
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
            The AI works best with structured medical content
          </li>
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
            Recommended file size: under 50MB for optimal processing
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PDFUploader;</content>