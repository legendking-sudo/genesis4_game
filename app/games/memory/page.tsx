"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function MemoryGamePage() {
  const router = useRouter()
  const [cards, setCards] = useState<Array<{ id: number; symbol: string; flipped: boolean; matched: boolean }>>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [difficulty, setDifficulty] = useState("medium") // easy, medium, hard

  // Mythological symbols for the memory game
  const symbols = ["🕉️", "🔱", "☸️", "🪔", "🪘", "🐘", "🐄", "🐍", "🦚", "🧘", "🛕", "🪷", "🌺", "🏹", "🔔", "📿"]

  // Initialize game based on difficulty
  useEffect(() => {
    initializeGame()
  }, [difficulty])

  const initializeGame = () => {
    let pairsCount = 6 // default medium

    if (difficulty === "easy") {
      pairsCount = 4
    } else if (difficulty === "hard") {
      pairsCount = 8
    }

    // Create pairs of cards with symbols
    const selectedSymbols = symbols.slice(0, pairsCount)
    let newCards = []

    for (let i = 0; i < pairsCount; i++) {
      newCards.push({
        id: i * 2,
        symbol: selectedSymbols[i],
        flipped: false,
        matched: false,
      })
      newCards.push({
        id: i * 2 + 1,
        symbol: selectedSymbols[i],
        flipped: false,
        matched: false,
      })
    }

    // Shuffle cards
    newCards = newCards.sort(() => Math.random() - 0.5)

    setCards(newCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setGameComplete(false)
  }

  const handleCardClick = (id: number) => {
    // Ignore if already two cards flipped or this card is already flipped/matched
    if (flippedCards.length === 2) return

    const clickedCard = cards.find((card) => card.id === id)
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return

    // Flip the card
    const updatedCards = cards.map((card) => (card.id === id ? { ...card, flipped: true } : card))
    setCards(updatedCards)

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)

      const firstCard = cards.find((card) => card.id === newFlippedCards[0])
      const secondCard = cards.find((card) => card.id === newFlippedCards[1])

      if (firstCard?.symbol === secondCard?.symbol) {
        // Match found
        setTimeout(() => {
          const matchedCards = cards.map((card) =>
            card.id === newFlippedCards[0] || card.id === newFlippedCards[1] ? { ...card, matched: true } : card,
          )
          setCards(matchedCards)
          setFlippedCards([])
          setMatchedPairs(matchedPairs + 1)

          // Check if game is complete
          if (matchedPairs + 1 === updatedCards.length / 2) {
            setGameComplete(true)
          }
        }, 500)
      } else {
        // No match, flip cards back
        setTimeout(() => {
          const resetCards = cards.map((card) =>
            card.id === newFlippedCards[0] || card.id === newFlippedCards[1] ? { ...card, flipped: false } : card,
          )
          setCards(resetCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const getCardSize = () => {
    if (difficulty === "easy") return "h-32 w-32 text-6xl"
    if (difficulty === "medium") return "h-28 w-28 text-5xl"
    return "h-24 w-24 text-4xl"
  }

  const getGridClass = () => {
    if (difficulty === "easy") return "grid-cols-4"
    if (difficulty === "medium") return "grid-cols-4"
    return "grid-cols-4"
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="lg" className="text-lg" onClick={() => router.push("/")}>
          <ChevronLeft className="mr-2 h-6 w-6" /> Home
        </Button>
        <h1 className="text-3xl font-bold">Memory Match</h1>
        <Button variant="ghost" size="icon" className="h-12 w-12" onClick={initializeGame}>
          <RefreshCw className="h-6 w-6" />
        </Button>
      </div>

      <Card className="mx-auto max-w-4xl border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Match the Mythological Symbols</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={difficulty === "easy" ? "default" : "outline"}
                onClick={() => setDifficulty("easy")}
                className="text-lg"
              >
                Easy
              </Button>
              <Button
                variant={difficulty === "medium" ? "default" : "outline"}
                onClick={() => setDifficulty("medium")}
                className="text-lg"
              >
                Medium
              </Button>
              <Button
                variant={difficulty === "hard" ? "default" : "outline"}
                onClick={() => setDifficulty("hard")}
                className="text-lg"
              >
                Hard
              </Button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-lg">
              Moves: <span className="font-bold">{moves}</span>
            </div>
            <div className="w-1/2">
              <div className="mb-1 text-lg">
                Progress: {matchedPairs} / {cards.length / 2} pairs
              </div>
              <Progress value={(matchedPairs / (cards.length / 2)) * 100} className="h-4" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {gameComplete ? (
            <div className="flex flex-col items-center justify-center space-y-6 py-8">
              <h2 className="text-4xl font-bold text-primary">Congratulations!</h2>
              <p className="text-2xl">
                You completed the game in <span className="font-bold">{moves}</span> moves!
              </p>
              <div className="text-8xl">🎉</div>
              <div className="flex space-x-4">
                <Button size="lg" className="text-xl py-6 px-8" onClick={initializeGame}>
                  Play Again
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-xl py-6 px-8"
                  onClick={() => router.push("/games/patterns")}
                >
                  Try Pattern Quest
                </Button>
              </div>
            </div>
          ) : (
            <div className={`grid ${getGridClass()} gap-4 justify-center`}>
              {cards.map((card) => (
                <button
                  key={card.id}
                  className={`${getCardSize()} flex items-center justify-center rounded-xl border-4 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary ${
                    card.flipped || card.matched
                      ? "border-primary bg-primary/10"
                      : "border-muted-foreground bg-background"
                  }`}
                  onClick={() => handleCardClick(card.id)}
                  disabled={card.flipped || card.matched}
                >
                  {(card.flipped || card.matched) && <span>{card.symbol}</span>}
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

