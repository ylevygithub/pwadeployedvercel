import React from 'react';

const Screenshots = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Desktop Screenshot Template */}
      <div 
        className="w-[1920px] h-[1080px] bg-gray-900 overflow-hidden"
        id="desktop-screenshot"
      >
        <div className="relative h-[70vh]">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50">
            <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
              <h1 className="text-6xl font-bold text-white mb-4">MoviePWA</h1>
              <p className="text-2xl text-gray-300 mb-6">
                Your personal movie companion app
              </p>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-medium">
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h2 className="text-3xl font-bold text-white mb-8">Popular Movies</h2>
          <div className="grid grid-cols-5 gap-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg shadow-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Screenshot Template */}
      <div 
        className="w-[750px] h-[1334px] bg-gray-900 overflow-hidden mt-8"
        id="mobile-screenshot"
      >
        <div className="relative h-[50vh]">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50">
            <div className="absolute bottom-0 left-0 p-6 max-w-xl">
              <h1 className="text-4xl font-bold text-white mb-3">MoviePWA</h1>
              <p className="text-lg text-gray-300 mb-4">
                Your personal movie companion app
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium">
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-8">
          <h2 className="text-2xl font-bold text-white mb-6">Popular Movies</h2>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg shadow-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screenshots;