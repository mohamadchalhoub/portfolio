import { aiIntegration } from './ai-integration';

// Portfolio knowledge base
const PORTFOLIO_KNOWLEDGE = `
# Mohamad Chalhoub - Portfolio Knowledge Base

## Personal Information
- Name: Mohamad Chalhoub
- Email: chalhoubmohd@gmail.com
- Location: Lebanon
- Role: Full Stack Developer

## Technical Skills
- Frontend: React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS
- Backend: Node.js, Express.js, Python, Django, Flask
- Database: MongoDB, PostgreSQL, MySQL, Redis
- DevOps: Docker, AWS, Vercel, Netlify, CI/CD
- Tools: Git, GitHub, VS Code, Postman, Figma
- Other: REST APIs, GraphQL, Microservices, Agile/Scrum

## Projects

### Project 1: E-commerce Platform
- Built a full-stack e-commerce application using React, Node.js, and MongoDB
- Implemented user authentication, product management, and payment integration
- Features: responsive design, real-time inventory, order tracking

### Project 2: Task Management App
- Developed a collaborative task management application with real-time updates
- Technologies: Next.js, TypeScript, Socket.io, PostgreSQL
- Features: team collaboration, task assignments, progress tracking

### Project 3: Portfolio Website
- Created a modern, responsive portfolio website using Next.js and Tailwind CSS
- Features: dark/light theme, contact form, project showcase, responsive design

## Work Experience
- Full Stack Developer at Tech Company (2022-Present)
  - Developed and maintained web applications
  - Collaborated with cross-functional teams
  - Implemented new features and bug fixes

- Junior Developer at Startup (2021-2022)
  - Built responsive user interfaces
  - Integrated third-party APIs
  - Participated in code reviews

## Education
- Bachelor's Degree in Computer Science
- Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems

## Professional Interests
- Web Development
- Mobile App Development
- Cloud Computing
- Machine Learning
- Open Source Contribution

## Contact Information
- GitHub: github.com/mohamadchalhoub
- LinkedIn: linkedin.com/in/mohamadchalhoub
- Email: chalhoubmohd@gmail.com
- Portfolio: mohamadchalhoub.com

## Current Focus
- Building scalable web applications
- Learning new technologies and frameworks
- Contributing to open source projects
- Networking with other developers
`;

export class PortfolioRAG {
  public isInitialized = false;

  constructor() {
    // Initialize without external dependencies for now
  }

  async initialize() {
    try {
      // For now, we'll use a simple keyword-based approach
      // In the future, this can be enhanced with proper vector embeddings
      this.isInitialized = true;
      console.log('RAG system initialized successfully (keyword-based mode)');
    } catch (error) {
      console.error('Error initializing RAG system:', error);
      // Fallback to keyword-based mode
      this.isInitialized = true;
    }
  }

  async search(query: string): Promise<string[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const queryLower = query.toLowerCase();
    const knowledgeChunks = PORTFOLIO_KNOWLEDGE.split('\n\n');
    const relevantChunks: string[] = [];

    for (const chunk of knowledgeChunks) {
      if (chunk.toLowerCase().includes(queryLower) || 
          this.calculateRelevance(queryLower, chunk.toLowerCase()) > 0.3) {
        relevantChunks.push(chunk);
      }
    }

    return relevantChunks.slice(0, 3); // Return top 3 relevant chunks
  }

  private calculateRelevance(query: string, text: string): number {
    const queryWords = query.split(' ').filter(word => word.length > 2);
    const textWords = text.split(' ').filter(word => word.length > 2);
    
    let matches = 0;
    for (const queryWord of queryWords) {
      if (textWords.some(textWord => textWord.includes(queryWord) || queryWord.includes(textWord))) {
        matches++;
      }
    }
    
    return matches / queryWords.length;
  }

  async getContextForQuery(query: string): Promise<string> {
    try {
      const relevantChunks = await this.search(query);
      return relevantChunks.join('\n\n');
    } catch (error) {
      console.error('Error getting context:', error);
      return '';
    }
  }

  async generateResponse(query: string, context: string): Promise<string> {
    // Generate intelligent responses based on the context and query
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('skill') || queryLower.includes('technology') || queryLower.includes('tech')) {
      return `Based on Mohamad's portfolio, here are his key technical skills:

Frontend: React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS
Backend: Node.js, Express.js, Python, Django, Flask
Database: MongoDB, PostgreSQL, MySQL, Redis
DevOps: Docker, AWS, Vercel, Netlify, CI/CD
Tools: Git, GitHub, VS Code, Postman, Figma

He's a full-stack developer with expertise in modern web technologies and cloud platforms.`;
    }
    
    if (queryLower.includes('project') || queryLower.includes('work') || queryLower.includes('portfolio')) {
      return `Mohamad has worked on several impressive projects:

1. E-commerce Platform: Full-stack app with React, Node.js, MongoDB
2. Task Management App: Collaborative tool with Next.js, TypeScript, Socket.io
3. Portfolio Website: Modern responsive site with Next.js and Tailwind CSS

Each project demonstrates his skills in building scalable, user-friendly applications.`;
    }
    
    if (queryLower.includes('github') || queryLower.includes('code') || queryLower.includes('repository')) {
      return `You can find Mohamad's projects and code on GitHub at: github.com/mohamadchalhoub

He's actively contributing to open source and building personal projects to showcase his skills.`;
    }
    
    if (queryLower.includes('linkedin') || queryLower.includes('network') || queryLower.includes('connect')) {
      return `Connect with Mohamad on LinkedIn at: linkedin.com/in/mohamadchalhoub

He's always interested in networking with other developers and exploring new opportunities.`;
    }
    
    if (queryLower.includes('contact') || queryLower.includes('email') || queryLower.includes('reach')) {
      return `You can reach Mohamad through:

Email: chalhoubmohd@gmail.com
GitHub: github.com/mohamadchalhoub
LinkedIn: linkedin.com/in/mohamadchalhoub
Portfolio: mohamadchalhoub.com

He's open to discussing new projects, collaborations, and opportunities!`;
    }
    
    if (queryLower.includes('experience') || queryLower.includes('work') || queryLower.includes('job')) {
      return `Mohamad's work experience includes:

- Full Stack Developer at Tech Company (2022-Present)
  - Developed and maintained web applications
  - Collaborated with cross-functional teams
  - Implemented new features and bug fixes

- Junior Developer at Startup (2021-2022)
  - Built responsive user interfaces
  - Integrated third-party APIs
  - Participated in code reviews`;
    }
    
    // Default response with context
    return `I'm Mohamad's AI assistant, and I can help you learn about his skills, projects, and experience. 

Based on your question about "${query}", here's what I found:

${context}

Try asking about:
- His technical skills and expertise
- His projects and portfolio
- His GitHub or LinkedIn profiles
- How to contact him
- His work experience

What would you like to know about Mohamad?`;
  }

  // Main method to generate responses for any type of query
  async generateComprehensiveResponse(query: string): Promise<string> {
    const queryLower = query.toLowerCase();
    
    // Check if this is a portfolio-related query
    const isPortfolioQuery = this.isPortfolioRelated(queryLower);
    
    if (isPortfolioQuery) {
      // Get context and generate portfolio response
      const context = await this.getContextForQuery(query);
      return this.generateResponse(query, context);
    } else {
      // Handle general questions using AI integration
      try {
        const aiResponse = await aiIntegration.generateGeneralResponse(query);
        return `${aiResponse.text}\n\n💡 **Note**: I'm primarily designed to help with questions about Mohamad's portfolio. For more detailed general assistance, consider using a general AI assistant.`;
      } catch (error) {
        console.error('Error generating general response:', error);
        return this.generateFallbackResponse(query);
      }
    }
  }

  private isPortfolioRelated(query: string): boolean {
    const portfolioKeywords = [
      'mohamad', 'chalhoub', 'portfolio', 'skill', 'project', 'experience',
      'work', 'job', 'github', 'linkedin', 'contact', 'email', 'technology',
      'tech', 'code', 'developer', 'programming', 'software', 'web', 'app',
      'react', 'next', 'node', 'python', 'database', 'aws', 'docker'
    ];
    
    return portfolioKeywords.some(keyword => query.includes(keyword));
  }

  private generateFallbackResponse(query: string): string {
    return `I'm Mohamad's portfolio AI assistant, so I'm best at answering questions about his skills, projects, and experience. 

Your question "${query}" seems to be about something else. I'd recommend:
- Using a general AI assistant like ChatGPT or Claude for broader topics
- Consulting relevant documentation or resources
- Reaching out to subject matter experts

What would you like to know about Mohamad's portfolio? I can tell you about his:
- Technical skills and technologies
- Projects and work experience
- GitHub and LinkedIn profiles
- How to contact him`;
  }
}

// Singleton instance
export const portfolioRAG = new PortfolioRAG();
