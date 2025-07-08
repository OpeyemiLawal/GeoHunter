"use client"

import { useRef } from "react"

interface StartScreenProps {
  onStartGame: () => void
  onHowToPlay: () => void
}

export default function StartScreen({ onStartGame, onHowToPlay }: StartScreenProps) {
  const clickSoundRef = useRef<HTMLAudioElement>(null)

  const handleStartGame = () => {
    if (clickSoundRef.current) { clickSoundRef.current.currentTime = 0; clickSoundRef.current.play().catch(() => {}); }
    onStartGame()
  }

  const handleHowToPlay = () => {
    if (clickSoundRef.current) { clickSoundRef.current.currentTime = 0; clickSoundRef.current.play().catch(() => {}); }
    onHowToPlay()
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-md"></div>
      </div>

      <div className="text-center space-y-8 relative z-10 max-w-md mx-auto">
        {/* Game Title with enhanced styling */}
        <div className="space-y-3">
          <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl font-sans tracking-wide drop-shadow-lg">
            Geo Hunter
          </h1>
          <p className="text-white/90 text-lg sm:text-xl font-light tracking-wide">Test your geography knowledge</p>
        </div>

        {/* Enhanced button container */}
        <div className="flex flex-col items-center space-y-3">
          {/* Start Game Button with improved styling */}
          <button
            onClick={handleStartGame}
            className="group bg-white text-blue-600 font-bold text-xl px-10 py-4 rounded-2xl hover:bg-blue-50 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-3xl min-h-[56px] min-w-[200px] touch-manipulation border-2 border-transparent hover:border-blue-200 relative overflow-hidden"
          >
            <span className="relative z-10">Start Game</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* How to Play Button with professional styling */}
          <button
            onClick={handleHowToPlay}
            className="bg-white/10 backdrop-blur-sm text-white font-semibold text-lg px-8 py-3 rounded-xl hover:bg-white/20 active:scale-95 transition-all duration-300 border border-white/20 hover:border-white/30 min-h-[48px] min-w-[180px] touch-manipulation"
          >
            How to Play
          </button>
        </div>

        {/* Subtle game preview hint */}
        <div className="pt-4">
          <div className="flex justify-center space-x-2 opacity-60">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>

      <audio ref={clickSoundRef} preload="auto">
        <source src="/click.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}
