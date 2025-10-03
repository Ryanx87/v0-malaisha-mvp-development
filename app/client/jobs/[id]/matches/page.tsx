"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowLeft, MapPin, User, MessageSquare, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function AIMatchesPage() {
  const params = useParams()
  const [matches, setMatches] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch("/api/ai/match-providers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId: params.id }),
        })
        const data = await response.json()
        setMatches(data)
      } catch (error) {
        console.error("[v0] Failed to fetch AI matches:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [params.id])

  return (
    <AuthGuard allowedRoles={["client"]}>
      <DashboardLayout role="client">
        <div className="space-y-6">
          {/* Back Button */}
          <Link href={`/client/jobs/${params.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Job
            </Button>
          </Link>

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">AI-Matched Providers</h2>
              <p className="text-gray-600">Smart recommendations based on location, skills, and ratings</p>
            </div>
          </div>

          {loading ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Loader2 className="w-12 h-12 text-emerald-600 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Finding the best matches...</h3>
                <p className="text-gray-600">Our AI is analyzing providers in your area</p>
              </CardContent>
            </Card>
          ) : matches ? (
            <>
              {/* AI Insights */}
              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{matches.insights}</p>
                </CardContent>
              </Card>

              {/* Matched Providers */}
              <div className="space-y-4">
                {matches.matches.map((match: any, index: number) => (
                  <Card key={match.providerId} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-xl">Provider #{index + 1}</CardTitle>
                              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold">
                                <Sparkles className="w-4 h-4" />
                                {match.score}% Match
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {match.distanceKm.toFixed(1)} km away
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* AI Reasoning */}
                      <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          Why this match?
                        </h4>
                        <p className="text-gray-700 text-sm">{match.reasoning}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button className="flex-1">View Full Profile</Button>
                        <Button variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-600">Try adjusting your job requirements</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
