import React, { useState } from 'react';
import data from './data.js';

function EllipsisIcon() {
  return (
    <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
        fill="#BBC0FF"
        fillRule="evenodd"
      />
    </svg>
  );
}

function ActivityCard({ title, color, timeframeData }) {
  const timeframeTextMap = {
    daily: 'Вчора',
    weekly: 'Минулого тижня',
  };

  const { current, previous } = timeframeData;
  const previousText = timeframeTextMap[timeframeData.timeframe] || 'Попередній';

  return (
    <div className={`relative rounded-2xl pt-10 ${color} overflow-hidden`}>
      <div className={`absolute top-0 left-0 right-0 h-10 rounded-t-2xl ${color}`}></div>
      <div className="relative bg-dark-blue hover:bg-card-hover-blue cursor-pointer p-6 rounded-2xl transition-colors duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-lg font-medium">{title}</h2>
          <button className="text-pale-blue hover:text-white">
            <EllipsisIcon />
          </button>
        </div>
        <div className="flex flex-col">
          <p className="text-white text-5xl font-light mb-2">{current}hr{current !== 1 ? 's' : ''}</p>
          <p className="text-pale-blue text-sm">{previousText} - {previous}hrs</p>
        </div>
      </div>
    </div>
  );
}

function UserCard({ timeframe, setTimeframe }) {
  
  const TimeframeButton = ({ period, text }) => {
    const isActive = timeframe === period;
    return (
      <button
        onClick={() => setTimeframe(period)}
        className={`text-lg ${isActive ? 'text-white' : 'text-desaturated-blue hover:text-white'} transition-colors duration-200`}
      >
        {text}
      </button>
    );
  };

  return (
    <div className="bg-dark-blue rounded-2xl row-span-2">
      <div className="bg-blue-600 rounded-2xl p-8">
        <img 
          src="/assets/avatar_male.png" 
          alt="Аватар користувача" 
          className="w-20 h-20 border-4 border-white rounded-full mb-6" 
        />
        <p className="text-pale-blue text-sm mb-1">Звіт на</p>
        <h1 className="text-white text-4xl font-light">Іван Жуков</h1> 
      </div>
      <div className="p-8">
        <ul className="flex flex-col space-y-4">
          <li>
            <TimeframeButton period="daily" text="Щодення" /> 
          </li>
          <li>
            <TimeframeButton period="weekly" text="Щотижня" /> 
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function App() {
  const [timeframe, setTimeframe] = useState('weekly'); 

  return (
    <main className="min-h-screen flex items-center justify-center p-8 font-sans">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <UserCard timeframe={timeframe} setTimeframe={setTimeframe} />
          </div>

          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((activity) => (
                <ActivityCard
                  key={activity.title}
                  title={activity.title}
                  color={activity.color}
                  timeframeData={{
                    ...activity.timeframes[timeframe],
                    timeframe: timeframe
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
