// This is a mock implementation for demo purposes
// In a real application, you would use a proper NLP library or API

export async function analyzeSentiment(text: string) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simple word-based sentiment analysis for demo
  const positiveWords = [
    "good",
    "great",
    "excellent",
    "amazing",
    "wonderful",
    "fantastic",
    "happy",
    "love",
    "best",
    "awesome",
    "perfect",
    "pleased",
    "delighted",
  ]

  const negativeWords = [
    "bad",
    "terrible",
    "awful",
    "horrible",
    "poor",
    "disappointing",
    "hate",
    "worst",
    "annoying",
    "frustrated",
    "unhappy",
    "dislike",
  ]

  const words = text.toLowerCase().match(/\b(\w+)\b/g) || []

  let positiveCount = 0
  let negativeCount = 0

  words.forEach((word) => {
    if (positiveWords.includes(word)) positiveCount++
    if (negativeWords.includes(word)) negativeCount++
  })

  const totalWords = words.length
  const positive = positiveCount / totalWords
  const negative = negativeCount / totalWords
  const neutral = 1 - positive - negative

  // Calculate overall sentiment score (-1 to 1)
  const score = (positive - negative) * 2

  // Extract key phrases (simplified for demo)
  const keyPhrases = extractKeyPhrases(text, 5)

  return {
    score,
    positive,
    negative,
    neutral,
    keyPhrases,
  }
}

function extractKeyPhrases(text: string, count: number): string[] {
  // This is a very simplified implementation
  // In a real app, you would use NLP techniques like TF-IDF

  const words = text.toLowerCase().match(/\b(\w+)\b/g) || []
  const wordFreq: Record<string, number> = {}

  // Count word frequencies
  words.forEach((word) => {
    if (word.length > 3) {
      // Ignore short words
      wordFreq[word] = (wordFreq[word] || 0) + 1
    }
  })

  // Sort by frequency
  const sortedWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0])

  // Return top phrases
  return sortedWords.slice(0, count)
}
