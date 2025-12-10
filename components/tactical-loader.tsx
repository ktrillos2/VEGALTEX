"use client"

import React, { useState, useEffect } from "react"
import "./tactical-loader.css"

export function TacticalLoader() {
    const [progress, setProgress] = useState(0)
    const [isSystemReady, setIsSystemReady] = useState(false)
    const [shouldUnmount, setShouldUnmount] = useState(false)

    useEffect(() => {
        let timeoutId: NodeJS.Timeout

        const simulateLoading = () => {
            setProgress((prev) => {
                const increment = Math.floor(Math.random() * 3) + 1
                const nextProgress = prev + increment

                if (nextProgress >= 100) {
                    setIsSystemReady(true)

                    // Trigger exit animation
                    setTimeout(() => {
                        // Let the exit animation play (controlled by CSS class)
                        // Then unmount
                        setTimeout(() => {
                            setShouldUnmount(true)
                        }, 800) // Match animation duration
                    }, 500) // Delay before exit starts

                    return 100
                }

                // Continue loading
                timeoutId = setTimeout(simulateLoading, Math.random() * 100 + 30)
                return nextProgress
            })
        }

        // Start loading after a short initial delay
        timeoutId = setTimeout(simulateLoading, 800)

        return () => clearTimeout(timeoutId)
    }, [])

    if (shouldUnmount) return null

    return (
        <div className={`tactical-loader-wrapper ${isSystemReady ? "wrapper-exit" : ""}`}>
            <div className={`loader-container ${isSystemReady ? "loader-exit" : ""}`}>
                {/* Scanline decorativo */}
                <div className="scanline"></div>

                {/* Anillos */}
                <div className="ring-thin"></div>
                <div className="ring-thick"></div>

                {/* Mira central */}
                <div className="crosshair"></div>
                <div className="dot"></div>

                {/* Esquinas (Brackets) */}
                <div className="brackets">
                    <div className="b-corner tl"></div>
                    <div className="b-corner tr"></div>
                    <div className="b-corner bl"></div>
                    <div className="b-corner br"></div>
                </div>

                {/* Textos */}
                <div className="percentage-display" id="percent">
                    {progress < 10 ? `0${progress}` : progress}
                </div>
                <div
                    className="data-text top-text"
                    style={
                        isSystemReady
                            ? { color: "#fff", textShadow: "0 0 10px #fff" }
                            : undefined
                    }
                >
                    {isSystemReady ? "SYSTEM READY" : "SYSTEM LOADING..."}
                </div>
                <div className="data-text coord-text">LAT 45.201 // LON 12.004</div>

                {/* Barra inferior */}
                <div className="loading-bar">
                    <div
                        className="loading-bar-fill"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}
