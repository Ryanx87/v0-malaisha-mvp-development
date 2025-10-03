"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DashboardLayout from "@/components/dashboard-layout"

const completedJobs = [
  {
    id: 1,
    title: "Plumbing Repair",
    provider: "Mike Wilson",
    avatar: "/provider-abstract.png",
    completedDate: "2025-01-15",
    reviewed: false,
  },
  {
    id: 2,
    title: "Electrical Installation",
    provider: "Sarah Davis",
    avatar: "/provider-abstract.png",
    completedDate: "2025-01-10",
    reviewed: true,
    rating: 5,
    comment: "Excellent work! Very professional.",
  },
]

export default function ClientReviewsPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Submitting review:", { jobId: selectedJob, rating, comment })
    // Reset form
    setSelectedJob(null)
    setRating(0)
    setComment("")
  }

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600 mt-1">Rate and review completed jobs</p>
        </div>

        {/* Pending Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedJobs
              .filter((job) => !job.reviewed)
              .map((job) => (
                <div key={job.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={job.avatar || "/placeholder.svg"} alt={job.provider} />
                        <AvatarFallback>{job.provider[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.provider}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Completed: {new Date(job.completedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge>Pending Review</Badge>
                  </div>

                  {selectedJob === job.id ? (
                    <form onSubmit={handleSubmitReview} className="space-y-4 mt-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label>Rating</Label>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-8 h-8 transition-colors ${
                                  star <= (hoveredRating || rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comment">Review</Label>
                        <Textarea
                          id="comment"
                          placeholder="Share your experience with this service provider..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={4}
                          required
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit" disabled={rating === 0}>
                          Submit Review
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setSelectedJob(null)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <Button onClick={() => setSelectedJob(job.id)} className="w-full">
                      Write Review
                    </Button>
                  )}
                </div>
              ))}

            {completedJobs.filter((job) => !job.reviewed).length === 0 && (
              <p className="text-center text-gray-500 py-8">No pending reviews</p>
            )}
          </CardContent>
        </Card>

        {/* Submitted Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Your Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedJobs
              .filter((job) => job.reviewed)
              .map((job) => (
                <div key={job.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={job.avatar || "/placeholder.svg"} alt={job.provider} />
                      <AvatarFallback>{job.provider[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{job.title}</h4>
                          <p className="text-sm text-gray-600">{job.provider}</p>
                        </div>
                        <Badge variant="secondary">{new Date(job.completedDate).toLocaleDateString()}</Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= (job.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mt-2">{job.comment}</p>
                    </div>
                  </div>
                </div>
              ))}

            {completedJobs.filter((job) => job.reviewed).length === 0 && (
              <p className="text-center text-gray-500 py-8">No reviews yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
