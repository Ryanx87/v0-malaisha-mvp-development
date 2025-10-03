import { generateObject } from "ai"
import { z } from "zod"

const matchSchema = z.object({
  matches: z.array(
    z.object({
      providerId: z.string(),
      score: z.number().min(0).max(100),
      reasoning: z.string(),
      distanceKm: z.number(),
    }),
  ),
  insights: z.string(),
})

export async function getAIJobMatches(job: {
  title: string
  description: string
  category: string
  location: string
  latitude: number
  longitude: number
  budgetMin: number
  budgetMax: number
  providers: Array<{
    id: string
    fullName: string
    skills: string[]
    location: string
    latitude: number
    longitude: number
    hourlyRate: number
    rating: number
    totalReviews: number
  }>
}) {
  const { object } = await generateObject({
    model: "openai/gpt-4o-mini",
    schema: matchSchema,
    prompt: `You are an AI matching system for a South African skills marketplace called Malaisha.

Analyze this job posting and rank the service providers by match quality:

Job Details:
- Title: ${job.title}
- Description: ${job.description}
- Category: ${job.category}
- Location: ${job.location} (${job.latitude}, ${job.longitude})
- Budget: R${job.budgetMin} - R${job.budgetMax}

Available Providers:
${job.providers
  .map((p, i) => {
    const distance = calculateDistance(job.latitude, job.longitude, p.latitude, p.longitude)
    return `${i + 1}. ${p.fullName}
   - Skills: ${p.skills.join(", ")}
   - Location: ${p.location} (${distance.toFixed(1)}km away)
   - Hourly Rate: R${p.hourlyRate}
   - Rating: ${p.rating}/5 (${p.totalReviews} reviews)`
  })
  .join("\n\n")}

Rank providers by:
1. Skills match with job category and description (40%)
2. Location proximity - prefer providers within 20km (30%)
3. Budget compatibility with hourly rate (20%)
4. Rating and reviews (10%)

Provide a match score (0-100) for each provider and explain your reasoning. Focus on South African context and local area knowledge.`,
  })

  return object
}

export async function getAIAnalytics(data: {
  totalJobs: number
  totalProviders: number
  totalClients: number
  totalTransactions: number
  totalRevenue: number
  recentJobs: Array<{
    title: string
    category: string
    location: string
    budget: number
    status: string
  }>
  recentApplications: Array<{
    jobTitle: string
    providerName: string
    bidAmount: number
    status: string
  }>
  topCategories: Array<{ category: string; count: number }>
  topLocations: Array<{ location: string; count: number }>
}) {
  const { object } = await generateObject({
    model: "openai/gpt-4o-mini",
    schema: z.object({
      summary: z.string(),
      trends: z.array(z.string()),
      recommendations: z.array(z.string()),
      insights: z.object({
        demandAnalysis: z.string(),
        supplyAnalysis: z.string(),
        pricingTrends: z.string(),
        geographicInsights: z.string(),
      }),
      predictions: z.array(
        z.object({
          metric: z.string(),
          prediction: z.string(),
          confidence: z.enum(["high", "medium", "low"]),
        }),
      ),
    }),
    prompt: `You are an AI analytics assistant for Malaisha, a South African skills marketplace platform.

Analyze the following platform data and provide insights:

Platform Overview:
- Total Jobs Posted: ${data.totalJobs}
- Total Service Providers: ${data.totalProviders}
- Total Clients: ${data.totalClients}
- Total Transactions: ${data.totalTransactions}
- Total Revenue: R${data.totalRevenue.toLocaleString()}

Top Categories:
${data.topCategories.map((c) => `- ${c.category}: ${c.count} jobs`).join("\n")}

Top Locations:
${data.topLocations.map((l) => `- ${l.location}: ${l.count} jobs`).join("\n")}

Recent Job Activity:
${data.recentJobs
  .slice(0, 5)
  .map((j) => `- ${j.title} (${j.category}) in ${j.location} - R${j.budget} - ${j.status}`)
  .join("\n")}

Recent Applications:
${data.recentApplications
  .slice(0, 5)
  .map((a) => `- ${a.providerName} applied for "${a.jobTitle}" - R${a.bidAmount} - ${a.status}`)
  .join("\n")}

Provide:
1. A concise summary of platform health
2. Key trends you observe
3. Actionable recommendations for platform growth
4. Detailed insights on demand, supply, pricing, and geographic patterns
5. Predictions for key metrics with confidence levels

Focus on South African market context and local economic factors.`,
  })

  return object
}

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
