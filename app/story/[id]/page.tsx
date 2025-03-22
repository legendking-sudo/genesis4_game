"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Settings } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { useLanguage } from "@/contexts/language-context"
import { useStory, type StoryId } from "@/contexts/story-context"

export default function StoryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { t } = useLanguage()
  const { stories, setCurrentStoryId, markPageCompleted } = useStory()

  const [currentPage, setCurrentPage] = useState(1)
  const [isNarrating, setIsNarrating] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showControls, setShowControls] = useState(false)

  const storyId = params.id as StoryId
  const story = stories[storyId]

  // Set current story in context
  useEffect(() => {
    setCurrentStoryId(storyId)
  }, [storyId, setCurrentStoryId])

  // Mark current page as completed
  useEffect(() => {
    if (story) {
      markPageCompleted(storyId, currentPage)
    }
  }, [currentPage, storyId, markPageCompleted, story])

  // Redirect if story not found
  useEffect(() => {
    if (!story) {
      router.push("/story/select")
    }
  }, [story, router])

  if (!story) {
    return null
  }

  // Mock narration functionality
  const toggleNarration = () => {
    setIsNarrating(!isNarrating)
    if (!isNarrating) {
      // In a real app, this would trigger text-to-speech
      console.log(`Starting narration at speed ${playbackSpeed}`)
    } else {
      console.log("Stopping narration")
    }
  }

  const goToNextPage = () => {
    if (currentPage < story.totalPages) {
      setCurrentPage(currentPage + 1)
    } else {
      // Show completion dialog or redirect to a cognitive exercise
      router.push(`/games/memory?storyId=${storyId}`)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="lg" className="text-lg" onClick={() => router.push("/")}>
          <ChevronLeft className="mr-2 h-6 w-6" /> {t("button.home")}
        </Button>
        <h1 className="text-3xl font-bold">{story.title}</h1>
        <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => router.push("/settings")}>
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      <Card className="mx-auto max-w-4xl border-2">
        <CardContent className="p-6">
          <img
            src={story.pages[currentPage - 1].image || "/placeholder.svg"}
            alt={`Illustration for page ${currentPage} of ${story.title}`}
            className="mx-auto mb-6 h-[300px] w-full rounded-lg object-cover"
          />

          <p className="mb-8 text-center text-2xl leading-relaxed">{story.pages[currentPage - 1].content}</p>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="lg"
              className="h-16 w-16 rounded-full p-0"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">
                {t("story.page")} {currentPage - 1}
              </span>
            </Button>

            <div className="flex flex-col items-center">
              <Button variant="outline" size="lg" className="mb-2 h-16 w-16 rounded-full p-0" onClick={toggleNarration}>
                {isNarrating ? <VolumeX className="h-8 w-8" /> : <Volume2 className="h-8 w-8" />}
                <span className="sr-only">{isNarrating ? t("story.narration.stop") : t("story.narration.start")}</span>
              </Button>

              <Button variant="ghost" size="sm" className="text-lg" onClick={() => setShowControls(!showControls)}>
                {t("story.speed")}: {playbackSpeed}x
              </Button>

              {showControls && (
                <div className="mt-2 w-48">
                  <Slider
                    value={[playbackSpeed]}
                    min={0.5}
                    max={2}
                    step={0.25}
                    onValueChange={(value) => setPlaybackSpeed(value[0])}
                  />
                </div>
              )}
            </div>

            <Button variant="outline" size="lg" className="h-16 w-16 rounded-full p-0" onClick={goToNextPage}>
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">
                {t("story.page")} {currentPage + 1}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-center">
        <div className="flex space-x-2">
          {Array.from({ length: story.totalPages }).map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              size="sm"
              className="h-12 w-12 rounded-full"
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </main>
  )
}

