"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function WordGamePage() {
  const router = useRouter()
  const [currentWord, setCurrentWord] = useState("")
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [totalRounds] = useState(10)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Word associations in multiple Indian languages
  const wordAssociations = [
    { word: "सूर्य (Surya)", associations: ["चंद्र (Moon)", "प्रकाश (Light)", "दिन (Day)", "ताप (Heat)"] },
    { word: "पानी (Paani)", associations: ["नदी (River)", "समुद्र (Ocean)", "बारिश (Rain)", "प्यास (Thirst)"] },
    { word: "आकाश (Aakash)", associations: ["तारे (Stars)", "बादल (Clouds)", "पक्षी (Birds)", "विमान (Airplane)"] },
    { word: "अग्नि (Agni)", associations: ["धुआँ (Smoke)", "गर्मी (Heat)", "रोशनी (Light)", "जलना (Burn)"] },
    { word: "पृथ्वी (Prithvi)", associations: ["पहाड़ (Mountain)", "समुद्र (Ocean)", "जंगल (Forest)", "मिट्टी (Soil)"] },
    { word: "वायु (Vayu)", associations: ["हवा (Wind)", "साँस (Breath)", "तूफान (Storm)", "पंखा (Fan)"] },
    { word: "गणेश (Ganesha)", associations: ["हाथी (Elephant)", "मूषक (Mouse)", "बुद्धि (Wisdom)", "मोदक (Sweet)"] },
    { word: "कृष्ण (Krishna)", associations: ["बांसुरी (Flute)", "गोपियां (Gopis)", "अर्जुन (Arjuna)", "द्वारका (Dwarka)"] },
    { word: "राम (Rama)", associations: ["अयोध्या (Ayodhya)", "सीता (Sita)", "हनुमान (Hanuman)", "धनुष (Bow)"] },
    { word: "शिव (Shiva)", associations: ["त्रिशूल (Trident)", "डमरू (Damaru)", "नंदी (Nandi)", "गंगा (Ganga)"] },
    { word: "दुर्गा (Durga)", associations: ["शक्ति (Power)", "सिंह (Lion)", "त्रिशूल (Trident)", "नवरात्रि (Navratri)"] },
    { word: "लक्ष्मी (Lakshmi)", associations: ["धन (Wealth)", "कमल (Lotus)", "उल्लू (Owl)", "दीपावली (Diwali)"] },
  ]

  // Initialize game
  useEffect(() => {
    startNewRound()
  }, [])

  const startNewRound = () => {
    // Select a random word
    const randomIndex = Math.floor(Math.random() * wordAssociations.length)
    const wordObj = wordAssociations[randomIndex]

    setCurrentWord(wordObj.word)

    // Get the correct association
    const correctAssociation = wordObj.associations[0]

    // Get three random incorrect associations from other words
    const incorrectAssociations = []
    const otherWords = wordAssociations.filter((_, i) => i !== randomIndex)

    while (incorrectAssociations.length < 3) {
      const randomWordIndex = Math.floor(Math.random() * otherWords.length)
      const randomAssociationIndex = Math.floor(Math.random() * otherWords[randomWordIndex].associations.length)
      const randomAssociation = otherWords[randomWordIndex].associations[randomAssociationIndex]

      if (!incorrectAssociations.includes(randomAssociation) && randomAssociation !== correctAssociation) {
        incorrectAssociations.push(randomAssociation)
      }
    }

    // Combine and shuffle options
    const allOptions = [correctAssociation, ...incorrectAssociations]
    setOptions(allOptions.sort(() => Math.random() - 0.5))

    setSelectedOption(null)
    setIsCorrect(null)
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)

    // Check if the selected option is correct
    const wordObj = wordAssociations.find((w) => w.word === currentWord)
    const isAnswerCorrect = wordObj?.associations[0] === option

    setIsCorrect(isAnswerCorrect)

    if (isAnswerCorrect) {
      setScore(score + 10)
    }

    // Move to next round after a delay
    setTimeout(() => {
      if (round < totalRounds) {
        setRound(round + 1)
        startNewRound()
      }
    }, 1500)
  }

  const resetGame = () => {
    setScore(0)
    setRound(1)
    startNewRound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="lg" className="text-lg" onClick={() => router.push("/")}>
          <ChevronLeft className="mr-2 h-6 w-6" /> Home
        </Button>
        <h1 className="text-3xl font-bold">Word Wisdom</h1>
        <Button variant="ghost" size="icon" className="h-12 w-12" onClick={resetGame}>
          <RefreshCw className="h-6 w-6" />
        </Button>
      </div>

      <Card className="mx-auto max-w-4xl border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Word Associations</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="text-lg">
                Round:{" "}
                <span className="font-bold">
                  {round}/{totalRounds}
                </span>
              </div>
              <div className="text-lg">
                Score: <span className="font-bold">{score}</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-1 text-lg">Progress</div>
            <Progress value={(round / totalRounds) * 100} className="h-4" />
          </div>
        </CardHeader>

        <CardContent>
          {round <= totalRounds ? (
            <div className="py-4 text-center">
              <h3 className="mb-6 text-2xl">Select the word most closely associated with:</h3>
              <div className="mb-8 rounded-lg border-2 border-primary bg-primary/10 p-6">
                <span className="text-4xl font-bold">{currentWord}</span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedOption === option ? (isCorrect ? "default" : "destructive") : "outline"}
                    className={`h-20 text-xl ${
                      selectedOption &&
                      selectedOption !== option &&
                      wordAssociations.find((w) => w.word === currentWord)?.associations[0] === option
                        ? "border-green-500 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : ""
                    }`}
                    onClick={() => handleOptionSelect(option)}
                    disabled={selectedOption !== null}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {selectedOption && (
                <div
                  className={`mt-6 rounded-lg p-4 text-center ${
                    isCorrect
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  <h3 className="text-2xl font-bold">{isCorrect ? "Correct!" : "Incorrect!"}</h3>
                  <p className="text-lg">
                    {isCorrect
                      ? "Great job! Moving to the next word..."
                      : `The correct association was: ${wordAssociations.find((w) => w.word === currentWord)?.associations[0]}`}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-6 py-8">
              <h2 className="text-4xl font-bold text-primary">Game Complete!</h2>
              <p className="text-2xl">
                Your final score: <span className="font-bold">{score}</span> out of {totalRounds * 10}
              </p>
              <div className="text-8xl">🏆</div>
              <div className="flex space-x-4">
                <Button size="lg" className="text-xl py-6 px-8" onClick={resetGame}>
                  Play Again
                </Button>
                <Button variant="outline" size="lg" className="text-xl py-6 px-8" onClick={() => router.push("/")}>
                  Return Home
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

