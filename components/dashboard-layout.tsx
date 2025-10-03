"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LogOut,
  Menu,
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  CreditCard,
  Star,
  Users,
  FileText,
} from "lucide-react"
import { useState } from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: string
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getNavigation = () => {
    if (role === "client") {
      return [
        { name: "Dashboard", href: "/client/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: "My Jobs", href: "/client/jobs", icon: <Briefcase className="w-5 h-5" /> },
        { name: "Messages", href: "/client/messages", icon: <MessageSquare className="w-5 h-5" /> },
        { name: "Payments", href: "/client/payments", icon: <CreditCard className="w-5 h-5" /> },
        { name: "Reviews", href: "/client/reviews", icon: <Star className="w-5 h-5" /> },
      ]
    } else if (role === "provider") {
      return [
        { name: "Dashboard", href: "/provider/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: "Find Jobs", href: "/provider/jobs", icon: <Briefcase className="w-5 h-5" /> },
        { name: "Applications", href: "/provider/applications", icon: <FileText className="w-5 h-5" /> },
        { name: "Messages", href: "/provider/messages", icon: <MessageSquare className="w-5 h-5" /> },
        { name: "Earnings", href: "/provider/earnings", icon: <CreditCard className="w-5 h-5" /> },
        { name: "Reviews", href: "/provider/reviews", icon: <Star className="w-5 h-5" /> },
      ]
    } else if (role === "admin") {
      return [
        { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: "Users", href: "/admin/users", icon: <Users className="w-5 h-5" /> },
        { name: "Jobs", href: "/admin/jobs", icon: <Briefcase className="w-5 h-5" /> },
        { name: "Transactions", href: "/admin/transactions", icon: <CreditCard className="w-5 h-5" /> },
        { name: "Reports", href: "/admin/reports", icon: <FileText className="w-5 h-5" /> },
      ]
    }
    return []
  }

  const navigation = getNavigation()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const getRoleLabel = () => {
    if (role === "client") return "Client"
    if (role === "provider") return "Service Provider"
    if (role === "admin") return "Admin"
    return ""
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Malaisha</h1>
              <p className="text-xs text-gray-600">{getRoleLabel()} Dashboard</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <aside className={`${isMobileMenuOpen ? "block" : "hidden"} lg:block w-64 flex-shrink-0`}>
            <nav className="space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
