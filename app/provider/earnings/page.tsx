"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, MessageSquare, DollarSign, Briefcase, TrendingUp, Calendar, Download } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/provider/dashboard", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Find Jobs", href: "/provider/jobs", icon: <Search className="w-5 h-5" /> },
  { name: "My Applications", href: "/provider/applications", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Messages", href: "/provider/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { name: "Earnings", href: "/provider/earnings", icon: <DollarSign className="w-5 h-5" /> },
]

const mockTransactions = [
  {
    id: 1,
    jobTitle: "Garden Landscaping",
    clientName: "Sarah Johnson",
    amount: 450,
    status: "Completed",
    date: "2024-01-15",
    paymentMethod: "Platform Wallet",
  },
  {
    id: 2,
    jobTitle: "House Painting",
    clientName: "Mike Chen",
    amount: 320,
    status: "Completed",
    date: "2024-01-10",
    paymentMethod: "Platform Wallet",
  },
  {
    id: 3,
    jobTitle: "Plumbing Repair",
    clientName: "John Doe",
    amount: 175,
    status: "Pending",
    date: "2024-01-18",
    paymentMethod: "Platform Wallet",
  },
  {
    id: 4,
    jobTitle: "Electrical Installation",
    clientName: "Emma Davis",
    amount: 280,
    status: "Completed",
    date: "2024-01-05",
    paymentMethod: "Platform Wallet",
  },
]

export default function ProviderEarnings() {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")

  const totalEarnings = mockTransactions.filter((t) => t.status === "Completed").reduce((sum, t) => sum + t.amount, 0)
  const pendingEarnings = mockTransactions.filter((t) => t.status === "Pending").reduce((sum, t) => sum + t.amount, 0)
  const availableBalance = totalEarnings * 0.95 // 5% platform fee

  const filteredTransactions = mockTransactions.filter((t) => {
    if (filter === "all") return true
    return t.status.toLowerCase() === filter
  })

  return (
    <AuthGuard allowedRoles={["provider"]}>
      <DashboardLayout role="provider" navigation={navigation}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Earnings</h2>
              <p className="text-gray-600">Track your income and transaction history</p>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Earnings Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Available Balance</CardDescription>
                <CardTitle className="text-3xl text-emerald-600">${availableBalance.toFixed(2)}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Withdraw Funds</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Earnings</CardDescription>
                <CardTitle className="text-3xl">${totalEarnings}</CardTitle>
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
                <CardDescription>Pending Payments</CardDescription>
                <CardTitle className="text-3xl">${pendingEarnings}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">1 job awaiting completion</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
                  All Transactions ({mockTransactions.length})
                </Button>
                <Button variant={filter === "completed" ? "default" : "outline"} onClick={() => setFilter("completed")}>
                  Completed ({mockTransactions.filter((t) => t.status === "Completed").length})
                </Button>
                <Button variant={filter === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")}>
                  Pending ({mockTransactions.filter((t) => t.status === "Pending").length})
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your payment records and earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{transaction.jobTitle}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>Client: {transaction.clientName}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-600">${transaction.amount}</p>
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
