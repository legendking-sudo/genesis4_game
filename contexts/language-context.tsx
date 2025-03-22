"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "en" | "hi"

// Define the context type
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

// Translation data
const translations = {
  en: {
    // Home page
    "app.title": "Mythical Minds",
    "app.subtitle": "A cognitive wellness journey through Indian mythology",
    "home.continue": "Continue Your Journey",
    "home.continue.desc": "Resume where you left off",
    "home.new": "Start New Adventure",
    "home.new.desc": "Explore a different story",
    "home.challenges": "Daily Challenges",
    "home.challenges.desc": "Exercise your mind with today's activities",
    "home.memory": "Memory Match",
    "home.patterns": "Pattern Quest",
    "home.words": "Word Wisdom",
    "button.play": "Play",
    "button.continue": "Continue Story",
    "button.new": "New Story",
    "button.settings": "Settings",
    "button.progress": "My Progress",
    "button.home": "Home",

    // Story page
    "story.page": "Page",
    "story.narration.start": "Start narration",
    "story.narration.stop": "Stop narration",
    "story.speed": "Speed",
    "button.start":"Start the story",

    // Games
    "memory.title": "Memory Match",
    "memory.subtitle": "Match the Mythological Symbols",
    "memory.moves": "Moves",
    "memory.progress": "Progress",
    "memory.pairs": "pairs",
    "memory.congrats": "Congratulations!",
    "memory.completed": "You completed the game in",
    "memory.moves.count": "moves",

    "patterns.title": "Pattern Quest",
    "patterns.subtitle": "Remember the Pattern",
    "patterns.level": "Level",
    "patterns.score": "Score",
    "patterns.memorize": "Memorize the pattern...",
    "patterns.recreate": "Recreate the pattern",
    "patterns.correct": "Correct Pattern!",
    "patterns.moving": "Moving to level",
    "patterns.incorrect": "Incorrect Pattern",
    "patterns.correct.pattern": "The correct pattern was:",
    "patterns.try.again": "Try Again",
    "patterns.remember": "Remember this pattern:",

    "words.title": "Word Wisdom",
    "words.subtitle": "Word Associations",
    "words.round": "Round",
    "words.select": "Select the word most closely associated with:",
    "words.correct": "Correct!",
    "words.incorrect": "Incorrect!",
    "words.great": "Great job! Moving to the next word...",
    "words.association": "The correct association was:",
    "words.complete": "Game Complete!",
    "words.final": "Your final score:",
    "words.out.of": "out of",
    "temple.head":"Live Darshan",
    "temple.desc":"You can watch Temples live darshan",
    "templea.head":"Siddhivinak",

    // Common game buttons
    "button.play.again": "Play Again",
    "button.try.pattern": "Try Pattern Quest",
    "button.return.home": "Return Home",

    // Settings
    "settings.title": "Settings",
    "settings.subtitle": "Accessibility & Preferences",
    "settings.display": "Display Settings",
    "settings.theme": "Theme",
    "settings.theme.desc": "Choose between light and dark mode",
    "settings.light": "Light",
    "settings.dark": "Dark",
    "settings.font": "Font Size",
    "settings.font.desc": "Adjust the text size for better readability",
    "settings.contrast": "High Contrast",
    "settings.contrast.desc": "Increase contrast for better visibility",
    "settings.narration": "Narration Settings",
    "settings.volume": "Narration Volume",
    "settings.volume.desc": "Adjust the volume of story narration",
    "settings.speed": "Narration Speed",
    "settings.speed.desc": "Adjust the speed of story narration",
    "settings.accessibility": "Accessibility Options",
    "settings.screen.reader": "Screen Reader Support",
    "settings.screen.reader.desc": "Optimize content for screen readers",
    "settings.keyboard": "Keyboard Controls",
    "settings.keyboard.desc": "Enable navigation using keyboard shortcuts",
    "settings.auto.save": "Auto-Save Progress",
    "settings.auto.save.desc": "Automatically save your progress",
    "settings.language": "Language",
    "settings.language.desc": "Choose your preferred language",
    "button.cancel": "Cancel",
    "button.save": "Save Settings",

    // Progress
    "progress.title": "My Progress",
    "progress.story": "Story Progress",
    "progress.completed": "Completed Stories",
    "progress.cognitive": "Cognitive Performance",
    "progress.exercises": "Exercises Completed",
    "progress.accuracy": "Average Accuracy",
    "progress.game": "Game Performance",
    "progress.times": "Times Played",
    "progress.avg.score": "Average Score",
    "progress.improvement": "Improvement",
    "progress.performance": "Performance",
    "progress.assessment": "Cognitive Wellness Assessment",
    "progress.assessment.text":
      "Your cognitive skills are showing steady improvement! Memory games show the strongest progress, while word association exercises have the most room for growth. We recommend focusing on Word Wisdom games to balance your cognitive development.",
  },
  hi: {
    // Home page
    "app.title": "पौराणिक मन",
    "app.subtitle": "भारतीय पौराणिक कथाओं के माध्यम से संज्ञानात्मक कल्याण की यात्रा",
    "home.continue": "अपनी यात्रा जारी रखें",
    "home.continue.desc": "जहां छोड़ा था वहां से फिर शुरू करें",
    "home.new": "नई कहानी शुरू करें",
    "home.new.desc": "एक अलग कहानी का अन्वेषण करें",
    "home.challenges": "दैनिक चुनौतियां",
    "home.challenges.desc": "आज की गतिविधियों के साथ अपने दिमाग का व्यायाम करें",
    "home.memory": "स्मृति मिलान",
    "home.patterns": "पैटर्न खोज",
    "home.words": "शब्द ज्ञान",
    "button.play": "खेलें",
    "button.continue": "कहानी जारी रखें",
    "button.new": "नई कहानी",
    "button.settings": "सेटिंग्स",
    "button.progress": "मेरी प्रगति",
    "button.home": "होम",
    "temple.head":"लाइव दर्शन",
    "temple.desc":"आप मंदिरों का लाइव दर्शन देख सकते हैं",
    "templea.head":"सिद्धिविनायक",

    // Story page
    "story.page": "पृष्ठ",
    "story.narration.start": "कथन शुरू करें",
    "story.narration.stop": "कथन रोकें",
    "story.speed": "गति",
    "button.start":"कहानी शुरू करें",

    // Games
    "memory.title": "स्मृति मिलान",
    "memory.subtitle": "पौराणिक प्रतीकों का मिलान करें",
    "memory.moves": "चालें",
    "memory.progress": "प्रगति",
    "memory.pairs": "जोड़े",
    "memory.congrats": "बधाई हो!",
    "memory.completed": "आपने खेल पूरा कर लिया",
    "memory.moves.count": "चालों में",

    "patterns.title": "पैटर्न खोज",
    "patterns.subtitle": "पैटर्न याद रखें",
    "patterns.level": "स्तर",
    "patterns.score": "स्कोर",
    "patterns.memorize": "पैटर्न याद करें...",
    "patterns.recreate": "पैटर्न को फिर से बनाएं",
    "patterns.correct": "सही पैटर्न!",
    "patterns.moving": "स्तर पर जा रहे हैं",
    "patterns.incorrect": "गलत पैटर्न",
    "patterns.correct.pattern": "सही पैटर्न था:",
    "patterns.try.again": "फिर से प्रयास करें",
    "patterns.remember": "इस पैटर्न को याद रखें:",

    "words.title": "शब्द ज्ञान",
    "words.subtitle": "शब्द संबंध",
    "words.round": "राउंड",
    "words.select": "इससे सबसे निकटता से जुड़े शब्द का चयन करें:",
    "words.correct": "सही!",
    "words.incorrect": "गलत!",
    "words.great": "बहुत अच्छा! अगले शब्द पर जा रहे हैं...",
    "words.association": "सही संबंध था:",
    "words.complete": "खेल पूरा हुआ!",
    "words.final": "आपका अंतिम स्कोर:",
    "words.out.of": "में से",

    // Common game buttons
    "button.play.again": "फिर से खेलें",
    "button.try.pattern": "पैटर्न खोज आज़माएं",
    "button.return.home": "होम पर वापस जाएं",

    // Settings
    "settings.title": "सेटिंग्स",
    "settings.subtitle": "पहुंच और प्राथमिकताएं",
    "settings.display": "डिस्प्ले सेटिंग्स",
    "settings.theme": "थीम",
    "settings.theme.desc": "लाइट और डार्क मोड के बीच चुनें",
    "settings.light": "लाइट",
    "settings.dark": "डार्क",
    "settings.font": "फ़ॉन्ट आकार",
    "settings.font.desc": "बेहतर पठनीयता के लिए टेक्स्ट का आकार समायोजित करें",
    "settings.contrast": "उच्च कंट्रास्ट",
    "settings.contrast.desc": "बेहतर दृश्यता के लिए कंट्रास्ट बढ़ाएं",
    "settings.narration": "कथन सेटिंग्स",
    "settings.volume": "कथन वॉल्यूम",
    "settings.volume.desc": "कहानी के कथन का वॉल्यूम समायोजित करें",
    "settings.speed": "कथन गति",
    "settings.speed.desc": "कहानी के कथन की गति समायोजित करें",
    "settings.accessibility": "पहुंच विकल्प",
    "settings.screen.reader": "स्क्रीन रीडर समर्थन",
    "settings.screen.reader.desc": "स्क्रीन रीडर के लिए सामग्री को अनुकूलित करें",
    "settings.keyboard": "कीबोर्ड नियंत्रण",
    "settings.keyboard.desc": "कीबोर्ड शॉर्टकट का उपयोग करके नेविगेशन सक्षम करें",
    "settings.auto.save": "स्वतः सहेजें प्रगति",
    "settings.auto.save.desc": "अपनी प्रगति को स्वचालित रूप से सहेजें",
    "settings.language": "भाषा",
    "settings.language.desc": "अपनी पसंदीदा भाषा चुनें",
    "button.cancel": "रद्द करें",
    "button.save": "सेटिंग्स सहेजें",

    // Progress
    "progress.title": "मेरी प्रगति",
    "progress.story": "कहानी प्रगति",
    "progress.completed": "पूरी की गई कहानियां",
    "progress.cognitive": "संज्ञानात्मक प्रदर्शन",
    "progress.exercises": "पूरे किए गए अभ्यास",
    "progress.accuracy": "औसत सटीकता",
    "progress.game": "खेल प्रदर्शन",
    "progress.times": "खेले गए समय",
    "progress.avg.score": "औसत स्कोर",
    "progress.improvement": "सुधार",
    "progress.performance": "प्रदर्शन",
    "progress.assessment": "संज्ञानात्मक कल्याण मूल्यांकन",
    "progress.assessment.text":
      "आपके संज्ञानात्मक कौशल में लगातार सुधार दिख रहा है! स्मृति खेल सबसे मजबूत प्रगति दिखाते हैं, जबकि शब्द संबंध अभ्यासों में सुधार की सबसे अधिक गुंजाइश है। हम आपके संज्ञानात्मक विकास को संतुलित करने के लिए शब्द ज्ञान खेलों पर ध्यान केंद्रित करने की सलाह देते हैं।",
  },
}

// Create the provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load saved language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hi")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

