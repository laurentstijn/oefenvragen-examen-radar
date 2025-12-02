"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn } from "lucide-react"

export function AuthForm() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn, signInAnonymously } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (username.trim().length < 3) {
        setError("Gebruikersnaam moet minimaal 3 tekens bevatten")
        setLoading(false)
        return
      }

      await signIn(username.trim())
    } catch (err: any) {
      console.error("[v0] Error in handleSubmit:", err)
      setError(err.message || "Er is iets misgegaan")
    } finally {
      setLoading(false)
    }
  }

  const handleAnonymous = () => {
    signInAnonymously()
  }

  return (
    <Card className="border-2 max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welkom</CardTitle>
        <CardDescription>Voer je naam in om te beginnen met oefenen</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Naam</Label>
            <Input
              id="username"
              type="text"
              placeholder="Jouw naam"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              "Bezig..."
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Beginnen
              </>
            )}
          </Button>
          <Button type="button" onClick={handleAnonymous} variant="outline" className="w-full bg-transparent" size="lg">
            Anoniem Oefenen (geen statistieken)
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
