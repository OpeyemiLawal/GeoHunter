"use client"

interface RulesScreenProps {
  onBackToStart: () => void
  onStartGame: () => void
}

export default function RulesScreen({ onBackToStart, onStartGame }: RulesScreenProps) {
  const handleBackToStart = () => {
    onBackToStart()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white flex flex-col items-center justify-start p-0 sm:p-4 relative overflow-x-hidden">
      {/* Subtle Background Blobs (toned down) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-green-100/30 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-xl mx-auto z-10 flex flex-col flex-1 pt-8 pb-32 px-4 sm:px-0">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl mb-4 shadow">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">How to Play</h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto">Master geography and achieve the perfect score</p>
        </header>

        {/* Steps Section */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><span className="text-blue-400">📝</span>Game Steps</h2>
          <ol className="space-y-6">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-lg">1</span>
              <div>
                <span className="font-semibold text-gray-800">Choose Your Country</span>
                <p className="text-gray-600 text-sm mt-1">A random country flag appears. Study it and prepare to make strategic decisions about its global rankings.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold text-lg">2</span>
              <div>
                <span className="font-semibold text-gray-800">Select Categories</span>
                <p className="text-gray-600 text-sm mt-1">Choose from 8 categories where you think this country ranks well:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Population", "FIFA", "Size", "Crime", "GDP", "Tourism", "Gas", "Coffee"].map((cat) => (
                    <span key={cat} className="bg-white border border-gray-200 rounded px-2 py-1 text-xs text-gray-700 font-medium shadow-sm">{cat}</span>
                  ))}
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold text-lg">3</span>
              <div>
                <span className="font-semibold text-gray-800">Score Calculation</span>
                <p className="text-gray-600 text-sm mt-1">Your score = sum of country's actual global rankings. <span className="font-semibold text-purple-600">Lower scores are better!</span></p>
              </div>
            </li>
          </ol>
        </section>

        {/* Performance Levels */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><span className="text-green-400">🏅</span>Performance Levels</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex flex-col items-center p-3 rounded-lg border border-green-100 bg-green-50">
              <span className="text-2xl">🏆</span>
              <span className="font-bold text-green-700 mt-1">Elite!</span>
              <span className="text-xs text-green-500">{`< 100`}</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg border border-blue-100 bg-blue-50">
              <span className="text-2xl">💪</span>
              <span className="font-bold text-blue-700 mt-1">Strong!</span>
              <span className="text-xs text-blue-500">100-150</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg border border-yellow-100 bg-yellow-50">
              <span className="text-2xl">👍</span>
              <span className="font-bold text-yellow-700 mt-1">Good!</span>
              <span className="text-xs text-yellow-500">151-200</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg border border-red-100 bg-red-50">
              <span className="text-2xl">🔄</span>
              <span className="font-bold text-red-700 mt-1">Try Again!</span>
              <span className="text-xs text-red-500">{`> 200`}</span>
            </div>
          </div>
        </section>

        {/* Tips & Examples */}
        <section className="mb-10 grid gap-4">
          <div className="rounded-xl border border-indigo-100 bg-white/80 p-4">
            <h3 className="font-semibold text-indigo-700 mb-2 flex items-center gap-2"><span className="text-lg">💡</span>Pro Tips</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Think about what each country is famous for</li>
              <li>Consider both obvious and surprising strengths</li>
              <li>Smaller numbers = better global rankings</li>
            </ul>
          </div>
          <div className="rounded-xl border border-orange-100 bg-white/80 p-4">
            <h3 className="font-semibold text-orange-700 mb-2 flex items-center gap-2"><span className="text-lg">🌍</span>Quick Examples</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>🇧🇷 Brazil: Coffee #1, FIFA #4</li>
              <li>🇺🇸 USA: GDP #1, Gas production #1</li>
              <li>🇸🇬 Singapore: Very safe (Crime #2)</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Sticky Action Buttons - CTA */}
      <div className="sticky bottom-0 left-0 w-full z-20 bg-white/95 border-t border-gray-200 shadow px-2 sm:px-0 py-3 flex justify-center">
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
          <button
            onClick={handleBackToStart}
            className="flex-1 group bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-base px-5 py-3 rounded-xl hover:from-blue-600 hover:to-green-600 active:scale-95 transition-all duration-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Start
            </span>
          </button>
          <button
            onClick={onStartGame}
            className="flex-1 group bg-white text-blue-600 font-bold text-base px-5 py-3 rounded-xl hover:bg-blue-50 active:scale-95 transition-all duration-300 shadow border-2 border-blue-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span className="relative z-10 flex items-center justify-center">
              Start Playing
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5V12a1.5 1.5 0 01-1.5 1.5H9m0 0v3m0-3h3m-3 0h-.5a.5.5 0 01-.5-.5V10a.5.5 0 01.5-.5H9z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
