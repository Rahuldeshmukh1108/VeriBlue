"use client"

import { useEffect } from "react"

export function KeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip to main content with Alt+M
      if (event.altKey && event.key === "m") {
        event.preventDefault()
        const mainContent = document.getElementById("main-content")
        if (mainContent) {
          mainContent.focus()
          mainContent.scrollIntoView({ behavior: "smooth" })
        }
      }

      // Skip to navigation with Alt+N
      if (event.altKey && event.key === "n") {
        event.preventDefault()
        const navigation = document.querySelector('[role="navigation"]')
        if (navigation) {
          ;(navigation as HTMLElement).focus()
          navigation.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return null
}
