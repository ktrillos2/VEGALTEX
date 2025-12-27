"use client"

import { useEffect, useState } from "react"

interface TacticalToastProps {
    title: string
    message: string
    uid?: string
}

export function TacticalToast({ title, message, uid = "882-X" }: TacticalToastProps) {
    const status: "success" = "success"
    const displayTitle = title
    const displayMessage = message

    // Generate random UID on mount if not provided or to mimic the example logic
    const [displayUid, setDisplayUid] = useState(uid)
    useEffect(() => {
        setDisplayUid(Math.floor(Math.random() * 9000) + 1000 + "-SEC")
    }, [])

    return (
        <div className={`tactical-toast show ${status}`}>
            {/* Decoración esquinas */}
            <div className="bracket bracket-tr"></div>
            <div className="bracket bracket-br"></div>

            {/* Barra de progreso inferior */}
            <div className="scan-bar"></div>

            {/* Icono (Spinner -> Check) */}
            <div className="status-icon">
                <div className="spinner"></div>
                <svg className="check-svg" viewBox="0 0 50 50">
                    <path d="M10 25 L20 35 L40 15" />
                </svg>
            </div>

            {/* Contenido de Texto */}
            <div className="toast-content">
                <span className="toast-title">{displayTitle}</span>
                <span className="toast-message">{displayMessage}</span>
                <div className="text-[9px] text-gray-600 font-mono mt-1 opacity-50">UID: <span>{displayUid}</span></div>
            </div>
        </div>
    )
}
