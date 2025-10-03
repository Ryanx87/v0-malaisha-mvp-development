"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Briefcase, Users, Shield, ArrowRight, CheckCircle2 } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>, role: string) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      localStorage.setItem("userRole", role)
      localStorage.setItem("isAuthenticated", "true")

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/20 to-background">
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-bold text-2xl">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Malaisha</h1>
              <p className="text-xs text-muted-foreground">by Greenspot Legacy</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                South Africa's Skills Marketplace
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Connect with skilled professionals
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Building digital solutions for tomorrow. Find local talent or discover opportunities in your area.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="text-base shadow-lg shadow-primary/20">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-base bg-transparent">
                  Learn More
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Verified Professionals</p>
                    <p className="text-sm text-muted-foreground">Trusted local talent</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Secure Payments</p>
                    <p className="text-sm text-muted-foreground">Safe transactions</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Tabs defaultValue="client" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6 h-auto p-1 bg-muted/50">
                  <TabsTrigger value="client" className="data-[state=active]:bg-card data-[state=active]:shadow-md">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Client
                  </TabsTrigger>
                  <TabsTrigger value="provider" className="data-[state=active]:bg-card data-[state=active]:shadow-md">
                    <Users className="w-4 h-4 mr-2" />
                    Provider
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="data-[state=active]:bg-card data-[state=active]:shadow-md">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="client">
                  <Card className="border-2 shadow-xl">
                    <CardHeader className="space-y-1 pb-4">
                      <CardTitle className="text-2xl">Client Login</CardTitle>
                      <CardDescription className="text-base">Post jobs and hire skilled professionals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={(e) => handleLogin(e, "client")} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="client-email" className="text-base">
                            Email
                          </Label>
                          <Input
                            id="client-email"
                            type="email"
                            placeholder="client@example.com"
                            required
                            className="h-11"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-11 text-base shadow-lg shadow-primary/20"
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing in..." : "Sign In as Client"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="provider">
                  <Card className="border-2 shadow-xl">
                    <CardHeader className="space-y-1 pb-4">
                      <CardTitle className="text-2xl">Service Provider Login</CardTitle>
                      <CardDescription className="text-base">Find jobs and grow your business</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={(e) => handleLogin(e, "provider")} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="provider-email" className="text-base">
                            Email
                          </Label>
                          <Input
                            id="provider-email"
                            type="email"
                            placeholder="provider@example.com"
                            required
                            className="h-11"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-11 text-base shadow-lg shadow-primary/20"
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing in..." : "Sign In as Provider"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="admin">
                  <Card className="border-2 shadow-xl">
                    <CardHeader className="space-y-1 pb-4">
                      <CardTitle className="text-2xl">Admin Login</CardTitle>
                      <CardDescription className="text-base">Manage platform and users</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={(e) => handleLogin(e, "admin")} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="admin-email" className="text-base">
                            Email
                          </Label>
                          <Input
                            id="admin-email"
                            type="email"
                            placeholder="admin@greenspot.com"
                            required
                            className="h-11"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-11 text-base shadow-lg shadow-primary/20"
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing in..." : "Sign In as Admin"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-card/80 backdrop-blur-md py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            &copy; 2025 Greenspot Legacy. Building Digital Solutions for Tomorrow.
          </p>
        </div>
      </footer>
    </div>
  )
}
