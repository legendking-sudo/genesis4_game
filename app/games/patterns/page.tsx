"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function PatternGamePage() {
  const router = useRouter()
  const [level, setLevel] = useState(1)
  const [pattern, setPattern] = useState<string[]>([])
  const [userPattern, setUserPattern] = useState<string[]>([])
  const [isShowingPattern, setIsShowingPattern] = useState(true)
  const [gameStatus, setGameStatus] = useState<"playing" | "success" | "failed">("playing")
  const [score, setScore] = useState(0)

  // Mythological symbols for the pattern game
  const symbols = ["🔱", "🕉️", "☸️", "🪔", "🪘", "🐘", "🐄", "🐍"]

  // Initialize game
  useEffect(() => {
    startLevel()
  }, [level])

  const startLevel = () => {
    // Generate a pattern based on the current level
    const newPattern = []
    for (let i = 0; i < level + 2; i++) {
      const randomIndex = Math.floor(Math.random() * symbols.length)
      newPattern.push(symbols[randomIndex])
    }

    setPattern(newPattern)
    setUserPattern([])
    setIsShowingPattern(true)
    setGameStatus("playing")

    // Show the pattern for a few seconds, then hide it
    setTimeout(
      () => {
        setIsShowingPattern(false)
      },
      3000 + level * 500,
    ) // Longer display time for higher levels
  }

  const handleSymbolClick = (symbol: string) => {
    if (isShowingPattern || gameStatus !== "playing") return

    const newUserPattern = [...userPattern, symbol]
    setUserPattern(newUserPattern)

    // Check if the user's pattern matches so far
    const isCorrectSoFar = newUserPattern.every((s, i) => s === pattern[i])

    if (!isCorrectSoFar) {
      // Pattern is incorrect
      setGameStatus("failed")
      return
    }

    if (newUserPattern.length === pattern.length) {
      // Pattern is complete and correct
      setGameStatus("success")
      setScore(score + level * 10)

      // Move to next level after a delay
      setTimeout(() => {
        setLevel(level + 1)
      }, 1500)
    }
  }

  const resetGame = () => {
    setLevel(1)
    setScore(0)
    startLevel()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="lg" className="text-lg" onClick={() => router.push("/")}>
          <ChevronLeft className="mr-2 h-6 w-6" /> Home
        </Button>
        <h1 className="text-3xl font-bold">Pattern Quest</h1>
        <Button variant="ghost" size="icon" className="h-12 w-12" onClick={resetGame}>
          <RefreshCw className="h-6 w-6" />
        </Button>
      </div>

      <Card className="mx-auto max-w-4xl border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Remember the Pattern</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="text-lg">
                Level: <span className="font-bold">{level}</span>
              </div>
              <div className="text-lg">
                Score: <span className="font-bold">{score}</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-1 flex justify-between">
              <span className="text-lg">{isShowingPattern ? "Memorize the pattern..." : "Recreate the pattern"}</span>
              <span className="text-lg">
                {userPattern.length} / {pattern.length}
              </span>
            </div>
            <Progress value={(userPattern.length / pattern.length) * 100} className="h-4" />
          </div>
        </CardHeader>

        <CardContent>
          {gameStatus === "success" && (
            <div className="mb-6 rounded-lg bg-green-100 p-4 text-center text-green-800 dark:bg-green-900/30 dark:text-green-300">
              <h3 className="text-2xl font-bold">Correct Pattern!</h3>
              <p className="text-lg">Moving to level {level + 1}...</p>
            </div>
          )}

          {gameStatus === "failed" && (
            <div className="mb-6 rounded-lg bg-red-100 p-4 text-center text-red-800 dark:bg-red-900/30 dark:text-red-300">
              <h3 className="text-2xl font-bold">Incorrect Pattern</h3>
              <p className="text-lg">The correct pattern was:</p>
              <div className="mt-2 flex justify-center space-x-4">
                {pattern.map((symbol, index) => (
                  <div
                    key={index}
                    className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-red-500 bg-background text-3xl"
                  >
                    {symbol}
                  </div>
                ))}
              </div>
              <Button className="mt-4 text-lg" onClick={() => startLevel()}>
                Try Again
              </Button>
            </div>
          )}

          {isShowingPattern && gameStatus === "playing" && (
            <div className="py-4 text-center">
              <h3 className="mb-4 text-2xl">Remember this pattern:</h3>
              <div className="flex justify-center space-x-4">
                {pattern.map((symbol, index) => (
                  <div
                    key={index}
                    className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-primary bg-primary/10 text-4xl"
                  >
                    {symbol}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isShowingPattern && gameStatus === "playing" && (
            <div className="py-4 text-center">
              <h3 className="mb-4 text-2xl">Recreate the pattern:</h3>
              <div className="mb-8 flex justify-center space-x-4">
                {userPattern.map((symbol, index) => (
                  <div
                    key={index}
                    className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-primary bg-primary/10 text-4xl"
                  >
                    {symbol}
                  </div>
                ))}
                {Array(pattern.length - userPattern.length)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground"
                    >
                      <span className="text-muted-foreground">?</span>
                    </div>
                  ))}
              </div>

              <div className="grid grid-cols-4 gap-4">
                {symbols.map((symbol, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 w-20 text-4xl"
                    onClick={() => handleSymbolClick(symbol)}
                  >
                    {symbol}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

