import React, { useState } from 'react';
import { Award, Play, Pause, RotateCcw } from 'lucide-react';
import CarGame from './components/CarGame';

function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal');
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [lastCrashAt, setLastCrashAt] = useState<number | null>(null);

  const handleStartPause = () => {
    setIsRunning((r: boolean) => !r);
  };

  const handleReset = () => {
    setIsRunning(false);
    setScore(0);
    setLastCrashAt(null);
  };

  const handleScoreChange = (next: number) => {
    setScore(next);
    setBestScore((b: number) => (next > b ? next : b));
  };

  const handleCrash = () => {
    setIsRunning(false);
    setLastCrashAt(Date.now());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-indigo-600 text-white text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Award className="h-8 w-8" />
            Turbo Lane
          </h1>
          <p className="text-indigo-200 mt-1">Simple car racing — avoid traffic and chase the high score</p>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="mb-4 grid grid-cols-2 gap-3 w-full">
              <div className="flex items-center justify-center gap-3 bg-indigo-50 text-indigo-800 rounded-lg py-2">
                <span className="font-semibold">Score</span>
                <span className="text-xl">{score}</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-amber-50 text-amber-800 rounded-lg py-2">
                <span className="font-semibold">Best</span>
                <span className="text-xl">{bestScore}</span>
              </div>
            </div>

            <CarGame
              isRunning={isRunning}
              onScoreChange={handleScoreChange}
              onCrash={handleCrash}
              difficulty={difficulty}
            />

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleStartPause}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
              <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2">
                <label htmlFor="difficulty" className="text-sm text-gray-600">Difficulty</label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDifficulty(e.target.value as 'easy' | 'normal' | 'hard')}
                  className="bg-transparent outline-none text-gray-800"
                >
                  <option value="easy">Easy</option>
                  <option value="normal">Normal</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              {lastCrashAt && !isRunning && (
                <span className="text-red-600 text-sm">Crashed! Tap Start to try again.</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-2">How to play</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Use Left/Right arrow keys or on-screen buttons</li>
                <li>Avoid red cars, survive to score</li>
                <li>Change difficulty for more challenge</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-2">Mobile friendly</h3>
              <p className="text-sm text-gray-700">Responsive canvas and large touch controls for phones.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
