"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  MessageSquare,
  Star,
  Clock,
  ArrowLeft,
  MapPin,
  DollarSign,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/client/dashboard", icon: <Briefcase className="w-5 h-5" /> },
  { name: "My Jobs", href: "/client/jobs", icon: <Clock className="w-5 h-5" /> },
  { name: "Messages", href: "/client/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { name: "Reviews", href: "/client/reviews", icon: <Star className="w-5 h-5" /> },
]

// Mock job data
const mockJob = {
  id: 1,
  title: "Plumbing Repair Needed",
  description: "Need urgent plumbing repair for leaking kitchen sink. Must be available this week.",
  category: "Plumbing",
  budget: { min: 150, max: 200 },
  location: "Sandton, Johannesburg",
  status: "Active",
  postedDate: "2 hours ago",
}

// Mock applications
const mockApplications = [
  {
    id: 1,
    providerName: "Mike Johnson",
    providerRating: 4.8,
    providerJobsCompleted: 45,
    bidAmount: 175,
    estimatedTime: "2-3 hours",
    proposal:
      "I have over 10 years of experience in plumbing repairs. I can fix your leaking kitchen sink quickly and efficiently. I'll bring all necessary tools and materials. Available to start tomorrow morning.",
    appliedDate: "1 hour ago",
    status: "pending",
  },
  {
    id: 2,
    providerName: "Sarah Chen",
    providerRating: 4.9,
    providerJobsCompleted: 67,
    bidAmount: 160,
    estimatedTime: "3-4 hours",
    proposal:
      "Licensed plumber with 15 years of experience. I specialize in kitchen and bathroom repairs. I guarantee quality work and will provide a 6-month warranty on all repairs. Can start today if needed.",
    appliedDate: "30 minutes ago",
    status: "pending",
  },
  {
    id: 3,
    providerName: "David Wilson",
    providerRating: 4.5,
    providerJobsCompleted: 28,
    bidAmount: 190,
    estimatedTime: "2 hours",
    proposal:
      "Professional plumber available immediately. I have experience with all types of sink repairs and can diagnose and fix the issue quickly. All work comes with a warranty.",
    appliedDate: "2 hours ago",
    status: "pending",
  },
]

export default function ClientJobDetail() {
  const [applications, setApplications] = useState(mockApplications)

  const handleAccept = (applicationId: number) => {
    setApplications(applications.map((app) => (app.id === applicationId ? { ...app, status: "accepted" } : app)))
  }

  const handleReject = (applicationId: number) => {
    setApplications(applications.map((app) => (app.id === applicationId ? { ...app, status: "rejected" } : app)))
  }

  return (
    <AuthGuard allowedRoles={["client"]}>
      <DashboardLayout role="client" navigation={navigation}>
        <div className="space-y-6">
          {/* Back Button */}
          <Link href="/client/jobs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to My Jobs
            </Button>
          </Link>

          {/* Job Details */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{mockJob.title}</CardTitle>
                    <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                      {mockJob.status}
                    </span>
                  </div>
                  <CardDescription className="text-base">{mockJob.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {mockJob.category}
                </span>
                <span className="flex items-center gap-1 font-semibold text-emerald-600">
                  <DollarSign className="w-4 h-4" />R{mockJob.budget.min} - R{mockJob.budget.max}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {mockJob.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Posted {mockJob.postedDate}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Applications Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Applications ({applications.length})</h3>

            <div className="space-y-4">
              {applications.map((app) => (
                <Card
                  key={app.id}
                  className={`${
                    app.status === "accepted"
                      ? "border-green-500 border-2"
                      : app.status === "rejected"
                        ? "border-red-500 border-2"
                        : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <CardTitle className="text-xl">{app.providerName}</CardTitle>
                            {app.status === "accepted" && (
                              <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                                Accepted
                              </span>
                            )}
                            {app.status === "rejected" && (
                              <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-100 text-red-700">
                                Rejected
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {app.providerRating} rating
                            </span>
                            <span>{app.providerJobsCompleted} jobs completed</span>
                            <span className="text-gray-400">•</span>
                            <span>Applied {app.appliedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">R{app.bidAmount}</p>
                        <p className="text-sm text-gray-600">{app.estimatedTime}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Proposal */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Proposal</h4>
                      <p className="text-gray-700">{app.proposal}</p>
                    </div>

                    {/* Actions */}
                    {app.status === "pending" && (
                      <div className="flex gap-3 pt-2">
                        <Button className="flex-1" onClick={() => handleAccept(app.id)}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept Application
                        </Button>
                        <Button variant="outline" onClick={() => handleReject(app.id)}>
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                        <Button variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    )}

                    {app.status === "accepted" && (
                      <div className="flex gap-3 pt-2">
                        <Button className="flex-1">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message Provider
                        </Button>
                        <Button variant="outline">View Profile</Button>
                      </div>
                    )}

                    {app.status === "rejected" && (
                      <div className="pt-2">
                        <p className="text-sm text-gray-600">This application has been rejected</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {applications.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
                  <p className="text-gray-600">Service providers will see your job and can apply</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
