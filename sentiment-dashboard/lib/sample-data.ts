// This file provides mock data for the dashboard
// In a real application, this would come from your backend API

export async function getSampleDashboardData(timeRange: string) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate different data based on time range
  const dataPoints = timeRange === "24h" ? 24 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90

  // Overview metrics
  const overview = {
    averageSentiment: 0.32,
    sentimentChange: 0.05,
    totalAnalyzed: timeRange === "24h" ? 1243 : timeRange === "7d" ? 8752 : timeRange === "30d" ? 34521 : 103642,
    positiveRatio: 0.65,
    positiveRatioChange: 0.03,
  }

  // Generate trend data
  const trends = generateTrendData(dataPoints)

  // Sentiment distribution
  const distribution = {
    positive: 0.65,
    neutral: 0.25,
    negative: 0.1,
  }

  // Topic analysis
  const topics = [
    { topic: "Customer Service", sentiment: 0.75, frequency: 0.25 },
    { topic: "Product Quality", sentiment: 0.45, frequency: 0.35 },
    { topic: "Pricing", sentiment: -0.15, frequency: 0.15 },
    { topic: "Shipping", sentiment: -0.35, frequency: 0.1 },
    { topic: "Website Experience", sentiment: 0.25, frequency: 0.15 },
  ]

  return {
    overview,
    trends,
    distribution,
    topics,
  }
}

function generateTrendData(points: number) {
  const data = []
  const now = new Date()

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate random sentiment values with some consistency
    const sentiment = Math.sin(i * 0.5) * 0.3 + Math.random() * 0.4
    const positive = Math.max(0, sentiment + Math.random() * 0.3)
    const negative = Math.max(0, -sentiment + Math.random() * 0.2)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      sentiment: sentiment,
      positive: positive,
      negative: negative,
    })
  }

  return data
}
