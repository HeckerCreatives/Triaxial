"use client"

import type React from "react"

import { useLayoutEffect, useState } from "react"

const ScaledWrapper1920 = ({ children }: { children: React.ReactNode }) => {
  const [dimensions, setDimensions] = useState({ scale: 1, width: "100%", height: "100%" })

  // Using useLayoutEffect to avoid flicker
  useLayoutEffect(() => {
    const updateDimensions = () => {
      // Get the actual viewport width
      const vw = document.documentElement.clientWidth
      const vh = document.documentElement.clientHeight

      // Calculate the scale needed to fit 1920px into the available width
      const scale = vw / 1920
      const scaleh = vh / 1080

      setDimensions({
        scale,
        // Set width to 100% divided by scale to ensure it fills the screen after scaling
        width: `${100 / scale}%`,
        height: `${100 / scaleh}%`
      })
    }

    // Initial calculation
    updateDimensions()

    // Add event listeners for resize and orientation change
    window.addEventListener("resize", updateDimensions)
    window.addEventListener("orientationchange", updateDimensions)

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("orientationchange", updateDimensions)
    }
  }, [])

  return (
    <div
      style={{
        width: "100vw",
        overflow: "hidden",
        position: "relative",

      }}
      className=" h-full bg-primary"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: dimensions.width,
          height: dimensions.height,
          transform: `scale(${dimensions.scale})`,
          transformOrigin: "top left",
        }}

        className=" h-auto"
      >
        {children}
      </div>
    </div>
  )
}

export default ScaledWrapper1920
