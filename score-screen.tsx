"use client"

import { useRef, useEffect } from "react"
import { didYouKnowFacts } from "./dyk-facts";
import { proTips } from "./pro-tips";

interface GameResult {
  country: string
  category: string
  rank: number
  points: number
  flag: string
}

interface ScoreScreenProps {
  onPlayAgain: () => void
  gameResults?: GameResult[]
  totalScore?: number
}

export default function ScoreScreen({ onPlayAgain, gameResults = [], totalScore = 0 }: ScoreScreenProps) {
  const clickSoundRef = useRef<HTMLAudioElement>(null)
  const completeSoundRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (completeSoundRef.current) {
      completeSoundRef.current.currentTime = 0;
      completeSoundRef.current.play().catch(() => {});
    }
  }, []);

  // Determine message and color based on score
  const getScoreMessage = (score: number) => {
    if (score < 100) return { text: "Elite!", color: "text-green-500", bgColor: "bg-green-500", emoji: "🏆" }
    if (score <= 150) return { text: "Strong!", color: "text-blue-500", bgColor: "bg-blue-500", emoji: "💪" }
    if (score <= 200) return { text: "Just made it!", color: "text-yellow-500", bgColor: "bg-yellow-500", emoji: "👍" }
    return { text: "Try again!", color: "text-red-500", bgColor: "bg-red-500", emoji: "🔄" }
  }

  const scoreMessage = getScoreMessage(totalScore)

  // Get random fact for display
  const randomFact = didYouKnowFacts[Math.floor(Math.random() * didYouKnowFacts.length)]

  // Select 6 unique pro tips, one from each of 6 different arrays
  function getRandomProTips() {
    // Pick 6 unique indices from 0-19
    const indices: number[] = [];
    while (indices.length < 6) {
      const idx = Math.floor(Math.random() * proTips.length);
      if (!indices.includes(idx)) indices.push(idx);
    }
    // For each index, pick a random tip from that array
    return indices.map(i => {
      const arr = proTips[i];
      return arr[Math.floor(Math.random() * arr.length)];
    });
  }
  const randomProTips = getRandomProTips();

  const handlePlayAgain = () => {
    if (clickSoundRef.current) { clickSoundRef.current.currentTime = 0; clickSoundRef.current.play().catch(() => {}); }
    onPlayAgain()
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 flex flex-col overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-md animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-20 h-20 bg-white rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="flex-1 overflow-auto py-6 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl mb-4 shadow-2xl">
              <span className="text-3xl">🎯</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 drop-shadow-lg">Final Score</h1>
            <p className="text-white/90 text-lg font-medium">Here's how you performed</p>
          </div>

          {/* Score Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 mb-6">
            {/* Total Score Display */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center space-x-4 mb-4">
                <div
                  className={`w-12 h-12 ${scoreMessage.bgColor} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <span className="text-2xl">{scoreMessage.emoji}</span>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-bold text-gray-800 mb-1">{totalScore}</div>
                  <div className={`text-xl font-bold ${scoreMessage.color}`}>{scoreMessage.text}</div>
                </div>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full mb-3"></div>
              <p className="text-gray-600 text-base">Total of all 8 country rankings</p>
            </div>

            {/* Detailed Results - Scrollable */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Your Selections</h3>
              <div className="max-h-64 overflow-y-auto space-y-3">
                {gameResults.map((result, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative group">
                          <img
                            src={result.flag || "/placeholder.svg"}
                            alt={`${result.country} flag`}
                            className="w-10 h-7 rounded shadow-sm cursor-pointer transition-all duration-200 group-hover:shadow-md group-hover:scale-105"
                          />
                          {/* Tooltip that appears on hover */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                            {result.country}
                            {/* Small arrow pointing down */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-base font-bold text-gray-800">{result.country}</div>
                          <div className="text-sm text-gray-600 uppercase font-medium flex items-center">
                            {result.category === "Population" && "👥"}
                            {result.category === "FIFA" && "⚽"}
                            {result.category === "Size" && "🗺️"}
                            {result.category === "Crime" && "🛡️"}
                            {result.category === "GDP" && "💰"}
                            {result.category === "Tourism" && "✈️"}
                            {result.category === "Gas" && "⛽"}
                            {result.category === "Coffee" && "☕"}
                            <span className="ml-2">{result.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800 mb-1">
                          Rank #{(() => {
                            if (result.category === "Coffee" && result.rank > 73) {
                              return "73+"
                            } else if (result.category !== "Coffee" && result.rank > 100) {
                              return "100+"
                            }
                            return result.rank
                          })()}
                        </div>
                        <div
                          className={`inline-block px-2 py-1 rounded-full text-sm font-bold ${
                            result.points <= 10
                              ? "bg-green-100 text-green-700"
                              : result.points <= 50
                                ? "bg-blue-100 text-blue-700"
                                : result.points <= 100
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                          }`}
                        >
                          +{result.points} points
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handlePlayAgain}
                className="group bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-base px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-green-600 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl min-h-[48px] touch-manipulation relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Play Again
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group bg-white/10 backdrop-blur-sm text-white font-bold text-base px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all duration-300 border border-white/20 hover:border-white/30 min-h-[48px] touch-manipulation">
                <span className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  Share Results
                </span>
              </button>
            </div>
          </div>

          {/* Enhanced Did You Know Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Random Tip */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-white/90 text-base font-medium mb-3">
                💡 <span className="font-bold">Did You Know?</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">{randomFact}</p>
            </div>

            {/* Strategy Tips */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-white/90 text-base font-medium mb-3">
                🎯 <span className="font-bold">Pro Tips</span>
              </div>
              <ul className="text-white/80 text-sm space-y-1">
                {randomProTips.map((tip, i) => (
                  <li key={i}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Additional Learning Section */}
          <div className="mt-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-center">
                <div className="text-white/90 text-base font-medium mb-3">
                  🌍 <span className="font-bold">Remember:</span> Lower scores mean better global rankings!
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-white/80 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-green-400">Elite!</div>
                    <div>Under 100 points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-400">Strong!</div>
                    <div>100-150 points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-yellow-400">Just made it!</div>
                    <div>151-200 points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-red-400">Try again!</div>
                    <div>200+ points</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio ref={clickSoundRef} preload="auto">
        <source src="/click.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={completeSoundRef} preload="auto">
        <source src="/game-complete.wav" type="audio/wav" />
      </audio>
    </div>
  )
}
