"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Briefcase, DollarSign, AlertCircle, Shield, Search, MapPin, Clock, Ban } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <Shield className="w-5 h-5" /> },
  { name: "Users", href: "/admin/users", icon: <Users className="w-5 h-5" /> },
  { name: "Jobs", href: "/admin/jobs", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Transactions", href: "/admin/transactions", icon: <DollarSign className="w-5 h-5" /> },
  { name: "Reports", href: "/admin/reports", icon: <AlertCircle className="w-5 h-5" /> },
]

const mockJobs = [
  {
    id: 1,
    title: "Plumbing Repair Needed",
    description: "Need urgent plumbing repair for leaking kitchen sink.",
    category: "Plumbing",
    client: "John Doe",
    budget: { min: 150, max: 200 },
    location: "Sandton, Johannesburg",
    status: "Active",
    applications: 5,
    postedDate: "2024-01-18",
  },
  {
    id: 2,
    title: "Garden Landscaping",
    description: "Looking for landscaping service to redesign backyard garden.",
    category: "Landscaping",
    client: "Sarah Johnson",
    budget: { min: 300, max: 500 },
    location: "Umhlanga, Durban",
    status: "In Progress",
    applications: 0,
    postedDate: "2024-01-15",
  },
  {
    id: 3,
    title: "House Cleaning Service",
    description: "Professional house cleaning service for 3-bedroom apartment.",
    category: "Cleaning",
    client: "Emma Davis",
    budget: { min: 80, max: 120 },
    location: "Camps Bay, Cape Town",
    status: "Active",
    applications: 8,
    postedDate: "2024-01-17",
  },
  {
    id: 4,
    title: "Electrical Installation",
    description: "Need electrician to install new lighting fixtures.",
    category: "Electrical",
    client: "Mike Chen",
    budget: { min: 200, max: 300 },
    location: "Centurion, Pretoria",
    status: "Completed",
    applications: 0,
    postedDate: "2024-01-10",
  },
]

export default function AdminJobs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.client.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || job.category.toLowerCase() === categoryFilter
    const matchesStatus = statusFilter === "all" || job.status.toLowerCase().replace(" ", "-") === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleRemoveJob = (jobId: number) => {
    console.log("[v0] Removing job:", jobId)
  }

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <DashboardLayout role="admin" navigation={navigation}>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Job Management</h2>
            <p className="text-gray-600">Monitor and manage all platform jobs</p>
          </div>

          {/* Job Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Jobs</CardDescription>
                <CardTitle className="text-3xl">{mockJobs.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Active Jobs</CardDescription>
                <CardTitle className="text-3xl">{mockJobs.filter((j) => j.status === "Active").length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>In Progress</CardDescription>
                <CardTitle className="text-3xl">{mockJobs.filter((j) => j.status === "In Progress").length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Completed</CardDescription>
                <CardTitle className="text-3xl">{mockJobs.filter((j) => j.status === "Completed").length}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search by title, description, or client..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                        <SelectItem value="landscaping">Landscaping</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jobs List */}
          <Card>
            <CardHeader>
              <CardTitle>All Jobs</CardTitle>
              <CardDescription>Showing {filteredJobs.length} jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{job.title}</h4>
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
                          <span className="text-xs px-2 py-1 rounded-full font-medium bg-purple-100 text-purple-700">
                            {job.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Client: {job.client}</span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />R{job.budget.min} - R{job.budget.max}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(job.postedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      {job.applications > 0 && (
                        <span className="text-sm font-medium text-emerald-600">{job.applications} applications</span>
                      )}
                      {job.applications === 0 && <span className="text-sm text-gray-500">No applications</span>}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleRemoveJob(job.id)}>
                          <Ban className="w-4 h-4 mr-2" />
                          Remove Job
                        </Button>
                      </div>
                    </div>
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
