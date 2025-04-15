"use client"

import type React from "react"

import { useLayoutEffect, useState } from "react"

const ScaledWrapper1920 = ({ children }: { children: React.ReactNode }) => {
  const [dimensions, setDimensions] = useState({ scale: 1, width: "100%" })

  // Using useLayoutEffect to avoid flicker
  useLayoutEffect(() => {
    const updateDimensions = () => {
      // Get the actual viewport width
      const vw = document.documentElement.clientWidth

      // Calculate the scale needed to fit 1920px into the available width
      const scale = vw / 1920

      setDimensions({
        scale,
        // Set width to 100% divided by scale to ensure it fills the screen after scaling
        width: `${100 / scale}%`,
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
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
      className=" bg-primary"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: dimensions.width,
          height: "100vh",
          transform: `scale(${dimensions.scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default ScaledWrapper1920
