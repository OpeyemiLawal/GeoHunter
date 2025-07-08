"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { getRandomCountries, generateShuffleFlags, type CountryData } from "./countries-data"
import { useIsMobile } from "./hooks/use-mobile"

interface GameBoardProps {
  onGameComplete?: (results: GameResult[]) => void
  onBackToMenu?: () => void
}

interface GameResult {
  country: string
  category: string
  rank: number
  points: number
  flag: string
}

export default function GameBoard({ onGameComplete, onBackToMenu }: GameBoardProps = {}) {
  const [score, setScore] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [categoryFlags, setCategoryFlags] = useState<Record<string, { flag: string; country: string; rank: number }>>(
    {},
  )
  const [feedback, setFeedback] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [draggedOver, setDraggedOver] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [gameResults, setGameResults] = useState<GameResult[]>([])
  const [isEasyMode, setIsEasyMode] = useState(true)
  const [allCategoriesDisabled, setAllCategoriesDisabled] = useState(false)

  // Flag animation states
  const [isAnimating, setIsAnimating] = useState(true)
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [currentRound, setCurrentRound] = useState(0)

  // Session data - randomly selected countries
  const [sessionCountries, setSessionCountries] = useState<CountryData[]>(() => getRandomCountries(8))
  const [shuffleFlags, setShuffleFlags] = useState<string[]>([])

  // Get current country data
  const currentCountry = sessionCountries[currentRound]
  const finalFlag = currentCountry?.flag || "/placeholder.svg"

  // Initialize shuffle flags for current country
  useEffect(() => {
    if (currentCountry) {
      const flags = generateShuffleFlags(currentCountry, sessionCountries)
      setShuffleFlags(flags)
    }
  }, [currentCountry, sessionCountries])

  // Simplified category data
  const categories = [
    { name: "Population", icon: "👥" },
    { name: "FIFA", icon: "⚽" },
    { name: "Size", icon: "🗺️" },
    { name: "Crime", icon: "🛡️" },
    { name: "GDP", icon: "💰" },
    { name: "Tourism", icon: "✈️" },
    { name: "Gas", icon: "⛽" },
    { name: "Coffee", icon: "☕" },
  ]

  // Flag shuffling animation effect
  useEffect(() => {
    if (isAnimating && shuffleFlags.length > 0) {
      const interval = setInterval(() => {
        setCurrentFlagIndex((prevIndex) => {
          const nextIndex = prevIndex + 1
          if (nextIndex >= shuffleFlags.length) {
            setIsAnimating(false)
            setAnimationComplete(true)
            clearInterval(interval)
            return prevIndex
          }
          return nextIndex
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }, [isAnimating, shuffleFlags.length])

  const dropSoundRef = useRef<HTMLAudioElement>(null)
  const shuffleSoundRef = useRef<HTMLAudioElement>(null)
  const completeSoundRef = useRef<HTMLAudioElement>(null)

  const startNextRound = () => {
    if (currentRound < 7) {
      setCurrentRound(currentRound + 1)
      setCurrentFlagIndex(0)
      setIsAnimating(true)
      setAnimationComplete(false)
      setAllCategoriesDisabled(false) // Re-enable categories for next round

      // Play shuffle sound
      if (shuffleSoundRef.current) {
        shuffleSoundRef.current.currentTime = 0
        shuffleSoundRef.current.play().catch(() => {})
      }
    }
  }

  const handleCategorySelect = (category: string) => {
    if (selectedCategories.includes(category) || isAnimating || !currentCountry || allCategoriesDisabled) return

    // Immediately disable all categories
    setAllCategoriesDisabled(true)

    // Play drop sound
    if (dropSoundRef.current) {
      dropSoundRef.current.currentTime = 0
      dropSoundRef.current.play().catch(() => {})
    }

    // Get the actual ranking for this country and category
    const rank = currentCountry.rankings[category as keyof typeof currentCountry.rankings]
    const points = rank

    const newSelectedCategories = [...selectedCategories, category]
    setSelectedCategories(newSelectedCategories)

    // Store the flag in the category with ranking
    setCategoryFlags((prev) => ({
      ...prev,
      [category]: {
        flag: finalFlag,
        country: currentCountry.name,
        rank: rank,
      },
    }))

    // Add to game results
    const newResult: GameResult = {
      country: currentCountry.name,
      category: category,
      rank: rank,
      points: points,
      flag: finalFlag,
    }
    setGameResults((prev) => [...prev, newResult])

    setScore(score + points)
    setFeedback(`${currentCountry.name} → ${category} → Rank ${rank} → +${points} points`)
    setShowFeedback(true)

    // Check if this is the last flag (8th flag) and session is complete
    if (currentRound >= 7) {
      setTimeout(() => {
        setShowFeedback(false)
        setTimeout(() => {
          const finalResults = [...gameResults, newResult]
          // Play completion sound
          if (completeSoundRef.current) {
            completeSoundRef.current.currentTime = 0
            completeSoundRef.current.play().catch(() => {})
          }
          onGameComplete?.(finalResults)
        }, 500)
      }, 2000)
    } else {
      setTimeout(() => {
        setShowFeedback(false)
        setTimeout(() => {
          startNextRound()
        }, 500)
      }, 2000)
    }
  }

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent) => {
    if (isAnimating) {
      e.preventDefault()
      return
    }
    setIsDragging(true)
    e.dataTransfer.setData("text/plain", "flag")
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setDraggedOver(null)
  }

  const handleDragOver = (e: React.DragEvent, categoryName: string) => {
    e.preventDefault()
    if (!selectedCategories.includes(categoryName) && !isAnimating) {
      setDraggedOver(categoryName)
    }
  }

  const handleDragLeave = () => {
    setDraggedOver(null)
  }

  const handleDrop = (e: React.DragEvent, categoryName: string) => {
    e.preventDefault()
    setDraggedOver(null)
    setIsDragging(false)

    if (!selectedCategories.includes(categoryName) && !isAnimating) {
      handleCategorySelect(categoryName)
    }
  }

  const sessionProgress = ((currentRound + 1) / 8) * 100

  const isMobile = useIsMobile();

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xs">🌍</span>
              </div>
              <h1 className="text-lg font-bold text-gray-800 hidden sm:block">Geo Hunter</h1>
              <h1 className="text-base font-bold text-gray-800 sm:hidden">GeoHunter</h1>
            </div>

            {/* Mobile Layout */}
            <div className="flex items-center space-x-2 sm:hidden">
              <div className="text-right">
                <div className="text-xs text-gray-500 font-medium">SCORE</div>
                <div className="text-lg font-bold text-gray-800">{score}</div>
              </div>

              <div className="flex items-center bg-gray-100 rounded-full p-0.5">
                <button
                  onClick={() => setIsEasyMode(true)}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    isEasyMode ? "bg-green-500 text-white shadow-md" : "text-gray-600"
                  }`}
                >
                  Easy
                </button>
                <button
                  onClick={() => setIsEasyMode(false)}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    !isEasyMode ? "bg-red-500 text-white shadow-md" : "text-gray-600"
                  }`}
                >
                  Hard
                </button>
              </div>

              <button
                onClick={() => {
                  setScore(0)
                  setSelectedCategories([])
                  setCategoryFlags({})
                  setGameResults([])
                  setCurrentRound(0)
                  setCurrentFlagIndex(0)
                  setIsAnimating(true)
                  setAnimationComplete(false)
                  setAllCategoriesDisabled(false)
                  onBackToMenu?.()
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium p-2 rounded-xl transition-all duration-200 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={() => {
                  setScore(0)
                  setSelectedCategories([])
                  setCategoryFlags({})
                  setGameResults([])
                  setCurrentRound(0)
                  setCurrentFlagIndex(0)
                  setIsAnimating(true)
                  setAnimationComplete(false)
                  setAllCategoriesDisabled(false)
                  onBackToMenu?.()
                }}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-xl transition-all duration-200 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-sm">Menu</span>
              </button>

              <button
                onClick={() => {
                  setScore(0)
                  setSelectedCategories([])
                  setCategoryFlags({})
                  setGameResults([])
                  setCurrentRound(0)
                  setCurrentFlagIndex(0)
                  setIsAnimating(true)
                  setAnimationComplete(false)
                  setFeedback("")
                  setShowFeedback(false)
                  setDraggedOver(null)
                  setIsDragging(false)
                  setAllCategoriesDisabled(false)
                  setSessionCountries(getRandomCountries(8))
                }}
                className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-3 py-2 rounded-xl transition-all duration-200 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="text-sm">Restart</span>
              </button>
            </div>

            {/* Difficulty Toggle - Desktop */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setIsEasyMode(true)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isEasyMode ? "bg-green-500 text-white shadow-md" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Easy
                </button>
                <button
                  onClick={() => setIsEasyMode(false)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    !isEasyMode ? "bg-red-500 text-white shadow-md" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Hard
                </button>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-500 font-medium">SCORE</div>
                <div className="text-xl font-bold text-gray-800">{score}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 py-4">
          {/* Session Progress */}
          <div className="mb-4">
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Session Progress</span>
                <span className="text-sm font-bold text-gray-800">Flag {currentRound + 1} of 8</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${sessionProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Flag Section */}
            <div className="p-6 text-center">
              {isAnimating ? (
                <>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    <span className="inline-flex items-center">
                      <span className="animate-pulse">🎰</span>
                      <span className="ml-2">Shuffling Cards...</span>
                      <span className="animate-pulse ml-2">🎰</span>
                    </span>
                  </h2>
                  <div className="relative inline-block mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-6 shadow-2xl border-2 border-blue-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-green-400/10 animate-pulse"></div>
                      <div className="absolute top-2 left-2 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
                      <div
                        className="absolute top-2 right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <div
                        className="absolute bottom-2 left-2 w-4 h-4 bg-purple-400 rounded-full animate-ping"
                        style={{ animationDelay: "1s" }}
                      ></div>
                      <div
                        className="absolute bottom-2 right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"
                        style={{ animationDelay: "1.5s" }}
                      ></div>

                      <div className="relative z-10">
                        <img
                          src={shuffleFlags[currentFlagIndex] || "/placeholder.svg"}
                          alt="Shuffling Flag"
                          className="w-32 h-auto sm:w-40 md:w-48 rounded-xl select-none transition-all duration-150 transform shadow-lg"
                          style={{
                            animation: "flagFlip 0.2s ease-in-out",
                            filter: "brightness(1.1) contrast(1.1)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center space-x-2 mb-3">
                    <div className="flex space-x-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            i <= currentFlagIndex ? "bg-blue-500 scale-125" : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-base font-medium">
                    <span className="inline-flex items-center">
                      <span className="animate-spin mr-2">⚡</span>
                      Revealing your challenge...
                      <span className="animate-spin ml-2">⚡</span>
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    {isEasyMode ? "Which country is this?" : "Identify this flag!"}
                  </h2>
                  <div className="relative inline-block mb-6">
                    <div
                      className={`bg-white rounded-2xl p-4 shadow-lg border border-gray-100 transition-all duration-200 cursor-move ${
                        isDragging ? "opacity-50 scale-95" : "hover:shadow-xl"
                      } ${animationComplete ? "animate-in zoom-in duration-500" : ""}`}
                    >
                      <div className="relative group">
                        <img
                          src={finalFlag || "/placeholder.svg"}
                          alt="Country Flag"
                          className="w-32 h-auto sm:w-40 md:w-48 rounded-lg select-none transition-all duration-200 group-hover:scale-105"
                          draggable={!isAnimating}
                          onDragStart={handleDragStart}
                          onDragEnd={handleDragEnd}
                        />
                        {/* Country name display based on difficulty mode */}
                        {animationComplete && currentCountry && (
                          <>
                            {/* Easy Mode: Always show country name */}
                            {isEasyMode && (
                              <div className="mt-3">
                                <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg font-bold text-base border border-green-200">
                                  {currentCountry.name}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    {!isDragging && animationComplete && !isMobile && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full animate-in slide-in-from-bottom duration-300">
                        Drag me!
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-base mb-4">
                    {isEasyMode
                      ? "Drag the flag to a category or click on the categories below"
                      : "Test your geography skills - drag the flag to the best categories!"}
                  </p>
                </>
              )}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className="mx-6 mb-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 animate-in slide-in-from-top duration-300">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-green-800 font-medium text-sm">{feedback}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Categories Grid */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((category) => {
                  const isSelected = selectedCategories.includes(category.name)
                  const isDraggedOver = draggedOver === category.name
                  const isDisabled = isAnimating || isSelected || allCategoriesDisabled
                  const categoryFlag = categoryFlags[category.name]

                  return (
                    <button
                      key={category.name}
                      onClick={() => handleCategorySelect(category.name)}
                      onDragOver={(e) => handleDragOver(e, category.name)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, category.name)}
                      disabled={isDisabled}
                      className={`
                        relative rounded-2xl p-4 min-h-[4rem] transition-all duration-200 touch-manipulation
                        ${
                          isSelected
                            ? "bg-green-50 border-2 border-green-300 cursor-not-allowed shadow-md"
                            : isAnimating
                              ? "bg-gray-50 border-2 border-gray-100 cursor-not-allowed opacity-40"
                              : isDraggedOver
                                ? "bg-blue-50 border-2 border-blue-400 shadow-lg scale-105"
                                : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-md active:scale-95 cursor-pointer"
                        }
                      `}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        {isSelected && categoryFlag ? (
                          // Show the flag that was dropped here with ranking
                          <div className="flex flex-col items-center">
                            <img
                              src={categoryFlag.flag || "/placeholder.svg"}
                              alt={`${categoryFlag.country} flag`}
                              className="w-6 h-4 rounded mb-1 shadow-sm"
                            />
                            <span className="text-xs font-semibold text-green-700 uppercase">{category.name}</span>
                            <span className="text-xs text-green-600 mt-1">{categoryFlag.country}</span>
                            <div className="mt-1 flex items-center space-x-1">
                              <span className="text-xs text-gray-500">Rank</span>
                              <div
                                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                  categoryFlag.rank <= 10
                                    ? "bg-green-100 text-green-700"
                                    : categoryFlag.rank <= 50
                                      ? "bg-blue-100 text-blue-700"
                                      : categoryFlag.rank <= 100
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                              >
                                #{(() => {
                                  if (category.name === "Coffee" && categoryFlag.rank > 73) {
                                    return "73+"
                                  } else if (category.name !== "Coffee" && categoryFlag.rank > 100) {
                                    return "100+"
                                  }
                                  return categoryFlag.rank
                                })()}
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Show the original category icon
                          <>
                            <div
                              className={`text-xl mb-1 ${isSelected ? "grayscale" : isAnimating ? "grayscale opacity-50" : ""}`}
                            >
                              {category.icon}
                            </div>
                            <span
                              className={`text-xs font-semibold uppercase ${
                                isSelected
                                  ? "text-gray-400"
                                  : isAnimating
                                    ? "text-gray-300"
                                    : isDraggedOver
                                      ? "text-blue-600"
                                      : "text-gray-700"
                              }`}
                            >
                              {category.name}
                            </span>
                          </>
                        )}
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {isDraggedOver && !isSelected && !isAnimating && (
                        <div className="absolute inset-0 bg-blue-400/20 rounded-2xl flex items-center justify-center">
                          <div className="text-blue-600 font-bold text-sm">Drop here!</div>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Elements */}
      <audio ref={dropSoundRef} preload="auto">
        <source src="/sounds/drop.mp3" type="audio/mpeg" />
        <source src="/sounds/drop.wav" type="audio/wav" />
      </audio>
      <audio ref={shuffleSoundRef} preload="auto">
        <source src="/sounds/shuffle.mp3" type="audio/mpeg" />
        <source src="/sounds/shuffle.wav" type="audio/wav" />
      </audio>
      <audio ref={completeSoundRef} preload="auto">
        <source src="/sounds/complete.mp3" type="audio/mpeg" />
        <source src="/sounds/complete.wav" type="audio/wav" />
      </audio>

      <style jsx>{`
        @keyframes flagFlip {
          0% { 
            transform: scale(1) rotateY(0deg); 
            filter: brightness(1) contrast(1);
          }
          25% { 
            transform: scale(0.95) rotateY(-5deg); 
            filter: brightness(1.2) contrast(1.2);
          }
          50% { 
            transform: scale(1.05) rotateY(0deg); 
            filter: brightness(1.3) contrast(1.3);
          }
          75% { 
            transform: scale(0.98) rotateY(5deg); 
            filter: brightness(1.1) contrast(1.1);
          }
          100% { 
            transform: scale(1) rotateY(0deg); 
            filter: brightness(1) contrast(1);
          }
        }
      `}</style>
    </div>
  )
}
