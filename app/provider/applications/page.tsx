"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, MessageSquare, DollarSign, Briefcase, MapPin, Clock } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/provider/dashboard", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Find Jobs", href: "/provider/jobs", icon: <Search className="w-5 h-5" /> },
  { name: "My Applications", href: "/provider/applications", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Messages", href: "/provider/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { name: "Earnings", href: "/provider/earnings", icon: <DollarSign className="w-5 h-5" /> },
]

const mockApplications = [
  {
    id: 1,
    jobTitle: "Plumbing Repair Needed",
    clientName: "John Doe",
    bidAmount: 175,
    status: "Pending",
    appliedDate: "2 hours ago",
    location: "Sandton, Johannesburg",
  },
  {
    id: 2,
    jobTitle: "Garden Landscaping",
    clientName: "Sarah Johnson",
    bidAmount: 450,
    status: "Accepted",
    appliedDate: "1 day ago",
    location: "Umhlanga, Durban",
  },
  {
    id: 3,
    jobTitle: "House Painting",
    clientName: "Mike Chen",
    bidAmount: 320,
    status: "Rejected",
    appliedDate: "3 days ago",
    location: "Centurion, Pretoria",
  },
]

export default function ProviderApplications() {
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all")

  const filteredApplications = mockApplications.filter((app) => {
    if (filter === "all") return true
    return app.status.toLowerCase() === filter
  })

  return (
    <AuthGuard allowedRoles={["provider"]}>
      <DashboardLayout role="provider" navigation={navigation}>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h2>
            <p className="text-gray-600">Track your job applications and their status</p>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
                  All ({mockApplications.length})
                </Button>
                <Button variant={filter === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")}>
                  Pending ({mockApplications.filter((a) => a.status === "Pending").length})
                </Button>
                <Button variant={filter === "accepted" ? "default" : "outline"} onClick={() => setFilter("accepted")}>
                  Accepted ({mockApplications.filter((a) => a.status === "Accepted").length})
                </Button>
                <Button variant={filter === "rejected" ? "default" : "outline"} onClick={() => setFilter("rejected")}>
                  Rejected ({mockApplications.filter((a) => a.status === "Rejected").length})
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{app.jobTitle}</CardTitle>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            app.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : app.status === "Accepted"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <CardDescription>Client: {app.clientName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1 font-semibold text-emerald-600">
                      <DollarSign className="w-4 h-4" />
                      Your bid: R{app.bidAmount}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {app.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Applied {app.appliedDate}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {app.status === "Accepted" && (
                      <Button size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Client
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600 mb-4">Start applying to jobs to see them here</p>
                <Button>Browse Available Jobs</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
