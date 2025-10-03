"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, MessageSquare, Star, Plus, Clock, MapPin, DollarSign } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/client/dashboard", icon: <Briefcase className="w-5 h-5" /> },
  { name: "My Jobs", href: "/client/jobs", icon: <Clock className="w-5 h-5" /> },
  { name: "Messages", href: "/client/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { name: "Reviews", href: "/client/reviews", icon: <Star className="w-5 h-5" /> },
]

const mockJobs = [
  {
    id: 1,
    title: "Plumbing Repair Needed",
    description: "Need urgent plumbing repair for leaking kitchen sink. Must be available this week.",
    category: "Plumbing",
    budget: { min: 150, max: 200 },
    location: "Sandton, Johannesburg",
    status: "Active",
    applications: 5,
    postedDate: "2 hours ago",
  },
  {
    id: 2,
    title: "House Cleaning Service",
    description: "Looking for professional house cleaning service for a 3-bedroom apartment.",
    category: "Cleaning",
    budget: { min: 80, max: 120 },
    location: "Camps Bay, Cape Town",
    status: "In Progress",
    applications: 0,
    postedDate: "1 day ago",
  },
  {
    id: 3,
    title: "Electrical Installation",
    description: "Need electrician to install new lighting fixtures in living room and bedroom.",
    category: "Electrical",
    budget: { min: 200, max: 300 },
    location: "Centurion, Pretoria",
    status: "Completed",
    applications: 0,
    postedDate: "5 days ago",
  },
  {
    id: 4,
    title: "Garden Landscaping",
    description: "Looking for landscaping service to redesign backyard garden with new plants.",
    category: "Landscaping",
    budget: { min: 300, max: 500 },
    location: "Umhlanga, Durban",
    status: "Active",
    applications: 8,
    postedDate: "3 hours ago",
  },
]

export default function ClientJobs() {
  const [filter, setFilter] = useState<"all" | "active" | "in-progress" | "completed">("all")

  const filteredJobs = mockJobs.filter((job) => {
    if (filter === "all") return true
    if (filter === "active") return job.status === "Active"
    if (filter === "in-progress") return job.status === "In Progress"
    if (filter === "completed") return job.status === "Completed"
    return true
  })

  return (
    <AuthGuard allowedRoles={["client"]}>
      <DashboardLayout role="client" navigation={navigation}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">My Jobs</h2>
              <p className="text-gray-600">Manage your job postings and applications</p>
            </div>
            <Link href="/client/jobs/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
                  All Jobs ({mockJobs.length})
                </Button>
                <Button variant={filter === "active" ? "default" : "outline"} onClick={() => setFilter("active")}>
                  Active ({mockJobs.filter((j) => j.status === "Active").length})
                </Button>
                <Button
                  variant={filter === "in-progress" ? "default" : "outline"}
                  onClick={() => setFilter("in-progress")}
                >
                  In Progress ({mockJobs.filter((j) => j.status === "In Progress").length})
                </Button>
                <Button variant={filter === "completed" ? "default" : "outline"} onClick={() => setFilter("completed")}>
                  Completed ({mockJobs.filter((j) => j.status === "Completed").length})
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            job.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : job.status === "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <CardDescription>{job.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />R{job.budget.min} - R{job.budget.max}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.postedDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    {job.applications > 0 && (
                      <span className="text-sm font-medium text-emerald-600">
                        {job.applications} application{job.applications !== 1 ? "s" : ""} received
                      </span>
                    )}
                    {job.applications === 0 && job.status !== "Completed" && (
                      <span className="text-sm text-gray-500">No applications yet</span>
                    )}
                    {job.status === "Completed" && <span className="text-sm text-gray-500">Job completed</span>}

                    <div className="flex gap-2">
                      {job.applications > 0 && job.status === "Active" && <Button size="sm">View Applications</Button>}
                      {job.status !== "Completed" && (
                        <>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
