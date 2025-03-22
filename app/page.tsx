"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

interface Temple {
  id: number
  name: string
  videoId: string
  thumbnail: string
}

export default function HomePage() {
  const { t } = useLanguage()

  const temples: Temple[] = [
    {
      id: 1,
      name: "Sirdi Sai",
      videoId: "RtlMoDHvn9g", // replace with actual YouTube video ID
      thumbnail: "/kuch_accha.jpg",
    },
    {
      id: 2,
      name: "Mahakaleshwar",
      videoId: "_RoV-sueMWs",
      thumbnail: "/templeB.jpg",
    },
    {
      id: 3,
      name: "SiddhiVinayak",
      videoId: "UNiXSxk2BXs",
      thumbnail: "/templeC.jpg",
    },
  ]

  const [selectedTempleIndex, setSelectedTempleIndex] = useState(0)
  const selectedTemple = temples[selectedTempleIndex]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <div className="flex w-full justify-end">
          <LanguageSwitcher />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
          {t("app.title")}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t("app.subtitle")}
        </p>

        <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">{t("home.continue")}</CardTitle>
              <CardDescription className="text-lg">{t("home.continue.desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="/kuch_accha.jpg?height=500&width=320"
                alt="A scene from Indian mythology showing a character from your previous story"
                className="mx-auto h-[200px] w-full rounded-lg object-cover"
              />
            </CardContent>
            <CardFooter>
              <Link href="/story/continue" className="w-full">
                <Button className="w-full text-xl py-6" size="lg">
                  {t("button.continue")}
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">{t("home.new")}</CardTitle>
              <CardDescription className="text-lg">{t("home.new.desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="/kuch_accha.jpg?height=100&width=320"
                alt="A collection of Indian mythology stories to choose from"
                className="mx-auto h-[200px] w-full rounded-lg object-cover"
              />
            </CardContent>
            <CardFooter>
              <Link href="/story/select" className="w-full">
                <Button className="w-full text-xl py-6" size="lg">
                  {t("button.new")}
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Live Darshan Section with Slider */}
          <Card className="border-2 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">{t("temple.head")}</CardTitle>
              <CardDescription className="text-lg">{t("temple.desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Embedded Live Stream */}
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedTemple.videoId}`}
                  title={`Live Darshan - ${selectedTemple.name}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
              {/* Temple Slider */}
              <div className="flex items-center justify-center gap-4 overflow-x-auto py-2">
                {temples.map((temple, index) => (
                  <button
                    key={temple.id}
                    onClick={() => setSelectedTempleIndex(index)}
                    className={`flex flex-col items-center space-y-2 rounded-lg border p-2 transition-all duration-200 ${
                      selectedTempleIndex === index
                        ? "border-primary scale-105"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={temple.thumbnail}
                      alt={temple.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <span className="text-sm">{temple.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">{t("home.challenges")}</CardTitle>
              <CardDescription className="text-lg">{t("home.challenges.desc")}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border-2 p-4">
                <img
                  src="/memorygameka.svg?height=100&width=150"
                  alt="Memory game icon"
                  className="h-24 w-26 rounded-lg"
                />
                <h3 className="text-xl font-medium">{t("home.memory")}</h3>
                <Link href="/games/memory" className="w-full">
                  <Button variant="outline" className="w-full text-lg py-4">
                    {t("button.play")}
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col items-center space-y-2 rounded-lg border-2 p-4">
                <img
                  src="/placeholder10.svg?height=100&width=100"
                  alt="Pattern recognition game icon"
                  className="h-24 w-24 rounded-full"
                />
                <h3 className="text-xl font-medium">{t("home.patterns")}</h3>
                <Link href="/games/patterns" className="w-full">
                  <Button variant="outline" className="w-full text-lg py-4">
                    {t("button.play")}
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col items-center space-y-2 rounded-lg border-2 p-4">
                <img
                  src="/word_wisdom.svg?height=100&width=100"
                  alt="Word association game icon"
                  className="h-24 w-24 rounded-lg"
                />
                <h3 className="text-xl font-medium">{t("home.words")}</h3>
                <Link href="/games/words" className="w-full">
                  <Button variant="outline" className="w-full text-lg py-4">
                    {t("button.play")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-4">
          <Link href="/settings">
            <Button variant="outline" className="text-lg py-6 px-8" size="lg">
              {t("button.settings")}
            </Button>
          </Link>
          <Link href="/progress">
            <Button variant="outline" className="text-lg py-6 px-8" size="lg">
              {t("button.progress")}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
