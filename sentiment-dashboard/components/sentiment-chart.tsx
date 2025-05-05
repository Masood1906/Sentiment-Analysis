"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface SentimentChartProps {
  data: any[]
}

export default function SentimentChart({ data }: SentimentChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[-1, 1]} />
        <Tooltip
          formatter={(value: number) => [value.toFixed(2), "Sentiment Score"]}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend />
        <Line type="monotone" dataKey="sentiment" stroke="#8884d8" activeDot={{ r: 8 }} name="Overall Sentiment" />
        <Line type="monotone" dataKey="positive" stroke="#4ade80" name="Positive" />
        <Line type="monotone" dataKey="negative" stroke="#f87171" name="Negative" />
      </LineChart>
    </ResponsiveContainer>
  )
}
