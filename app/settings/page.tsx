"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ChevronLeft, Sun, Moon, Volume2, Type, Eye, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function SettingsPage() {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()

  const [theme, setTheme] = useState("light")
  const [fontSize, setFontSize] = useState(16)
  const [highContrast, setHighContrast] = useState(false)
  const [narrationSpeed, setNarrationSpeed] = useState(1)
  const [narrationVolume, setNarrationVolume] = useState(80)
  const [autoSave, setAutoSave] = useState(true)
  const [keyboardControls, setKeyboardControls] = useState(true)
  const [screenReader, setScreenReader] = useState(false)

  const handleSaveSettings = () => {
    // In a real app, this would save to localStorage or a database
    console.log("Saving settings:", {
      theme,
      fontSize,
      highContrast,
      narrationSpeed,
      narrationVolume,
      autoSave,
      keyboardControls,
      screenReader,
      language,
    })

    // Apply theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    router.push("/")
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="lg" className="text-lg" onClick={() => router.push("/")}>
          <ChevronLeft className="mr-2 h-6 w-6" /> {t("button.home")}
        </Button>
        <h1 className="text-3xl font-bold">{t("settings.title")}</h1>
        <div className="w-12"></div> {/* Spacer for alignment */}
      </div>

      <Card className="mx-auto max-w-4xl border-2">
        <CardHeader>
          <CardTitle className="text-2xl">{t("settings.subtitle")}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t("settings.display")}</h2>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <Globe className="h-6 w-6" />
                <div>
                  <h3 className="text-lg font-medium">{t("settings.language")}</h3>
                  <p className="text-muted-foreground">{t("settings.language.desc")}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={language === "en" ? "default" : "outline"}
                  onClick={() => setLanguage("en")}
                  className="text-base"
                >
                  English
                </Button>
                <Button
                  variant={language === "hi" ? "default" : "outline"}
                  onClick={() => setLanguage("hi")}
                  className="text-base"
                >
                  हिंदी
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                {theme === "light" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                <div>
                  <h3 className="text-lg font-medium">{t("settings.theme")}</h3>
                  <p className="text-muted-foreground">{t("settings.theme.desc")}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">{t("settings.light")}</span>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
                <span className="text-sm">{t("settings.dark")}</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <Type className="h-6 w-6" />
                <div>
                  <h3 className="text-lg font-medium">{t("settings.font")}</h3>
                  <p className="text-muted-foreground">{t("settings.font.desc")}</p>
                </div>
              </div>
              <div className="flex w-1/3 items-center space-x-4">
                <span className="text-sm">A</span>
                <Slider
                  value={[fontSize]}
                  min={12}
                  max={24}
                  step={1}
                  onValueChange={(value) => setFontSize(value[0])}
                />
                <span className="text-lg font-bold">A</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <Eye className="h-6 w-6" />
                <div>
                  <h3 className="text-lg font-medium">{t("settings.contrast")}</h3>
                  <p className="text-muted-foreground">{t("settings.contrast.desc")}</p>
                </div>
              </div>
              <Switch checked={highContrast} onCheckedChange={setHighContrast} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t("settings.narration")}</h2>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <Volume2 className="h-6 w-6" />
                <div>
                  <h3 className="text-lg font-medium">{t("settings.volume")}</h3>
                  <p className="text-muted-foreground">{t("settings.volume.desc")}</p>
                </div>
              </div>
              <div className="flex w-1/3 items-center space-x-4">
                <span className="text-sm">0%</span>
                <Slider
                  value={[narrationVolume]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => setNarrationVolume(value[0])}
                />
                <span className="text-sm">100%</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-6 w-6 items-center justify-center">
                  <span className="text-sm font-bold">1x</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">{t("settings.speed")}</h3>
                  <p className="text-muted-foreground">{t("settings.speed.desc")}</p>
                </div>
              </div>
              <div className="flex w-1/3 items-center space-x-4">
                <span className="text-sm">0.5x</span>
                <Slider
                  value={[narrationSpeed]}
                  min={0.5}
                  max={2}
                  step={0.25}
                  onValueChange={(value) => setNarrationSpeed(value[0])}
                />
                <span className="text-sm">2x</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t("settings.accessibility")}</h2>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <h3 className="text-lg font-medium">{t("settings.screen.reader")}</h3>
                <p className="text-muted-foreground">{t("settings.screen.reader.desc")}</p>
              </div>
              <Switch checked={screenReader} onCheckedChange={setScreenReader} />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <h3 className="text-lg font-medium">{t("settings.keyboard")}</h3>
                <p className="text-muted-foreground">{t("settings.keyboard.desc")}</p>
              </div>
              <Switch checked={keyboardControls} onCheckedChange={setKeyboardControls} />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <h3 className="text-lg font-medium">{t("settings.auto.save")}</h3>
                <p className="text-muted-foreground">{t("settings.auto.save.desc")}</p>
              </div>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" size="lg" className="text-lg" onClick={() => router.push("/")}>
              {t("button.cancel")}
            </Button>
            <Button size="lg" className="text-lg" onClick={handleSaveSettings}>
              {t("button.save")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

