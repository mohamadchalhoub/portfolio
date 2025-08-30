// AI Integration for handling general questions
export interface AIResponse {
  text: string;
  source: string;
  confidence: number;
}

export class AIIntegration {
  private openaiApiKey: string | undefined;

  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
  }

  async generateGeneralResponse(query: string): Promise<AIResponse> {
    // Option 1: OpenAI GPT (if API key is available)
    if (this.openaiApiKey) {
      try {
        return await this.generateOpenAIResponse(query);
      } catch (error) {
        console.error('OpenAI API error:', error);
        // Fallback to rule-based responses
      }
    }

    // Option 2: Rule-based responses (fallback)
    return this.generateRuleBasedResponse(query);
  }

  private async generateOpenAIResponse(query: string): Promise<AIResponse> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant. Provide concise, accurate answers to general questions. Keep responses under 150 words.'
            },
            {
              role: 'user',
              content: query
            }
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';

      return {
        text,
        source: 'OpenAI GPT',
        confidence: 0.9,
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }

  private generateRuleBasedResponse(query: string): AIResponse {
    const queryLower = query.toLowerCase();
    
    // Common question patterns and responses
    if (queryLower.includes('weather')) {
      return {
        text: "I can't provide real-time weather information, but I can help you find weather apps or websites. For current weather, try checking weather.com or your local weather service.",
        source: 'Rule-based',
        confidence: 0.8,
      };
    }

    if (queryLower.includes('joke') || queryLower.includes('funny')) {
      return {
        text: "I'm focused on being helpful rather than entertaining, but I can recommend some great comedy podcasts or shows! What would you like help with?",
        source: 'Rule-based',
        confidence: 0.7,
      };
    }

    if (queryLower.includes('math') || queryLower.includes('calculate')) {
      return {
        text: "For mathematical calculations, I'd recommend using a calculator app or website like Wolfram Alpha. I'm better at helping with other types of questions.",
        source: 'Rule-based',
        confidence: 0.8,
      };
    }

    if (queryLower.includes('recipe') || queryLower.includes('cooking')) {
      return {
        text: "I can't provide recipes, but I can recommend great cooking websites like AllRecipes, Food Network, or Bon Appétit. What would you like to cook?",
        source: 'Rule-based',
        confidence: 0.7,
      };
    }

    if (queryLower.includes('movie') || queryLower.includes('film')) {
      return {
        text: "I can't make movie recommendations, but I'd suggest checking out IMDb, Rotten Tomatoes, or asking friends for suggestions. What genre are you interested in?",
        source: 'Rule-based',
        confidence: 0.6,
      };
    }

    // Default response for unrecognized queries
    return {
      text: "I'm not sure how to help with that specific question. I'm designed to assist with portfolio-related inquiries, but for general questions, I'd recommend using a general AI assistant like ChatGPT or consulting relevant resources.",
      source: 'Rule-based',
      confidence: 0.5,
    };
  }

  // Method to check if a query should be handled by general AI
  shouldUseGeneralAI(query: string): boolean {
    const generalTopics = [
      'weather', 'joke', 'math', 'recipe', 'cooking', 'movie', 'film',
      'music', 'sports', 'news', 'politics', 'history', 'science',
      'philosophy', 'religion', 'travel', 'health', 'fitness'
    ];
    
    return generalTopics.some(topic => query.toLowerCase().includes(topic));
  }
}

// Singleton instance
export const aiIntegration = new AIIntegration();
