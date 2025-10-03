"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, MessageSquare, Star, Plus, Clock, DollarSign } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/client/dashboard", icon: <Briefcase className="w-5 h-5" /> },
  { name: "My Jobs", href: "/client/jobs", icon: <Clock className="w-5 h-5" /> },
  { name: "Messages", href: "/client/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { name: "Payments", href: "/client/payments", icon: <DollarSign className="w-5 h-5" /> },
  { name: "Reviews", href: "/client/reviews", icon: <Star className="w-5 h-5" /> },
]

export default function ClientDashboard() {
  return (
    <AuthGuard allowedRoles={["client"]}>
      <DashboardLayout role="client" navigation={navigation}>
        <div className="space-y-6">
          {/* Welcome Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
            <p className="text-gray-600">Manage your jobs and find the perfect service providers.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Active Jobs</CardDescription>
                <CardTitle className="text-3xl">3</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Applications</CardDescription>
                <CardTitle className="text-3xl">12</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Completed</CardDescription>
                <CardTitle className="text-3xl">8</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Spent</CardDescription>
                <CardTitle className="text-3xl">R2.4K</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto py-6 flex flex-col gap-2">
                <Plus className="w-6 h-6" />
                <span>Post New Job</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 bg-transparent">
                <MessageSquare className="w-6 h-6" />
                <span>View Messages</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 bg-transparent">
                <Clock className="w-6 h-6" />
                <span>Browse Jobs</span>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Jobs</CardTitle>
              <CardDescription>Your latest job postings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Plumbing Repair Needed", status: "Active", applications: 5 },
                  { title: "House Cleaning Service", status: "In Progress", applications: 0 },
                  { title: "Electrical Installation", status: "Completed", applications: 0 },
                ].map((job, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          job.status === "Active"
                            ? "bg-green-500"
                            : job.status === "In Progress"
                              ? "bg-blue-500"
                              : "bg-gray-400"
                        }`}
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.status}</p>
                      </div>
                    </div>
                    {job.applications > 0 && (
                      <span className="text-sm font-medium text-emerald-600">{job.applications} applications</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
