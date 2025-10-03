"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, MessageSquare, Star, DollarSign, Briefcase, MapPin, TrendingUp, ArrowRight } from "lucide-react"

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
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">Welcome back, John!</h2>
              <p className="text-lg text-muted-foreground">Find new opportunities and grow your business.</p>
            </div>
            <Button size="lg" className="shadow-lg shadow-primary/20">
              <Search className="w-5 h-5 mr-2" />
              Find Jobs
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-base">Active Bids</CardDescription>
                <CardTitle className="text-4xl font-bold">5</CardTitle>
                <div className="flex items-center gap-1 text-sm text-primary">
                  <TrendingUp className="w-4 h-4" />
                  <span>+2 this week</span>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-base">Jobs Won</CardDescription>
                <CardTitle className="text-4xl font-bold">12</CardTitle>
                <div className="flex items-center gap-1 text-sm text-primary">
                  <TrendingUp className="w-4 h-4" />
                  <span>+3 this month</span>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-base">Rating</CardDescription>
                <CardTitle className="text-4xl font-bold flex items-center gap-2">
                  4.8 <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>Based on 24 reviews</span>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-base">Total Earned</CardDescription>
                <CardTitle className="text-4xl font-bold">R5.2K</CardTitle>
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
                <Search className="w-8 h-8" />
                <span className="font-semibold">Find Jobs</span>
                <span className="text-xs opacity-90">Browse available opportunities</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-8 flex flex-col gap-3 text-base border-2 hover:bg-accent transition-colors bg-transparent"
              >
                <MessageSquare className="w-8 h-8" />
                <span className="font-semibold">View Messages</span>
                <span className="text-xs opacity-70">2 unread messages</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-8 flex flex-col gap-3 text-base border-2 hover:bg-accent transition-colors bg-transparent"
              >
                <DollarSign className="w-8 h-8" />
                <span className="font-semibold">View Earnings</span>
                <span className="text-xs opacity-70">Track your income</span>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Available Jobs Near You</CardTitle>
                <CardDescription className="text-base">New opportunities in your area</CardDescription>
              </div>
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
                  <div
                    key={index}
                    className="p-5 border-2 rounded-xl hover:bg-accent/50 transition-all hover:shadow-md group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                        {job.title}
                      </h4>
                      <span className="text-base font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {job.budget}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span>{job.posted}</span>
                    </div>
                    <Button size="lg" className="w-full shadow-md">
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
