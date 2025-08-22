import { NextRequest, NextResponse } from 'next/server';

// Simple, Smart Portfolio AI - Actually Works!
class PortfolioAI {
  private context = {
    name: "Mohamad Chalhoub",
    title: "Full Stack Web Developer & Cybersecurity Specialist",
    skills: {
      frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
      backend: ["Node.js", "Express.js", "RESTful APIs", "Authentication", "Database Design"],
      databases: ["MySQL", "MongoDB", "Database Design", "Data Modeling"],
      devops: ["Docker", "Git", "Modern Development Workflows", "CI/CD"],
      security: ["Web Application Security", "Penetration Testing", "OWASP Top 10", "Secure Coding", "Vulnerability Assessment"]
    },
    projects: [
      {
        name: "Portfolio Website",
        description: "Modern, responsive portfolio built with Next.js and Tailwind CSS",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        features: ["Responsive design", "Interactive components", "Mobile navigation", "Project showcase"]
      },
      {
        name: "AWTAD - Steel Design & Engineering",
        description: "Advanced steel design and engineering website built with Next.js and Supabase",
        tech: ["Next.js", "Supabase", "Modern web technologies"],
        features: ["Professional engineering solutions", "Responsive design", "Database integration"]
      }
    ],
    contact: {
      github: "https://github.com/mohamadchalhoub",
      linkedin: "https://www.linkedin.com/in/mohamad-chalhoub-91851126b",
      email: "chalhoubmohd@gmail.com"
    },
    experience: "Combines full-stack development expertise with cybersecurity knowledge to create applications that are both powerful and secure from the ground up.",
    learning: "Always exploring new technologies and methodologies to stay current in the field."
  };

  // Simple, intelligent question matching
  private generateResponse(userMessage: string): string {
    const message = userMessage.toLowerCase().trim();
    
    // Direct question matching - much more accurate
    if (this.isQuestionAbout(message, ['skill', 'technology', 'tech', 'expertise', 'what can you do', 'capabilities'])) {
      return this.getSkillsResponse();
    }
    
    if (this.isQuestionAbout(message, ['project', 'work', 'portfolio', 'build', 'create', 'website', 'what have you built'])) {
      return this.getProjectsResponse();
    }
    
    if (this.isQuestionAbout(message, ['github', 'code', 'repository', 'source', 'repo', 'where is your code'])) {
      return this.getGitHubResponse();
    }
    
    if (this.isQuestionAbout(message, ['linkedin', 'contact', 'connect', 'reach', 'email', 'message', 'how to contact', 'get in touch'])) {
      return this.getContactResponse();
    }
    
    if (this.isQuestionAbout(message, ['experience', 'background', 'career', 'journey', 'history', 'how long', 'what is your experience'])) {
      return this.getExperienceResponse();
    }
    
    if (this.isQuestionAbout(message, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'greetings'])) {
      return this.getGreetingResponse();
    }
    
    if (this.isQuestionAbout(message, ['about', 'who', 'tell me about', 'introduce', 'who are you'])) {
      return this.getAboutResponse();
    }
    
    if (this.isQuestionAbout(message, ['help', 'what can you do', 'capabilities', 'assist', 'how can you help'])) {
      return this.getHelpResponse();
    }
    
    if (this.isQuestionAbout(message, ['education', 'degree', 'university', 'college', 'study', 'where did you study'])) {
      return this.getEducationResponse();
    }
    
    if (this.isQuestionAbout(message, ['security', 'cybersecurity', 'penetration', 'hacking', 'vulnerability', 'owasp', 'security skills'])) {
      return this.getSecurityResponse();
    }
    
    if (this.isQuestionAbout(message, ['process', 'methodology', 'approach', 'workflow', 'development cycle', 'how do you work'])) {
      return this.getDevelopmentProcessResponse();
    }
    
    if (this.isQuestionAbout(message, ['future', 'plan', 'next', 'goal', 'aspiration', 'what are your goals'])) {
      return this.getFuturePlansResponse();
    }
    
    // If no direct match, use intelligent context matching
    return this.getIntelligentResponse(message);
  }

  // Smart question matching - checks if the question is REALLY about a topic
  private isQuestionAbout(message: string, keywords: string[]): boolean {
    // Check if any keyword is present
    const hasKeyword = keywords.some(keyword => message.includes(keyword));
    
    // Additional context checks for better accuracy
    if (hasKeyword) {
      // For skills questions, look for question words
      if (keywords.includes('skill') || keywords.includes('technology')) {
        return message.includes('what') || message.includes('skill') || message.includes('technology') || 
               message.includes('can you') || message.includes('expertise');
      }
      
      // For project questions, look for project-related context
      if (keywords.includes('project') || keywords.includes('work')) {
        return message.includes('project') || message.includes('work') || message.includes('built') || 
               message.includes('created') || message.includes('show me');
      }
      
      // For contact questions, look for contact intent
      if (keywords.includes('contact') || keywords.includes('reach')) {
        return message.includes('contact') || message.includes('reach') || message.includes('get in touch') || 
               message.includes('email') || message.includes('linkedin');
      }
      
      // For other questions, the keyword presence is usually sufficient
      return true;
    }
    
    return false;
  }

  // Intelligent response for unknown questions
  private getIntelligentResponse(message: string): string {
    // Try to understand what the user is asking
    if (message.includes('?')) {
      // It's a question, try to help
      if (message.includes('how') || message.includes('what') || message.includes('why') || message.includes('when') || message.includes('where')) {
        return this.getHelpfulResponse(message);
      }
    }
    
    // If it's not a clear question, provide portfolio information
    return this.getPortfolioOverview();
  }

  private getHelpfulResponse(message: string): string {
    return `I want to make sure I'm being helpful! Your question "${message}" seems to be about something I might not have specific information about.\n\n` +
           `**Here's what I can definitely help you with**:\n` +
           `🎯 **Mohamad's Skills & Expertise** - Frontend, backend, security, and more\n` +
           `🌐 **His Projects** - Portfolio website, AWTAD, and other work\n` +
           `💼 **Professional Experience** - Background and development approach\n` +
           `🔗 **Contact Information** - LinkedIn, GitHub, and email\n\n` +
           `**Try asking about**:\n` +
           `• "What are your technical skills?"\n` +
           `• "Tell me about your projects"\n` +
           `• "How can I contact you?"\n` +
           `• "What's your experience with React?"\n\n` +
           `**Or rephrase your question** to be more specific about Mohamad's portfolio, skills, or work. I'm here to help!`;
  }

  private getPortfolioOverview(): string {
    return `Hello! I'm your AI assistant for Mohamad's portfolio. I can help you learn about:\n\n` +
           `🎯 **Technical Skills**: React, Next.js, Node.js, TypeScript, Cybersecurity\n` +
           `🌐 **Projects**: Portfolio website, AWTAD engineering site\n` +
           `💼 **Experience**: Full-stack development with security focus\n` +
           `🔗 **Contact**: LinkedIn, GitHub, Email\n\n` +
           `**What would you like to know?** Try asking about his skills, projects, experience, or how to get in touch!`;
  }

  private getSkillsResponse(): string {
    const frontend = this.context.skills.frontend.join(', ');
    const backend = this.context.skills.backend.join(', ');
    const security = this.context.skills.security.join(', ');
    
    return `Mohamad is a skilled ${this.context.title} with expertise in:\n\n` +
           `🎨 **Frontend**: ${frontend}\n` +
           `⚙️ **Backend**: ${backend}\n` +
           `🔒 **Security**: ${security}\n\n` +
           `He specializes in building secure, scalable web applications with modern technologies and best practices. His unique combination of development and security expertise allows him to create applications that are both powerful and protected.`;
  }

  private getProjectsResponse(): string {
    return `Mohamad has showcased several impressive projects:\n\n` +
           `🌐 **${this.context.projects[0].name}**: ${this.context.projects[0].description}\n` +
           `🏗️ **${this.context.projects[1].name}**: ${this.context.projects[1].description}\n\n` +
           `You can explore these projects in the 'My Work' section of his portfolio, or check out his GitHub for more code samples and development work.`;
  }

  private getGitHubResponse(): string {
    return `You can explore Mohamad's code and projects on GitHub: ${this.context.contact.github}\n\n` +
           `His repositories showcase his coding style, project organization, and commitment to clean, maintainable code. He regularly updates his repositories with new features and improvements.`;
  }

  private getContactResponse(): string {
    return `Connect with Mohamad through:\n\n` +
           `🔗 **LinkedIn**: ${this.context.contact.linkedin}\n` +
           `📧 **Email**: ${this.context.contact.email}\n\n` +
           `He's always open to discussing new opportunities, innovative projects, and creative collaborations. Feel free to reach out!`;
  }

  private getExperienceResponse(): string {
    return `${this.context.experience}\n\n` +
           `With a background in both web development and cybersecurity, Mohamad brings a unique perspective to his projects. He's experienced in building scalable applications while maintaining security standards and best practices.`;
  }

  private getGreetingResponse(): string {
    return `Hello! I'm your AI assistant for Mohamad's portfolio. I'm here to help you learn more about his skills, projects, experience, and background.\n\n` +
           `What would you like to know about Mohamad's development journey?`;
  }

  private getAboutResponse(): string {
    return `Mohamad is a passionate ${this.context.title} who loves building modern web applications and exploring cybersecurity.\n\n` +
           `He's constantly learning new technologies and approaches, always looking for ways to improve his craft and create better user experiences. His dedication to both development and security makes him a valuable asset for any project.`;
  }

  private getHelpResponse(): string {
    return `I'm your AI guide to Mohamad's portfolio! I can tell you about:\n\n` +
           `• His technical skills and expertise\n` +
           `• Current projects and work\n` +
           `• Professional experience and background\n` +
           `• GitHub repositories and code\n` +
           `• LinkedIn profile and contact info\n\n` +
           `Just ask me anything specific about Mohamad's portfolio, skills, or experience!`;
  }

  private getDefaultResponse(): string {
    return `That's an interesting question! I'm specifically designed to help with information about Mohamad's portfolio, skills, and experience.\n\n` +
           `I can tell you about his technical expertise, projects, GitHub contributions, LinkedIn profile, or professional background. What specific area would you like to explore?`;
  }

  private getEducationResponse(): string {
    return `Mohamad is passionate about continuous learning and professional development. While I don't have specific details about his formal education, I can tell you about his practical expertise and ongoing learning journey.\n\n` +
           `He's constantly exploring new technologies, methodologies, and best practices in web development and cybersecurity. His hands-on experience with modern frameworks and security practices demonstrates his commitment to staying current in the field.\n\n` +
           `Would you like to know more about his technical skills, projects, or professional experience?`;
  }

  private getSecurityResponse(): string {
    return `🔒 **Cybersecurity Expertise**: Mohamad specializes in web application security and brings this knowledge to every project he builds.\n\n` +
           `**Key Security Skills**:\n` +
           `• Web Application Security\n` +
           `• Penetration Testing\n` +
           `• OWASP Top 10 Implementation\n` +
           `• Secure Coding Practices\n` +
           `• Vulnerability Assessment\n\n` +
           `His unique combination of development and security expertise means he builds applications that are both powerful and secure from the ground up. This is a rare and valuable skill set in today's digital landscape.\n\n` +
           `Would you like to know more about his technical skills or see examples of his secure development approach?`;
  }

  private getDevelopmentProcessResponse(): string {
    return `🔄 **Development Methodology**: Mohamad follows modern, agile development practices to create high-quality applications.\n\n` +
           `**His Approach**:\n` +
           `• **Planning**: Understanding requirements and user needs\n` +
           `• **Design**: Creating intuitive, responsive user interfaces\n` +
           `• **Development**: Building with modern frameworks and best practices\n` +
           `• **Security**: Implementing security measures throughout the process\n` +
           `• **Testing**: Ensuring quality and functionality\n` +
           `• **Deployment**: Smooth, reliable deployment to production\n\n` +
           `He emphasizes clean code, maintainable architecture, and user experience in every project. His background in cybersecurity also means security is never an afterthought.\n\n` +
           `Would you like to see examples of his work or learn more about his technical skills?`;
  }

  private getFuturePlansResponse(): string {
    return `🚀 **Future Vision**: Mohamad is passionate about technology and has ambitious goals for his career.\n\n` +
           `**His Aspirations**:\n` +
           `• Continue mastering modern web technologies\n` +
           `• Build more innovative and impactful applications\n` +
           `• Contribute to open-source projects\n` +
           `• Share knowledge with the developer community\n` +
           `• Explore emerging technologies like AI/ML integration\n` +
           `• Advance his cybersecurity expertise\n\n` +
           `He's always looking for new challenges and opportunities to grow. His portfolio showcases his current capabilities, but he's constantly evolving and learning.\n\n` +
           `Would you like to discuss potential collaborations or learn more about his current projects?`;
  }

  private getSmartFallbackResponse(userMessage: string): string {
    // Analyze the user's question to provide helpful suggestions
    const message = userMessage.toLowerCase();
    
    // Check if it's a technical question we might not cover
    if (message.includes('react') || message.includes('next.js') || message.includes('node.js') || message.includes('typescript')) {
      return `That's a great technical question! While I can tell you about Mohamad's expertise with ${message.includes('react') ? 'React' : message.includes('next.js') ? 'Next.js' : message.includes('node.js') ? 'Node.js' : 'TypeScript'}, I'm specifically designed to help with information about his portfolio, skills, and experience.\n\n` +
             `**What I can help you with**:\n` +
             `• His technical skills and expertise\n` +
             `• Current projects and work\n` +
             `• Professional background and experience\n` +
             `• GitHub repositories and code samples\n` +
             `• Contact information and networking\n\n` +
             `**For technical questions**: You might want to check his GitHub repositories or reach out directly for detailed technical discussions.`;
    }
    
    // Check if it's about hiring or business
    if (message.includes('hire') || message.includes('job') || message.includes('employment') || message.includes('work for') || message.includes('collaborate')) {
      return `That's a great question about professional opportunities! I can tell you about Mohamad's skills and experience, but for specific hiring or collaboration discussions, it's best to reach out directly.\n\n` +
             `**How to connect**:\n` +
             `🔗 **LinkedIn**: ${this.context.contact.linkedin}\n` +
             `📧 **Email**: ${this.context.contact.email}\n\n` +
             `**What I can tell you**:\n` +
             `• His technical expertise and skills\n` +
             `• Project portfolio and work samples\n` +
             `• Professional background and experience\n` +
             `• GitHub contributions and code quality`;
    }
    
    // Check if it's a personal question
    if (message.includes('personal') || message.includes('family') || message.includes('hobby') || message.includes('interest') || message.includes('life')) {
      return `I'm designed to help with professional and portfolio-related questions about Mohamad. For personal questions, it's best to reach out directly if you have a professional relationship.\n\n` +
             `**What I can help you with**:\n` +
             `• Professional skills and expertise\n` +
             `• Portfolio projects and work\n` +
             `• Technical background and experience\n` +
             `• Professional networking and contact\n\n` +
             `**Professional focus**: I'm here to help you understand Mohamad's professional capabilities and work.`;
    }
    
    // Check if it's about pricing or rates
    if (message.includes('price') || message.includes('rate') || message.includes('cost') || message.includes('fee') || message.includes('budget')) {
      return `That's a great question about project pricing and rates! While I can tell you about Mohamad's skills and experience, specific pricing discussions are best handled directly.\n\n` +
             `**What I can tell you**:\n` +
             `• His technical expertise and capabilities\n` +
             `• Project portfolio and work quality\n` +
             `• Development approach and methodology\n` +
             `• Professional background and reliability\n\n` +
             `**For pricing discussions**: Please reach out directly through LinkedIn or email to discuss your specific project requirements and budget.`;
    }
    
    // Check if it's about availability or timeline
    if (message.includes('available') || message.includes('timeline') || message.includes('schedule') || message.includes('when') || message.includes('deadline')) {
      return `That's a great question about availability and project timelines! I can tell you about Mohamad's capabilities, but specific scheduling discussions are best handled directly.\n\n` +
             `**What I can tell you**:\n` +
             `• His development approach and methodology\n` +
             `• Project portfolio and work quality\n` +
             `• Technical expertise and reliability\n` +
             `• Professional background and experience\n\n` +
             `**For availability discussions**: Please reach out directly through LinkedIn or email to discuss your specific timeline and project requirements.`;
    }
    
    // Generic smart fallback with learning suggestion
    return `That's an interesting question! While I'm specifically designed to help with information about Mohamad's portfolio, skills, and professional experience, I want to make sure I'm being helpful.\n\n` +
           `**Here's what I can help you with**:\n` +
           `🎯 **Skills & Expertise**: Frontend, backend, security, and more\n` +
           `🌐 **Projects**: Portfolio website, AWTAD, and other work\n` +
           `💼 **Experience**: Professional background and development approach\n` +
           `🔗 **Contact**: LinkedIn, GitHub, and email information\n\n` +
           `**If your question is about**:\n` +
           `• Technical details → Check his GitHub\n` +
           `• Professional opportunities → Reach out directly\n` +
           `• Portfolio information → I'm your expert!\n\n` +
           `**💡 Pro Tip**: Try asking about specific areas like "What are your technical skills?" or "Tell me about your projects" for the most helpful responses!\n\n` +
           `What specific area of his portfolio would you like to explore?`;
  }

  public processMessage(userMessage: string): string {
    // Simple, direct response generation
    const response = this.generateResponse(userMessage);
    console.log(`Question: "${userMessage}" → Response type: ${response.includes('🎯') ? 'Portfolio Info' : 'Helpful Guidance'}`);
    return response;
  }

  // Simple, helpful fallback for unknown questions
  private getHelpfulFallbackResponse(userMessage: string): string {
    return `I want to be helpful! Your question "${userMessage}" seems to be about something I don't have specific information about.\n\n` +
           `**Here's what I can definitely help you with**:\n` +
           `🎯 **Mohamad's Skills & Expertise** - Frontend, backend, security, and more\n` +
           `🌐 **His Projects** - Portfolio website, AWTAD, and other work\n` +
           `💼 **Professional Experience** - Background and development approach\n` +
           `🔗 **Contact Information** - LinkedIn, GitHub, and email\n\n` +
           `**Try asking about**:\n` +
           `• "What are your technical skills?"\n` +
           `• "Tell me about your projects"\n` +
           `• "How can I contact you?"\n` +
           `• "What's your experience with React?"\n\n` +
           `**Or rephrase your question** to be more specific about Mohamad's portfolio, skills, or work. I'm here to help!`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ reply: "No message provided." }, { status: 400 });
    }

    // Use our simple, smart PortfolioAI system
    console.log('Using Simple PortfolioAI system');
    
    try {
      const ai = new PortfolioAI();
      const reply = ai.processMessage(message);
      
      console.log('PortfolioAI response generated successfully!');
      return NextResponse.json({ reply });
      
    } catch (aiError: any) {
      console.error('PortfolioAI error:', aiError);
      // Fallback to basic response if AI fails
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