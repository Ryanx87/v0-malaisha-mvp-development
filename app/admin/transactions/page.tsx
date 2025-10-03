"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Briefcase, DollarSign, AlertCircle, Shield, Search, Calendar, TrendingUp } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <Shield className="w-5 h-5" /> },
  { name: "Users", href: "/admin/users", icon: <Users className="w-5 h-5" /> },
  { name: "Jobs", href: "/admin/jobs", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Transactions", href: "/admin/transactions", icon: <DollarSign className="w-5 h-5" /> },
  { name: "Reports", href: "/admin/reports", icon: <AlertCircle className="w-5 h-5" /> },
]

const mockTransactions = [
  {
    id: 1,
    jobTitle: "Plumbing Repair Needed",
    client: "John Doe",
    provider: "Sarah Chen",
    amount: 175,
    platformFee: 8.75,
    status: "Completed",
    date: "2024-01-18",
  },
  {
    id: 2,
    jobTitle: "Garden Landscaping",
    client: "Emma Davis",
    provider: "Mike Johnson",
    amount: 450,
    platformFee: 22.5,
    status: "Completed",
    date: "2024-01-15",
  },
  {
    id: 3,
    jobTitle: "House Cleaning Service",
    client: "Robert Wilson",
    provider: "Emma Wilson",
    amount: 100,
    platformFee: 5.0,
    status: "Pending",
    date: "2024-01-20",
  },
  {
    id: 4,
    jobTitle: "Electrical Installation",
    client: "Sarah Johnson",
    provider: "David Brown",
    amount: 280,
    platformFee: 14.0,
    status: "Completed",
    date: "2024-01-12",
  },
]

export default function AdminTransactions() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")

  const totalRevenue = mockTransactions.filter((t) => t.status === "Completed").reduce((sum, t) => sum + t.amount, 0)
  const platformRevenue = mockTransactions
    .filter((t) => t.status === "Completed")
    .reduce((sum, t) => sum + t.platformFee, 0)

  const filteredTransactions = mockTransactions.filter((t) => {
    const matchesSearch =
      t.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.provider.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || t.status.toLowerCase() === filter
    return matchesSearch && matchesFilter
  })

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <DashboardLayout role="admin" navigation={navigation}>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Transactions</h2>
            <p className="text-gray-600">Monitor all platform transactions and revenue</p>
          </div>

          {/* Revenue Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Transaction Volume</CardDescription>
                <CardTitle className="text-3xl">${totalRevenue}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+18% this month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Platform Revenue (5%)</CardDescription>
                <CardTitle className="text-3xl text-emerald-600">${platformRevenue.toFixed(2)}</CardTitle>
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
                <CardDescription>Total Transactions</CardDescription>
                <CardTitle className="text-3xl">{mockTransactions.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {mockTransactions.filter((t) => t.status === "Completed").length} completed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search by job, client, or provider..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
                    All ({mockTransactions.length})
                  </Button>
                  <Button
                    variant={filter === "completed" ? "default" : "outline"}
                    onClick={() => setFilter("completed")}
                  >
                    Completed ({mockTransactions.filter((t) => t.status === "Completed").length})
                  </Button>
                  <Button variant={filter === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")}>
                    Pending ({mockTransactions.filter((t) => t.status === "Pending").length})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>All platform transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{transaction.jobTitle}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Client: {transaction.client}</span>
                          <span>Provider: {transaction.provider}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(transaction.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex gap-6 text-sm">
                        <div>
                          <p className="text-gray-600">Transaction Amount</p>
                          <p className="font-semibold text-gray-900">${transaction.amount}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Platform Fee (5%)</p>
                          <p className="font-semibold text-emerald-600">${transaction.platformFee.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Provider Receives</p>
                          <p className="font-semibold text-gray-900">
                            ${(transaction.amount - transaction.platformFee).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
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
