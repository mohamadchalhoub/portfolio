import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Portfolio context for the AI
const PORTFOLIO_CONTEXT = `
You are an AI assistant for Mohamad Chalhoub's portfolio website. You should be helpful, professional, and knowledgeable about Mohamad's background and work.

ABOUT MOHAMAD CHALHOUB:
- Full Stack Web Developer & Cybersecurity Specialist
- Passionate about building secure, scalable web applications
- Combines development expertise with cybersecurity knowledge
- Always learning new technologies and best practices

TECHNICAL SKILLS:
- Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express.js, RESTful APIs, Authentication
- Databases: MySQL, MongoDB, Database Design
- DevOps: Docker, Git, Modern development workflows
- Security: Web Application Security, Penetration Testing, OWASP Top 10, Secure Coding

CURRENT PROJECTS SHOWCASED:
1. Portfolio Website - Modern, responsive portfolio built with Next.js and Tailwind CSS
2. AWTAD - Advanced Steel Design & Engineering Website built with Next.js and Supabase

CONTACT INFORMATION:
- GitHub: https://github.com/mohamadchalhoub
- LinkedIn: https://www.linkedin.com/in/mohamad-chalhoub-91851126b
- Email: chalhoubmohd@gmail.com

GUIDELINES:
1. Always be helpful and professional
2. Focus on Mohamad's portfolio, skills, and projects when relevant
3. If asked about topics outside his portfolio, still be helpful but try to relate back to his work
4. Encourage visitors to explore his projects, GitHub, or contact him
5. Be conversational and engaging
6. Keep responses concise but informative
7. Use emojis sparingly and professionally

Remember: You're representing Mohamad's professional brand, so maintain a professional yet friendly tone.
`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ reply: "No message provided." }, { status: 400 });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured, falling back to basic responses');
      return getFallbackResponse(message);
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: PORTFOLIO_CONTEXT
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      const reply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request. Please try again.";

      return NextResponse.json({ reply });
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError);
      // Fallback to basic response if OpenAI fails
      return getFallbackResponse(message);
    }

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { reply: "I'm experiencing some technical difficulties right now. Please try again in a moment, or feel free to explore the portfolio directly!" },
      { status: 500 }
    );
  }
}

// Fallback response system when OpenAI is not available
function getFallbackResponse(message: string): NextResponse {
  const msg = message.toLowerCase();
  
  let reply = "";
  
  if (msg.includes('skill') || msg.includes('technology') || msg.includes('tech')) {
    reply = "Mohamad is skilled in React, Next.js, Node.js, TypeScript, and cybersecurity. He specializes in building secure, scalable web applications with modern technologies.";
  } else if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio')) {
    reply = "Mohamad has showcased several projects including his portfolio website and AWTAD - Advanced Steel Design & Engineering Website. You can explore them in the 'My Work' section or check his GitHub for more projects.";
  } else if (msg.includes('github') || msg.includes('code')) {
    reply = "You can explore Mohamad's code and projects on GitHub: https://github.com/mohamadchalhoub";
  } else if (msg.includes('linkedin') || msg.includes('contact')) {
    reply = "Connect with Mohamad on LinkedIn: https://www.linkedin.com/in/mohamad-chalhoub-91851126b or email him at chalhoubmohd@gmail.com";
  } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    reply = "Hello! I'm here to help you learn more about Mohamad's portfolio, skills, and projects. What would you like to know?";
  } else {
    reply = "I'm Mohamad's portfolio assistant! I can tell you about his skills, projects, GitHub, LinkedIn, or background. What would you like to know?";
  }
  
  return NextResponse.json({ reply });
}