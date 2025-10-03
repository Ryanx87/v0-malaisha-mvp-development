import { createClient } from "@/lib/supabase/server"
import { getAIJobMatches } from "@/lib/ai/matching"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { jobId } = await request.json()

    const supabase = await createClient()

    // Fetch job details
    const { data: job, error: jobError } = await supabase.from("jobs").select("*").eq("id", jobId).single()

    if (jobError || !job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Fetch available providers in the area
    const { data: providers, error: providersError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_type", "provider")

    if (providersError) {
      return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 })
    }

    // Use AI to match providers
    const matches = await getAIJobMatches({
      title: job.title,
      description: job.description,
      category: job.category,
      location: job.location,
      latitude: job.latitude || 0,
      longitude: job.longitude || 0,
      budgetMin: Number(job.budget_min),
      budgetMax: Number(job.budget_max),
      providers: providers.map((p) => ({
        id: p.id,
        fullName: p.full_name || "Unknown",
        skills: p.skills || [],
        location: p.location || "Unknown",
        latitude: p.latitude || 0,
        longitude: p.longitude || 0,
        hourlyRate: Number(p.hourly_rate) || 0,
        rating: Number(p.rating) || 0,
        totalReviews: p.total_reviews || 0,
      })),
    })

    return NextResponse.json(matches)
  } catch (error) {
    console.error("[v0] AI matching error:", error)
    return NextResponse.json({ error: "Failed to generate matches" }, { status: 500 })
  }
}
