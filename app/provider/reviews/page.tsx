"use client"

import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"

const reviews = [
  {
    id: 1,
    client: "John Smith",
    avatar: "/diverse-clients-meeting.png",
    rating: 5,
    comment: "Excellent work! Very professional and completed the job ahead of schedule.",
    job: "Plumbing Repair",
    date: "2025-01-15",
  },
  {
    id: 2,
    client: "Sarah Johnson",
    avatar: "/diverse-clients-meeting.png",
    rating: 4,
    comment: "Good service, would recommend. Minor communication delays but overall satisfied.",
    job: "Electrical Installation",
    date: "2025-01-10",
  },
  {
    id: 3,
    client: "Michael Brown",
    avatar: "/diverse-clients-meeting.png",
    rating: 5,
    comment: "Outstanding! Fixed the issue quickly and explained everything clearly.",
    job: "AC Maintenance",
    date: "2025-01-05",
  },
]

const stats = {
  averageRating: 4.7,
  totalReviews: 24,
  fiveStars: 18,
  fourStars: 4,
  threeStars: 2,
  twoStars: 0,
  oneStars: 0,
}

export default function ProviderReviewsPage() {
  return (
    <DashboardLayout role="provider">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews & Ratings</h1>
          <p className="text-gray-600 mt-1">See what clients are saying about your work</p>
        </div>

        {/* Rating Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Overall Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold text-gray-900">{stats.averageRating}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(stats.averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Based on {stats.totalReviews} reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count =
                  rating === 5
                    ? stats.fiveStars
                    : rating === 4
                      ? stats.fourStars
                      : rating === 3
                        ? stats.threeStars
                        : rating === 2
                          ? stats.twoStars
                          : stats.oneStars
                const percentage = (count / stats.totalReviews) * 100

                return (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.client} />
                    <AvatarFallback>{review.client[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.client}</h4>
                        <p className="text-sm text-gray-600">{review.job}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {new Date(review.date).toLocaleDateString()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
