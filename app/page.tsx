"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>, role: string) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      localStorage.setItem("userRole", role)
      localStorage.setItem("isAuthenticated", "true")

      // Redirect based on role
      if (role === "client") {
        router.push("/client/dashboard")
      } else if (role === "provider") {
        router.push("/provider/dashboard")
      } else if (role === "admin") {
        router.push("/admin/dashboard")
      }

      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Malaisha</h1>
              <p className="text-xs text-gray-600">by Greenspot Legacy</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Welcome to Malaisha</h2>
            <p className="text-lg text-gray-600">Building Digital Solutions for Tomorrow</p>
          </div>

          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="client">Client</TabsTrigger>
              <TabsTrigger value="provider">Service Provider</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            {/* Client Login */}
            <TabsContent value="client">
              <Card>
                <CardHeader>
                  <CardTitle>Client Login</CardTitle>
                  <CardDescription>Post jobs and hire skilled professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleLogin(e, "client")} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="client-email">Email</Label>
                      <Input id="client-email" type="email" placeholder="client@example.com" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In as Client"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Provider Login */}
            <TabsContent value="provider">
              <Card>
                <CardHeader>
                  <CardTitle>Service Provider Login</CardTitle>
                  <CardDescription>Find jobs and grow your business</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleLogin(e, "provider")} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="provider-email">Email</Label>
                      <Input id="provider-email" type="email" placeholder="provider@example.com" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In as Provider"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Admin Login */}
            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Login</CardTitle>
                  <CardDescription>Manage platform and users</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleLogin(e, "admin")} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input id="admin-email" type="email" placeholder="admin@greenspot.com" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In as Admin"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>&copy; 2025 Greenspot Legacy. Building Digital Solutions for Tomorrow.</p>
        </div>
      </footer>
    </div>
  )
}
