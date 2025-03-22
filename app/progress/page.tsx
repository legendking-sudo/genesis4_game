"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/contexts/language-context"
import { useStory } from "@/contexts/story-context"
import { ChartContainer, ChartGrid, ChartLineSeries, ChartTooltip, ChartXAxis, ChartYAxis } from "@/components/ui/chart"

export default function ProgressPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { stories, getUserProgress, getCompletedStories } = useStory()

  const completedStories = getCompletedStories().length
  const totalStories = Object.keys(stories).length

  // Mock data for exercises
  const completedExercises = 24
  const exerciseAccuracy = 78

  // Mock data for performance chart
  const performanceData = [
    { date: "Day 1", score: 65 },
    { date: "Day 2", score: 68 },
    { date: "Day 3", score: 72 },
    { date: "Day 4", score: 70 },
    { date: "Day 5", score: 75 },
    { date: "Day 6", score: 78 },
    { date: "Day 7", score: 82 },
  ]

  // Mock data for game performance
  const gamePerformance = [
    { game: "Memory Match", plays: 12, avgScore: 85, improvement: "+12%" },
    { game: "Pattern Quest", plays: 8, avgScore: 72, improvement: "+8%" },
    { game: "Word Wisdom", plays: 4, avgScore: 65, improvement: "+5%" },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="lg" className="text-lg" onClick={() => router.push("/")}>
          <ChevronLeft className="mr-2 h-6 w-6" /> {t("button.home")}
        </Button>
        <h1 className="text-3xl font-bold">{t("progress.title")}</h1>
        <div className="w-12"></div> {/* Spacer for alignment */}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">{t("progress.story")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-lg">{t("progress.completed")}</span>
                  <span className="text-lg font-bold">
                    {completedStories}/{totalStories}
                  </span>
                </div>
                <Progress value={(completedStories / totalStories) * 100} className="h-4" />
              </div>

              <div className="grid gap-4">
                {Object.values(stories).map((story) => {
                  const progress = getUserProgress(story.id)
                  const progressPercentage = (progress / story.totalPages) * 100

                  return (
                    <div key={story.id} className="rounded-lg border p-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">{story.title}</h3>
                        <span
                          className={
                            progressPercentage === 100
                              ? "text-green-600 dark:text-green-400"
                              : "text-amber-600 dark:text-amber-400"
                          }
                        >
                          {progressPercentage === 100 ? t("progress Completed") : t("In progress")}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="mt-2 h-2" />
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">{t("progress Cognitive")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer className="h-[300px]" xAxisLabel="Day" yAxisLabel="Score">
                <ChartGrid />
                <ChartXAxis />
                <ChartYAxis />
                <ChartLineSeries
                  data={performanceData}
                  xAccessor={(d) => d.date}
                  yAccessor={(d) => d.score}
                  className="stroke-primary"
                />
                <ChartTooltip />
              </ChartContainer>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-lg">{t("progress Exercises")}</span>
                <span className="text-lg font-bold">{completedExercises}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">{t("progress Accuracy")}</span>
                <span className="text-lg font-bold">{exerciseAccuracy}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">{t("progress Game")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 text-lg font-medium">{t("progress.game")}</th>
                    <th className="pb-2 text-lg font-medium">{t("progress.times")}</th>
                    <th className="pb-2 text-lg font-medium">{t("progress.avg.score")}</th>
                    <th className="pb-2 text-lg font-medium">{t("progress.improvement")}</th>
                    <th className="pb-2 text-lg font-medium">{t("progress.performance")}</th>
                  </tr>
                </thead>
                <tbody>
                  {gamePerformance.map((game, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4 text-lg font-medium">
                        {t(`${game.game}`)}
                      </td>
                      <td className="py-4 text-lg">{game.plays}</td>
                      <td className="py-4 text-lg">{game.avgScore}%</td>
                      <td className="py-4 text-lg text-green-600 dark:text-green-400">{game.improvement}</td>
                      <td className="py-4">
                        <Progress value={game.avgScore} className="h-4 w-32" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-lg border-2 border-primary bg-primary/10 p-4">
              <h3 className="mb-2 text-xl font-bold">{t("progress.assessment")}</h3>
              <p className="text-lg">{t("progress.assessment.text")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

