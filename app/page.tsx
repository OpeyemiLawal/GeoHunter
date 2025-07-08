"use client"

import { useState } from "react"
import StartScreen from "@/start-screen"
import GameBoard from "@/game-board"
import ScoreScreen from "@/score-screen"
import RulesScreen from "@/rules-screen"

type Screen = "start" | "game" | "score" | "rules"

interface GameResult {
  country: string
  category: string
  rank: number
  points: number
  flag: string
}

export default function GeoHunterApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("start")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [gameResults, setGameResults] = useState<GameResult[]>([])
  const [finalScore, setFinalScore] = useState(0)

  const navigateToScreen = (newScreen: Screen) => {
    if (newScreen === currentScreen || isTransitioning) return

    setIsTransitioning(true)

    setTimeout(() => {
      setCurrentScreen(newScreen)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 200)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "start":
        return (
          <StartScreen onStartGame={() => navigateToScreen("game")} onHowToPlay={() => navigateToScreen("rules")} />
        )
      case "game":
        return (
          <GameBoard
            onGameComplete={(results) => {
              setGameResults(results)
              setFinalScore(results.reduce((sum, result) => sum + result.points, 0))
              navigateToScreen("score")
            }}
            onBackToMenu={() => navigateToScreen("start")}
          />
        )
      case "score":
        return (
          <ScoreScreen onPlayAgain={() => navigateToScreen("game")} gameResults={gameResults} totalScore={finalScore} />
        )
      case "rules":
        return (
          <RulesScreen onBackToStart={() => navigateToScreen("start")} onStartGame={() => navigateToScreen("game")} />
        )
      default:
        return (
          <StartScreen onStartGame={() => navigateToScreen("game")} onHowToPlay={() => navigateToScreen("rules")} />
        )
    }
  }

  return (
    <div className="font-sans">
      <div className={`transition-opacity duration-200 ease-out ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {renderScreen()}
      </div>
    </div>
  )
}
