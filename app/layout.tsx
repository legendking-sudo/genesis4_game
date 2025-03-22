import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { StoryProvider } from "@/contexts/story-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mythical Minds - Cognitive Wellness Game",
  description: "A cognitive wellness journey through Indian mythology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <StoryProvider>{children}</StoryProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

