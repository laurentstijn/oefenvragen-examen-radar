"use client"

import type React from "react"

export function BodyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div onContextMenu={(e) => e.preventDefault()} className="min-h-screen">
      {children}
    </div>
  )
}
