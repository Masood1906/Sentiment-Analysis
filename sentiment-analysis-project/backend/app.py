from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from collections import Counter
import string

# Download necessary NLTK data
nltk.download('vader_lexicon')
nltk.download('punkt')
nltk.download('stopwords')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the sentiment analyzer
sia = SentimentIntensityAnalyzer()

@app.route('/api/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    text = data['text']
    
    # Get sentiment scores
    sentiment_scores = sia.polarity_scores(text)
    
    # Extract key phrases
    key_phrases = extract_key_phrases(text)
    
    # Prepare response
    response = {
        'score': sentiment_scores['compound'],  # Range from -1 to 1
        'positive': sentiment_scores['pos'],
        'negative': sentiment_scores['neg'],
        'neutral': sentiment_scores['neu'],
        'keyPhrases': key_phrases
    }
    
    return jsonify(response)

def extract_key_phrases(text, max_phrases=5):
    # Tokenize and clean text
    tokens = word_tokenize(text.lower())
    stop_words = set(stopwords.words('english'))
    punctuation = set(string.punctuation)
    
    # Filter out stopwords and punctuation
    filtered_tokens = [word for word in tokens if word not in stop_words and word not in punctuation and len(word) > 3]
    
    # Count word frequencies
    word_freq = Counter(filtered_tokens)
    
    # Get most common words
    most_common = word_freq.most_common(max_phrases)
    
    # Return just the words
    return [word for word, _ in most_common]

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)