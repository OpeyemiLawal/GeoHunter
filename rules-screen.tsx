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
    <div className="h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 flex items-center justify-center p-3 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/3 w-20 h-20 bg-white/10 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl w-full mx-auto relative z-10 border border-white/30 h-[92vh] flex flex-col overflow-hidden max-w-3xl lg:max-w-4xl xl:max-w-4xl">
        {/* Header - Fixed */}
        <div className="text-center p-6 sm:p-8 flex-shrink-0 border-b border-gray-100">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl mb-3 sm:mb-4 shadow-lg">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-2 tracking-tight">How to Play</h1>
          <p className="text-gray-700 text-base sm:text-lg lg:text-xl font-medium max-w-2xl mx-auto">Master geography and achieve the perfect score</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full mt-3"></div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none p-5 sm:p-8">
          {/* Game Steps - Compact Layout */}
          <div className="grid gap-4 mb-8">
            {/* Step 1 */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 sm:p-5 rounded-2xl border border-blue-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 flex items-center gap-2"><span>Choose Your Country</span> <span className='text-blue-400'>🌐</span></h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">A random country flag appears. Study it and prepare to make strategic decisions about its global rankings.</p>
                </div>
              </div>
            </div>
            {/* Step 2 */}
            <div className="bg-gradient-to-r from-green-50 to-purple-50 p-4 sm:p-5 rounded-2xl border border-green-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 flex items-center gap-2"><span>Select Categories</span> <span className='text-green-400'>📊</span></h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-2">Choose from 8 categories where you think this country ranks well:</p>
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {["Population", "FIFA", "Size", "Crime", "GDP", "Tourism", "Gas", "Coffee"].map((category) => (
                      <span
                        key={category}
                        className="bg-white px-2 sm:px-3 py-1 rounded text-xs font-semibold text-gray-700 border border-gray-200 text-center shadow"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Step 3 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-5 rounded-2xl border border-purple-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 flex items-center gap-2"><span>Score Calculation</span> <span className='text-purple-400'>🧮</span></h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">Your score = sum of country's actual global rankings. <span className="font-semibold text-purple-600">Lower scores are better!</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Levels - Compact Grid */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 tracking-tight">Performance Levels</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-green-400 to-green-500 p-4 rounded-2xl text-white shadow-lg text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">🏆</div>
                <div className="text-base sm:text-lg font-bold">Elite!</div>
                <div className="text-green-100 font-medium text-xs">{"< 100"}</div>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-4 rounded-2xl text-white shadow-lg text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">💪</div>
                <div className="text-base sm:text-lg font-bold">Strong!</div>
                <div className="text-blue-100 font-medium text-xs">100-150</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 rounded-2xl text-white shadow-lg text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">👍</div>
                <div className="text-base sm:text-lg font-bold">Good!</div>
                <div className="text-yellow-100 font-medium text-xs">151-200</div>
              </div>
              <div className="bg-gradient-to-br from-red-400 to-red-500 p-4 rounded-2xl text-white shadow-lg text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">🔄</div>
                <div className="text-base sm:text-lg font-bold">Try Again!</div>
                <div className="text-red-100 font-medium text-xs">{"> 200"}</div>
              </div>
            </div>
          </div>

          {/* Two Column Layout for Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
            {/* Pro Tips */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 sm:p-5 rounded-2xl border border-indigo-100">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-center gap-2"><span className="text-xl sm:text-2xl">💡</span>Pro Tips</h3>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                <li className="flex items-start"><span className="text-indigo-500 mr-2 mt-1">•</span><span>Think about what each country is famous for</span></li>
                <li className="flex items-start"><span className="text-indigo-500 mr-2 mt-1">•</span><span>Consider both obvious and surprising strengths</span></li>
                <li className="flex items-start"><span className="text-indigo-500 mr-2 mt-1">•</span><span>Smaller numbers = better global rankings</span></li>
              </ul>
            </div>
            {/* Quick Examples */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 sm:p-5 rounded-2xl border border-orange-100">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-center gap-2"><span className="text-xl sm:text-2xl">🌍</span>Quick Examples</h3>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                <li className="flex items-start"><span className="text-orange-500 mr-2 mt-1">•</span><span>🇧🇷 Brazil: Coffee #1, FIFA #4</span></li>
                <li className="flex items-start"><span className="text-orange-500 mr-2 mt-1">•</span><span>🇺🇸 USA: GDP #1, Gas production #1</span></li>
                <li className="flex items-start"><span className="text-orange-500 mr-2 mt-1">•</span><span>🇸🇬 Singapore: Very safe (Crime #2)</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="flex-shrink-0 p-6 sm:p-8 border-t border-gray-100 bg-white/95">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleBackToStart}
              className="flex-1 group bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-green-600 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl min-h-[48px] touch-manipulation relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Start
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={onStartGame}
              className="flex-1 group bg-white text-blue-600 font-bold text-base sm:text-lg px-6 sm:px-8 py-4 rounded-2xl hover:bg-blue-50 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-blue-200 hover:border-blue-300 min-h-[48px] touch-manipulation relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <span className="relative z-10 flex items-center justify-center">
                Start Playing
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5V12a1.5 1.5 0 01-1.5 1.5H9m0 0v3m0-3h3m-3 0h-.5a.5.5 0 01-.5-.5V10a.5.5 0 01.5-.5H9z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
