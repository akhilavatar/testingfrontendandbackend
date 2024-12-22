import React from 'react';

export const GreenScreenButton = ({ onClick }) => (
  <div className="w-full flex flex-col items-end justify-center">
    <button
      onClick={onClick}
      className="pointer-events-auto bg-blue-400 hover:bg-blue-500 text-white p-4 rounded-md focus:ring-4 focus:ring-blue-300 shadow-lg shadow-blue-400/50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
      </svg>
    </button>
  </div>
);