"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface TopicAnalysisProps {
  data: any[]
}

export default function TopicAnalysis({ data }: TopicAnalysisProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="topic" />
        <YAxis domain={[-1, 1]} />
        <Tooltip formatter={(value: number) => [value.toFixed(2), "Sentiment Score"]} />
        <Legend />
        <Bar dataKey="sentiment" fill="#8884d8" name="Sentiment Score" />
        <Bar dataKey="frequency" fill="#82ca9d" name="Frequency" />
      </BarChart>
    </ResponsiveContainer>
  )
}
