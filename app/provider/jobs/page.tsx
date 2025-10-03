"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MessageSquare, Star, DollarSign, Briefcase, MapPin, Clock } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/provider/dashboard", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Find Jobs", href: "/provider/jobs", icon: <Search className="w-5 h-5" /> },
  { name: "My Applications", href: "/provider/applications", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Messages", href: "/provider/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { name: "Earnings", href: "/provider/earnings", icon: <DollarSign className="w-5 h-5" /> },
]

const mockJobs = [
  {
    id: 1,
    title: "Plumbing Repair Needed",
    description: "Need urgent plumbing repair for leaking kitchen sink. Must be available this week.",
    category: "Plumbing",
    budget: { min: 150, max: 200 },
    location: "Sandton, Johannesburg",
    distance: "2.3 km",
    postedDate: "2 hours ago",
    clientName: "John Doe",
    clientRating: 4.5,
    urgency: "urgent",
  },
  {
    id: 2,
    title: "Garden Landscaping",
    description: "Looking for landscaping service to redesign backyard garden with new plants and features.",
    category: "Landscaping",
    budget: { min: 300, max: 500 },
    location: "Umhlanga, Durban",
    distance: "5.1 km",
    postedDate: "5 hours ago",
    clientName: "Sarah Johnson",
    clientRating: 4.8,
    urgency: "normal",
  },
  {
    id: 3,
    title: "Electrical Installation",
    description: "Need electrician to install new lighting fixtures in living room and bedroom.",
    category: "Electrical",
    budget: { min: 200, max: 300 },
    location: "Centurion, Pretoria",
    distance: "3.8 km",
    postedDate: "1 day ago",
    clientName: "Mike Chen",
    clientRating: 4.2,
    urgency: "normal",
  },
  {
    id: 4,
    title: "House Cleaning Service",
    description: "Looking for professional house cleaning service for a 3-bedroom apartment. Weekly service preferred.",
    category: "Cleaning",
    budget: { min: 80, max: 120 },
    location: "Camps Bay, Cape Town",
    distance: "7.2 km",
    postedDate: "3 hours ago",
    clientName: "Emma Davis",
    clientRating: 4.9,
    urgency: "flexible",
  },
  {
    id: 5,
    title: "Carpentry Work - Custom Shelves",
    description: "Need carpenter to build custom shelving units for home office. Measurements and design ready.",
    category: "Carpentry",
    budget: { min: 250, max: 400 },
    location: "Hatfield, Pretoria",
    distance: "1.8 km",
    postedDate: "6 hours ago",
    clientName: "Robert Wilson",
    clientRating: 4.6,
    urgency: "normal",
  },
]

const categories = [
  "All Categories",
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Landscaping",
  "Carpentry",
  "Painting",
  "Moving",
  "Handyman",
  "HVAC",
  "Roofing",
]

export default function ProviderJobs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("recent")

  const filteredJobs = mockJobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All Categories" || job.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "budget-high") return b.budget.max - a.budget.max
      if (sortBy === "budget-low") return a.budget.min - b.budget.min
      if (sortBy === "distance") return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
      return 0 // recent (default order)
    })

  return (
    <AuthGuard allowedRoles={["provider"]}>
      <DashboardLayout role="provider" navigation={navigation}>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Jobs</h2>
            <p className="text-gray-600">Browse available jobs in your area and apply</p>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search jobs by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="budget-high">Highest Budget</SelectItem>
                        <SelectItem value="budget-low">Lowest Budget</SelectItem>
                        <SelectItem value="distance">Nearest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Distance</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Distances</SelectItem>
                        <SelectItem value="5">Within 5 km</SelectItem>
                        <SelectItem value="10">Within 10 km</SelectItem>
                        <SelectItem value="20">Within 20 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredJobs.length}</span> job
              {filteredJobs.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        {job.urgency === "urgent" && (
                          <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-100 text-red-700">
                            Urgent
                          </span>
                        )}
                      </div>
                      <CardDescription className="mb-3">{job.description}</CardDescription>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">{job.clientName}</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {job.clientRating}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1 font-semibold text-emerald-600">
                      <DollarSign className="w-4 h-4" />R{job.budget.min} - R{job.budget.max}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location} ({job.distance} away)
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.postedDate}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/provider/jobs/${job.id}`} className="flex-1">
                      <Button className="w-full">View Details & Apply</Button>
                    </Link>
                    <Button variant="outline">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your search or filters to find more opportunities</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
