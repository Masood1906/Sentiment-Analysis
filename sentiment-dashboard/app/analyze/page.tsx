"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { analyzeSentiment } from "@/lib/sentiment-analysis"

export default function AnalyzePage() {
  const [text, setText] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("input")

  const handleAnalyze = async () => {
    if (!text.trim()) return

    setLoading(true)
    try {
      // In a real app, this would call your API
      const analysis = await analyzeSentiment(text)
      setResult(analysis)
      setActiveTab("results")
    } catch (error) {
      console.error("Error analyzing text:", error)
    } finally {
      setLoading(false)
    }
  }

  const getSentimentColor = (score: number) => {
    if (score > 0.5) return "bg-green-500"
    if (score < -0.5) return "bg-red-500"
    return "bg-yellow-500"
  }

  const getSentimentLabel = (score: number) => {
    if (score > 0.5) return "Positive"
    if (score < -0.5) return "Negative"
    return "Neutral"
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Analyze Sentiment</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input Text</TabsTrigger>
          <TabsTrigger value="results" disabled={!result}>
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Enter Text to Analyze</CardTitle>
              <CardDescription>
                Paste any text like product reviews, social media posts, or customer feedback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter text to analyze sentiment..."
                className="min-h-[200px] mb-4"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button onClick={handleAnalyze} disabled={!text.trim() || loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Sentiment"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis Results</CardTitle>
                <CardDescription>AI-powered analysis of your text</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Overall Sentiment</span>
                    <Badge className={getSentimentColor(result.score)} variant="outline">
                      {getSentimentLabel(result.score)}
                    </Badge>
                  </div>
                  <Progress value={(result.score + 1) * 50} className="h-2" />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">Positive</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-2xl font-bold">{Math.round(result.positive * 100)}%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">Neutral</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-2xl font-bold">{Math.round(result.neutral * 100)}%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">Negative</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-2xl font-bold">{Math.round(result.negative * 100)}%</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Phrases</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.keyPhrases.map((phrase: string, i: number) => (
                      <Badge key={i} variant="secondary">
                        {phrase}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button onClick={() => setActiveTab("input")} variant="outline">
                  Analyze Another Text
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
