import Link from "next/link"
import { ArrowRight, BarChart3, MessageSquare, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6" />
              <span className="font-bold">SentiMeter</span>
            </Link>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-4">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/analyze" className="text-sm font-medium">
              Analyze
            </Link>
            <Link
              href="https://github.com/Masood1906/sentiment-dashboard"
              target="_blank"
              className="text-sm font-medium"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Sentiment Analysis Dashboard
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Analyze sentiment from text data and visualize trends with powerful AI-driven insights.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link href="/analyze">
                    Start Analyzing <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powerful Sentiment Analysis</h2>
                <p className="text-muted-foreground md:text-xl">
                  Leverage machine learning to extract insights from text data and visualize sentiment trends over time.
                </p>
              </div>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Text Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Analyze sentiment from product reviews, social media posts, customer feedback, and more.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Trend Visualization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Track sentiment changes over time with interactive charts and comprehensive dashboards.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SentiMeter. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Built by Mohammed Masood Ahmed</p>
        </div>
      </footer>
    </div>
  )
}
