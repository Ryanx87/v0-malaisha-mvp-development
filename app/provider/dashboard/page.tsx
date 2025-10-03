"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, MessageSquare, Star, DollarSign, Briefcase, MapPin } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/provider/dashboard", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Find Jobs", href: "/provider/jobs", icon: <Search className="w-5 h-5" /> },
  { name: "My Applications", href: "/provider/applications", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Messages", href: "/provider/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { name: "Earnings", href: "/provider/earnings", icon: <DollarSign className="w-5 h-5" /> },
]

export default function ProviderDashboard() {
  return (
    <AuthGuard allowedRoles={["provider"]}>
      <DashboardLayout role="provider" navigation={navigation}>
        <div className="space-y-6">
          {/* Welcome Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
            <p className="text-gray-600">Find new opportunities and grow your business.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Active Bids</CardDescription>
                <CardTitle className="text-3xl">5</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Jobs Won</CardDescription>
                <CardTitle className="text-3xl">12</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Rating</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-1">
                  4.8 <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Earned</CardDescription>
                <CardTitle className="text-3xl">R5.2K</CardTitle>
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
                <Search className="w-6 h-6" />
                <span>Find Jobs</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 bg-transparent">
                <MessageSquare className="w-6 h-6" />
                <span>View Messages</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 bg-transparent">
                <DollarSign className="w-6 h-6" />
                <span>View Earnings</span>
              </Button>
            </CardContent>
          </Card>

          {/* Available Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Available Jobs Near You</CardTitle>
              <CardDescription>New opportunities in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Plumbing Repair Needed",
                    budget: "R150-R200",
                    location: "2.3 km away",
                    posted: "2 hours ago",
                  },
                  { title: "Garden Landscaping", budget: "R300-R500", location: "5.1 km away", posted: "5 hours ago" },
                  {
                    title: "Electrical Installation",
                    budget: "R200-R300",
                    location: "3.8 km away",
                    posted: "1 day ago",
                  },
                ].map((job, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{job.title}</h4>
                      <span className="text-sm font-medium text-emerald-600">{job.budget}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span>{job.posted}</span>
                    </div>
                    <Button size="sm" className="w-full">
                      Apply Now
                    </Button>
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
