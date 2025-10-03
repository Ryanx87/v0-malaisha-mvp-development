"use client"

import type React from "react"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, MessageSquare, Star, Clock, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/client/dashboard", icon: <Briefcase className="w-5 h-5" /> },
  { name: "My Jobs", href: "/client/jobs", icon: <Clock className="w-5 h-5" /> },
  { name: "Messages", href: "/client/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { name: "Reviews", href: "/client/reviews", icon: <Star className="w-5 h-5" /> },
]

const categories = [
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
  "Other",
]

export default function NewJob() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budgetMin: "",
    budgetMax: "",
    location: "",
    urgency: "normal",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/client/jobs")
    }, 1500)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <AuthGuard allowedRoles={["client"]}>
      <DashboardLayout role="client" navigation={navigation}>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <Link href="/client/jobs">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </Button>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h2>
            <p className="text-gray-600">Fill in the details to find the perfect service provider</p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Provide clear information to attract qualified professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Plumbing Repair Needed"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange("category", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the job in detail. Include what needs to be done, any specific requirements, and timeline expectations."
                    rows={6}
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    required
                  />
                </div>

                {/* Budget Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budgetMin">Minimum Budget (R) *</Label>
                    <Input
                      id="budgetMin"
                      type="number"
                      placeholder="150"
                      value={formData.budgetMin}
                      onChange={(e) => handleChange("budgetMin", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budgetMax">Maximum Budget (R) *</Label>
                    <Input
                      id="budgetMax"
                      type="number"
                      placeholder="200"
                      value={formData.budgetMax}
                      onChange={(e) => handleChange("budgetMax", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Sandton, Johannesburg"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    required
                  />
                </div>

                {/* Urgency */}
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency *</Label>
                  <Select value={formData.urgency} onValueChange={(value) => handleChange("urgency", value)} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent (within 24 hours)</SelectItem>
                      <SelectItem value="normal">Normal (within a week)</SelectItem>
                      <SelectItem value="flexible">Flexible (no rush)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Posting Job..." : "Post Job"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.push("/client/jobs")}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
