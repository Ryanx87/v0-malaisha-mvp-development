"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Briefcase, DollarSign, AlertCircle, Shield, Search, User, Star, Ban, CheckCircle } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <Shield className="w-5 h-5" /> },
  { name: "Users", href: "/admin/users", icon: <Users className="w-5 h-5" /> },
  { name: "Jobs", href: "/admin/jobs", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Transactions", href: "/admin/transactions", icon: <DollarSign className="w-5 h-5" /> },
  { name: "Reports", href: "/admin/reports", icon: <AlertCircle className="w-5 h-5" /> },
]

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Client",
    status: "Active",
    joinDate: "2024-01-10",
    jobsPosted: 5,
    totalSpent: 1200,
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "Provider",
    status: "Active",
    joinDate: "2024-01-05",
    jobsCompleted: 45,
    rating: 4.8,
    totalEarned: 5200,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Provider",
    status: "Active",
    joinDate: "2024-01-08",
    jobsCompleted: 67,
    rating: 4.9,
    totalEarned: 8500,
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma@example.com",
    role: "Client",
    status: "Suspended",
    joinDate: "2024-01-15",
    jobsPosted: 2,
    totalSpent: 300,
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@example.com",
    role: "Provider",
    status: "Active",
    joinDate: "2024-01-12",
    jobsCompleted: 28,
    rating: 4.5,
    totalEarned: 3200,
  },
]

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleSuspendUser = (userId: number) => {
    console.log("[v0] Suspending user:", userId)
  }

  const handleActivateUser = (userId: number) => {
    console.log("[v0] Activating user:", userId)
  }

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <DashboardLayout role="admin" navigation={navigation}>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">User Management</h2>
            <p className="text-gray-600">Manage all platform users and their accounts</p>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Users</CardDescription>
                <CardTitle className="text-3xl">{mockUsers.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Clients</CardDescription>
                <CardTitle className="text-3xl">{mockUsers.filter((u) => u.role === "Client").length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Service Providers</CardDescription>
                <CardTitle className="text-3xl">{mockUsers.filter((u) => u.role === "Provider").length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Active Users</CardDescription>
                <CardTitle className="text-3xl">{mockUsers.filter((u) => u.status === "Active").length}</CardTitle>
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
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Role</label>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="client">Clients</SelectItem>
                        <SelectItem value="provider">Service Providers</SelectItem>
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
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Showing {filteredUsers.length} users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-semibold text-gray-900">{user.name}</h4>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}
                            >
                              {user.status}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                              {user.role}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                            {user.role === "Client" && (
                              <>
                                <span>{user.jobsPosted} jobs posted</span>
                                <span>${user.totalSpent} spent</span>
                              </>
                            )}
                            {user.role === "Provider" && (
                              <>
                                <span>{user.jobsCompleted} jobs completed</span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  {user.rating}
                                </span>
                                <span>${user.totalEarned} earned</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-3 border-t">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      {user.status === "Active" ? (
                        <Button variant="outline" size="sm" onClick={() => handleSuspendUser(user.id)}>
                          <Ban className="w-4 h-4 mr-2" />
                          Suspend User
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => handleActivateUser(user.id)}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Activate User
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Activity
                      </Button>
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
