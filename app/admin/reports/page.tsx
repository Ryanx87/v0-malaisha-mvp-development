"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, DollarSign, AlertCircle, Shield, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <Shield className="w-5 h-5" /> },
  { name: "Users", href: "/admin/users", icon: <Users className="w-5 h-5" /> },
  { name: "Jobs", href: "/admin/jobs", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Transactions", href: "/admin/transactions", icon: <DollarSign className="w-5 h-5" /> },
  { name: "Reports", href: "/admin/reports", icon: <AlertCircle className="w-5 h-5" /> },
]

const mockReports = [
  {
    id: 1,
    type: "User Report",
    reportedBy: "John Doe",
    reportedUser: "Mike Johnson",
    reason: "Unprofessional behavior",
    description: "Provider was rude and did not complete the job as agreed.",
    status: "Pending",
    date: "2024-01-18",
  },
  {
    id: 2,
    type: "Job Dispute",
    reportedBy: "Sarah Chen",
    reportedUser: "Emma Davis",
    reason: "Payment dispute",
    description: "Client refused to pay after job completion despite satisfactory work.",
    status: "Under Review",
    date: "2024-01-17",
  },
  {
    id: 3,
    type: "User Report",
    reportedBy: "David Wilson",
    reportedUser: "Robert Smith",
    reason: "Spam/Scam",
    description: "User is posting fake jobs to collect personal information.",
    status: "Resolved",
    date: "2024-01-15",
  },
]

export default function AdminReports() {
  const [reports, setReports] = useState(mockReports)

  const handleResolve = (reportId: number) => {
    setReports(reports.map((r) => (r.id === reportId ? { ...r, status: "Resolved" } : r)))
  }

  const handleDismiss = (reportId: number) => {
    setReports(reports.map((r) => (r.id === reportId ? { ...r, status: "Dismissed" } : r)))
  }

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <DashboardLayout role="admin" navigation={navigation}>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reports & Disputes</h2>
            <p className="text-gray-600">Manage user reports and resolve disputes</p>
          </div>

          {/* Report Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Reports</CardDescription>
                <CardTitle className="text-3xl">{reports.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Pending</CardDescription>
                <CardTitle className="text-3xl text-orange-600">
                  {reports.filter((r) => r.status === "Pending").length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Under Review</CardDescription>
                <CardTitle className="text-3xl text-blue-600">
                  {reports.filter((r) => r.status === "Under Review").length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Resolved</CardDescription>
                <CardTitle className="text-3xl text-green-600">
                  {reports.filter((r) => r.status === "Resolved").length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Reports List */}
          <Card>
            <CardHeader>
              <CardTitle>All Reports</CardTitle>
              <CardDescription>User reports and disputes requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{report.type}</h4>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              report.status === "Pending"
                                ? "bg-orange-100 text-orange-700"
                                : report.status === "Under Review"
                                  ? "bg-blue-100 text-blue-700"
                                  : report.status === "Resolved"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {report.status}
                          </span>
                        </div>
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Reported by: {report.reportedBy}</span>
                            <span>Reported user: {report.reportedUser}</span>
                            <span>Date: {new Date(report.date).toLocaleDateString()}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">Reason: </span>
                            <span className="text-gray-700">{report.reason}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">Description: </span>
                            <span className="text-gray-700">{report.description}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {report.status !== "Resolved" && report.status !== "Dismissed" && (
                      <div className="flex gap-2 pt-3 border-t">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleResolve(report.id)}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Resolved
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDismiss(report.id)}>
                          <XCircle className="w-4 h-4 mr-2" />
                          Dismiss
                        </Button>
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
