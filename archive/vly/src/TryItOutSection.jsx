
import React, { useState } from 'react';

const TryItOutSection = () => {
  const [prompt, setPrompt] = useState('');
  const [generatingOutput, setGeneratingOutput] = useState('');
  const [generatedFiles, setGeneratedFiles] = useState([]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleGenerate = () => {
    // Simulate generating output and files
    setGeneratingOutput('Generating landing page...');
    setTimeout(() => {
      setGeneratingOutput('Landing page generated successfully!');
      setGeneratedFiles([
        'index.html',
        'styles.css',
        'script.js',
        // Add more generated files as needed
      ]);
    }, 2000);
  };

  return (
    <div className="bg-white">
      {/* Top gradient */}
      <div
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] px-7 pb-8 pt-9 sm:px-8 sm:pb-14 sm:pt-16 lg:px-56 lg:pb-24 lg:pt-24"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 27.8% 0.4%, 19.8% 4.1%, 0% 27.6%, 76.1% 97.2%, 74.1% 88.8%)',
          }}
        />
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ff80b5] to-[#9089fc] px-7 pb-8 pt-9 sm:px-8 sm:pb-14 sm:pt-16 lg:px-56 lg:pb-24 lg:pt-24"
          style={{
            clipPath:
              'polygon(24.8% 41.9%, 0% 73.2%, 0% 34.9%, 7.5% 0.4%, 12.5% 0%, 72.2% 0.4%, 80.2% 4.1%, 100% 27.6%, 23.9% 97.2%, 25.9% 88.8%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:py-56">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Try It Out
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Experience the power of vly.ai by generating your own landing page with natural language.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <textarea
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              rows={4}
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={handlePromptChange}
            />
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleGenerate}
            >
              Generate
            </button>
          </div>
          {generatingOutput && (
            <div className="mt-10">
              <p className="text-gray-600">{generatingOutput}</p>
              {generatedFiles.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">Generated Files:</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                    {generatedFiles.map((file) => (
                      <li key={file}>{file}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TryItOutSection;
