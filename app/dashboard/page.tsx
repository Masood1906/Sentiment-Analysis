"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSampleDashboardData } from "@/lib/sample-data"
import SentimentChart from "@/components/sentiment-chart"
import SentimentDistribution from "@/components/sentiment-distribution"
import TopicAnalysis from "@/components/topic-analysis"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // In a real app, this would fetch from your API based on the time range
        const data = await getSampleDashboardData(timeRange)
        setDashboardData(data)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [timeRange])

  if (loading) {
    return (
      <div className="container py-10 flex justify-center items-center min-h-[500px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">Sentiment Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.overview.averageSentiment.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData?.overview.sentimentChange > 0 ? "+" : ""}
              {dashboardData?.overview.sentimentChange.toFixed(2)} from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.overview.totalAnalyzed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Texts analyzed in selected period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Positive Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(dashboardData?.overview.positiveRatio * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData?.overview.positiveRatioChange > 0 ? "+" : ""}
              {(dashboardData?.overview.positiveRatioChange * 100).toFixed(1)}% from previous
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">Sentiment Trends</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="topics">Topic Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Over Time</CardTitle>
              <CardDescription>Track how sentiment has changed during the selected period</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <SentimentChart data={dashboardData?.trends} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Distribution</CardTitle>
              <CardDescription>Breakdown of positive, neutral, and negative sentiment</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <SentimentDistribution data={dashboardData?.distribution} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Topic Analysis</CardTitle>
              <CardDescription>Key topics and their associated sentiment</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <TopicAnalysis data={dashboardData?.topics} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
