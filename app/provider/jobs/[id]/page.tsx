"use client"

import type React from "react"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, MessageSquare, Star, DollarSign, Briefcase, MapPin, Clock, ArrowLeft, User } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/provider/dashboard", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Find Jobs", href: "/provider/jobs", icon: <Search className="w-5 h-5" /> },
  { name: "My Applications", href: "/provider/applications", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Messages", href: "/provider/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { name: "Earnings", href: "/provider/earnings", icon: <DollarSign className="w-5 h-5" /> },
]

// Mock job data
const mockJob = {
  id: 1,
  title: "Plumbing Repair Needed",
  description:
    "Need urgent plumbing repair for leaking kitchen sink. The leak started yesterday and is getting worse. Must be available this week. Experience with modern fixtures preferred. Will need to bring own tools and materials.",
  category: "Plumbing",
  budget: { min: 150, max: 200 },
  location: "Sandton, Johannesburg",
  distance: "2.3 km",
  postedDate: "2 hours ago",
  clientName: "John Doe",
  clientRating: 4.5,
  clientJobsPosted: 12,
  urgency: "urgent",
  requirements: [
    "Licensed plumber preferred",
    "Must have own tools",
    "Available within 48 hours",
    "Experience with kitchen fixtures",
  ],
}

export default function JobDetail() {
  const router = useRouter()
  const [isApplying, setIsApplying] = useState(false)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [bidAmount, setBidAmount] = useState("")
  const [proposal, setProposal] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("")

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsApplying(true)

    // Simulate API call
    setTimeout(() => {
      setIsApplying(false)
      router.push("/provider/applications")
    }, 1500)
  }

  return (
    <AuthGuard allowedRoles={["provider"]}>
      <DashboardLayout role="provider" navigation={navigation}>
        <div className="space-y-6">
          {/* Back Button */}
          <Link href="/provider/jobs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>

          {/* Job Details */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{mockJob.title}</CardTitle>
                    {mockJob.urgency === "urgent" && (
                      <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-100 text-red-700">Urgent</span>
                    )}
                  </div>
                  <CardDescription className="text-base">{mockJob.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Job Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget Range</p>
                    <p className="font-semibold text-gray-900">
                      R{mockJob.budget.min} - R{mockJob.budget.max}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">
                      {mockJob.location} ({mockJob.distance} away)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-gray-900">{mockJob.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Posted</p>
                    <p className="font-semibold text-gray-900">{mockJob.postedDate}</p>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {mockJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Client Info */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">About the Client</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{mockJob.clientName}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {mockJob.clientRating} rating
                      </span>
                      <span>{mockJob.clientJobsPosted} jobs posted</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Form */}
          {!showApplicationForm ? (
            <Card>
              <CardContent className="py-6">
                <div className="flex gap-3">
                  <Button className="flex-1" onClick={() => setShowApplicationForm(true)}>
                    Apply for This Job
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Client
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Application</CardTitle>
                <CardDescription>Provide your bid and proposal to win this job</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitApplication} className="space-y-6">
                  {/* Bid Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="bidAmount">Your Bid Amount (R) *</Label>
                    <Input
                      id="bidAmount"
                      type="number"
                      placeholder="Enter your bid (between R150 - R200)"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                    />
                    <p className="text-sm text-gray-600">
                      Client budget: R{mockJob.budget.min} - R{mockJob.budget.max}
                    </p>
                  </div>

                  {/* Estimated Time */}
                  <div className="space-y-2">
                    <Label htmlFor="estimatedTime">Estimated Completion Time *</Label>
                    <Input
                      id="estimatedTime"
                      placeholder="e.g., 2-3 hours, 1 day, etc."
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(e.target.value)}
                      required
                    />
                  </div>

                  {/* Proposal */}
                  <div className="space-y-2">
                    <Label htmlFor="proposal">Your Proposal *</Label>
                    <Textarea
                      id="proposal"
                      placeholder="Explain why you're the best fit for this job. Include your experience, approach, and any relevant details."
                      rows={6}
                      value={proposal}
                      onChange={(e) => setProposal(e.target.value)}
                      required
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button type="submit" disabled={isApplying} className="flex-1">
                      {isApplying ? "Submitting Application..." : "Submit Application"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowApplicationForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
