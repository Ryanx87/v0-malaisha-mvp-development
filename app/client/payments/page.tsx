"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, MessageSquare, Star, Clock, Calendar, CreditCard, Download } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/client/dashboard", icon: <Briefcase className="w-5 h-5" /> },
  { name: "My Jobs", href: "/client/jobs", icon: <Clock className="w-5 h-5" /> },
  { name: "Messages", href: "/client/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { name: "Reviews", href: "/client/reviews", icon: <Star className="w-5 h-5" /> },
]

const mockPayments = [
  {
    id: 1,
    jobTitle: "Plumbing Repair Needed",
    providerName: "Sarah Chen",
    amount: 175,
    status: "Paid",
    date: "2024-01-18",
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    jobTitle: "Garden Landscaping",
    providerName: "Mike Johnson",
    amount: 450,
    status: "Paid",
    date: "2024-01-15",
    paymentMethod: "Credit Card",
  },
  {
    id: 3,
    jobTitle: "House Cleaning Service",
    providerName: "Emma Wilson",
    amount: 100,
    status: "Pending",
    date: "2024-01-20",
    paymentMethod: "Credit Card",
  },
  {
    id: 4,
    jobTitle: "Electrical Installation",
    providerName: "David Brown",
    amount: 280,
    status: "Paid",
    date: "2024-01-12",
    paymentMethod: "Credit Card",
  },
]

export default function ClientPayments() {
  const [filter, setFilter] = useState<"all" | "paid" | "pending">("all")

  const totalSpent = mockPayments.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0)
  const pendingPayments = mockPayments.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0)

  const filteredPayments = mockPayments.filter((p) => {
    if (filter === "all") return true
    return p.status.toLowerCase() === filter
  })

  return (
    <AuthGuard allowedRoles={["client"]}>
      <DashboardLayout role="client" navigation={navigation}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Payments</h2>
              <p className="text-gray-600">Manage your payment history and methods</p>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Payment Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Spent</CardDescription>
                <CardTitle className="text-3xl">${totalSpent}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {mockPayments.filter((p) => p.status === "Paid").length} completed payments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Pending Payments</CardDescription>
                <CardTitle className="text-3xl">${pendingPayments}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {mockPayments.filter((p) => p.status === "Pending").length} awaiting payment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Payment Method</CardDescription>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  •••• 4242
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Manage Payment Methods
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
                  All Payments ({mockPayments.length})
                </Button>
                <Button variant={filter === "paid" ? "default" : "outline"} onClick={() => setFilter("paid")}>
                  Paid ({mockPayments.filter((p) => p.status === "Paid").length})
                </Button>
                <Button variant={filter === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")}>
                  Pending ({mockPayments.filter((p) => p.status === "Pending").length})
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your transaction records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{payment.jobTitle}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>Provider: {payment.providerName}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(payment.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          {payment.paymentMethod}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">${payment.amount}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          payment.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {payment.status}
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
