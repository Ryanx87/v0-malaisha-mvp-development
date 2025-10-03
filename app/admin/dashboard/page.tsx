"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, DollarSign, AlertCircle, TrendingUp, Shield } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <Shield className="w-5 h-5" /> },
  { name: "Users", href: "/admin/users", icon: <Users className="w-5 h-5" /> },
  { name: "Jobs", href: "/admin/jobs", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Transactions", href: "/admin/transactions", icon: <DollarSign className="w-5 h-5" /> },
  { name: "Reports", href: "/admin/reports", icon: <AlertCircle className="w-5 h-5" /> },
]

export default function AdminDashboard() {
  return (
    <AuthGuard allowedRoles={["admin"]}>
      <DashboardLayout role="admin" navigation={navigation}>
        <div className="space-y-6">
          {/* Welcome Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">Monitor and manage the Malaisha platform.</p>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Users</CardDescription>
                <CardTitle className="text-3xl">1,234</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12% this month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Active Jobs</CardDescription>
                <CardTitle className="text-3xl">89</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+8% this week</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Revenue</CardDescription>
                <CardTitle className="text-3xl">R45.2K</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+15% this month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Pending Reports</CardDescription>
                <CardTitle className="text-3xl">3</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-orange-600">
                  <span>Requires attention</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Sarah Johnson", role: "Client", joined: "2 hours ago" },
                    { name: "Mike Chen", role: "Provider", joined: "5 hours ago" },
                    { name: "Emma Davis", role: "Client", joined: "1 day ago" },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.role}</p>
                      </div>
                      <span className="text-sm text-gray-500">{user.joined}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Jobs</CardTitle>
                <CardDescription>Latest job postings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Plumbing Repair", client: "John Doe", status: "Active" },
                    { title: "Garden Landscaping", client: "Jane Smith", status: "Active" },
                    { title: "House Painting", client: "Bob Wilson", status: "Completed" },
                  ].map((job, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-600">by {job.client}</p>
                      </div>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          job.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
