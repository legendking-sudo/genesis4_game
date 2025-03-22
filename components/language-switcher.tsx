"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="text-base"
      >
        English
      </Button>
      <Button
        variant={language === "hi" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("hi")}
        className="text-base"
      >
        हिंदी
      </Button>
    </div>
  )
}

