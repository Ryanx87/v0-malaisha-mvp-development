"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, MessageSquare, Star, Plus, Clock, DollarSign, TrendingUp, ArrowRight } from "lucide-react"

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
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">Welcome back!</h2>
              <p className="text-lg text-muted-foreground">Manage your jobs and find the perfect service providers.</p>
            </div>
            <Button size="lg" className="shadow-lg shadow-primary/20">
              <Plus className="w-5 h-5 mr-2" />
              Post New Job
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-base">Active Jobs</CardDescription>
                <CardTitle className="text-4xl font-bold">3</CardTitle>
                <div className="flex items-center gap-1 text-sm text-primary">
                  <TrendingUp className="w-4 h-4" />
                  <span>+2 this week</span>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-base">Applications</CardDescription>
                <CardTitle className="text-4xl font-bold">12</CardTitle>
                <div className="flex items-center gap-1 text-sm text-primary">
                  <TrendingUp className="w-4 h-4" />
                  <span>+5 new</span>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-base">Completed</CardDescription>
                <CardTitle className="text-4xl font-bold">8</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>All time</span>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-base">Total Spent</CardDescription>
                <CardTitle className="text-4xl font-bold">R2.4K</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>This month</span>
                </div>
              </CardHeader>
            </Card>
          </div>

          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Quick Actions</CardTitle>
              <CardDescription className="text-base">Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto py-8 flex flex-col gap-3 text-base shadow-md hover:shadow-lg transition-shadow">
                <Plus className="w-8 h-8" />
                <span className="font-semibold">Post New Job</span>
                <span className="text-xs opacity-90">Find the right professional</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-8 flex flex-col gap-3 text-base border-2 hover:bg-accent transition-colors bg-transparent"
              >
                <MessageSquare className="w-8 h-8" />
                <span className="font-semibold">View Messages</span>
                <span className="text-xs opacity-70">3 unread messages</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-8 flex flex-col gap-3 text-base border-2 hover:bg-accent transition-colors bg-transparent"
              >
                <Clock className="w-8 h-8" />
                <span className="font-semibold">Browse Jobs</span>
                <span className="text-xs opacity-70">See all your postings</span>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Recent Jobs</CardTitle>
                <CardDescription className="text-base">Your latest job postings</CardDescription>
              </div>
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: "Plumbing Repair Needed", status: "Active", applications: 5, color: "bg-primary" },
                  { title: "House Cleaning Service", status: "In Progress", applications: 0, color: "bg-blue-500" },
                  {
                    title: "Electrical Installation",
                    status: "Completed",
                    applications: 0,
                    color: "bg-muted-foreground",
                  },
                ].map((job, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-5 border-2 rounded-xl hover:bg-accent/50 transition-all hover:shadow-md group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${job.color} shadow-lg`} />
                      <div>
                        <h4 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                          {job.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{job.status}</p>
                      </div>
                    </div>
                    {job.applications > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-primary">{job.applications} applications</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
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
