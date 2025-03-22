"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useStory, type StoryId } from "@/contexts/story-context"
import { Progress } from "@/components/ui/progress"

export default function StorySelectPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { stories, setCurrentStoryId, getUserProgress } = useStory()

  const handleStorySelect = (storyId: StoryId) => {
    setCurrentStoryId(storyId)
    router.push(`/story/${storyId}`)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="lg" className="text-lg" onClick={() => router.push("/")}>
          <ChevronLeft className="mr-2 h-6 w-6" /> {t("button.home")}
        </Button>
        <h1 className="text-3xl font-bold">{t("home.new")}</h1>
        <div className="w-12"></div> {/* Spacer for alignment */}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.values(stories).map((story) => {
          const progress = getUserProgress(story.id)
          const progressPercentage = (progress / story.totalPages) * 100

          return (
            <Card key={story.id} className="border-2 transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl">{story.title}</CardTitle>
                <CardDescription className="text-lg">{story.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={story.coverImage || "/placeholder.svg"}
                  alt={`Cover image for ${story.title}`}
                  className="mx-auto h-[200px] w-full rounded-lg object-cover"
                />

                <div className="mt-4">
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">{progress > 0 ? t("progress.progress") : t("home.new")}</span>
                    {progress > 0 && (
                      <span className="text-sm font-medium">
                        {progress}/{story.totalPages} {t("story.page")}
                      </span>
                    )}
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full text-lg py-4" onClick={() => handleStorySelect(story.id)}>
                  {progress > 0 ? t("button.continue") : t("button.start")}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </main>
  )
}

