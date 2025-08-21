import { NextRequest, NextResponse } from 'next/server';

// Enhanced AI response system with context awareness and varied responses
class SmartAI {
  private conversationContext: string[] = [];
  private responseVariations: Record<string, string[]> = {
    greeting: [
      "Hello! I'm here to help you learn more about Mohamad's portfolio. What would you like to know?",
      "Hi there! I'm excited to tell you about Mohamad's work and experience. What interests you?",
      "Hey! I'm your AI guide to Mohamad's portfolio. Ask me anything about his projects, skills, or background!",
      "Welcome! I'm here to answer all your questions about Mohamad's development journey. What would you like to explore?"
    ],
    skills: [
      "Mohamad is a skilled Full Stack Developer with expertise in React, Next.js, Node.js, TypeScript, Docker, and Cybersecurity. He's also proficient with Tailwind CSS, modern web tools, and has a strong foundation in both frontend and backend development.",
      "Mohamad's technical arsenal includes React ecosystem, Next.js for full-stack development, Node.js backend, TypeScript for type safety, Docker for containerization, and specialized knowledge in Cybersecurity. He's also experienced with modern CSS frameworks and development tools.",
      "As a Full Stack Developer, Mohamad masters React, Next.js, Node.js, TypeScript, and Docker. His unique combination of web development skills and Cybersecurity expertise makes him versatile in building secure, scalable applications.",
      "Mohamad brings together modern web technologies like React, Next.js, Node.js, and TypeScript with DevOps practices using Docker. His Cybersecurity background adds an extra layer of security awareness to all his projects."
    ],
    projects: [
      "Mohamad has built several impressive projects including a Weather App with real-time data, a Blog Site with modern CMS features, and this Portfolio showcasing his skills. Each project demonstrates different aspects of his technical abilities.",
      "Mohamad's project portfolio includes a Weather App that showcases API integration and real-time updates, a Blog Site demonstrating content management capabilities, and this Portfolio built with Next.js and Tailwind CSS. He's always working on new ideas!",
      "From a Weather App with dynamic data handling to a Blog Site with modern architecture, Mohamad's projects showcase his full-stack capabilities. His Portfolio itself is a testament to his design and development skills.",
      "Mohamad's projects range from practical applications like a Weather App to content platforms like a Blog Site. Each project is carefully crafted to demonstrate specific technical skills and user experience principles."
    ],
    github: [
      "You can explore Mohamad's code and contributions at https://github.com/mohamadchalhoub. His repositories showcase his coding style, project organization, and commitment to clean, maintainable code.",
      "Check out Mohamad's GitHub profile at https://github.com/mohamadchalhoub to see his active development work, project contributions, and coding practices. He regularly updates his repositories with new features and improvements.",
      "Visit https://github.com/mohamadchalhoub to see Mohamad's latest projects, code samples, and development activity. His GitHub reflects his passion for building and sharing quality software.",
      "Mohamad's GitHub at https://github.com/mohamadchalhoub is where you'll find his latest work, project updates, and contributions to the developer community. It's a great way to see his coding evolution!"
    ],
    linkedin: [
      "Connect with Mohamad on LinkedIn at https://www.linkedin.com/in/mohamadchalhoub. His profile showcases his professional journey, skills, and network in the tech industry.",
      "Mohamad's LinkedIn profile at https://www.linkedin.com/in/mohamadchalhoub is where you can learn about his professional experience, connect for opportunities, and stay updated on his career progress.",
      "Find Mohamad on LinkedIn: https://www.linkedin.com/in/mohamadchalhoub. His profile highlights his Full Stack Development and Cybersecurity expertise, along with his professional achievements.",
      "Visit https://www.linkedin.com/in/mohamadchalhoub to connect with Mohamad professionally. His LinkedIn showcases his technical skills, project experience, and industry connections."
    ],
    experience: [
      "Mohamad is a Full Stack Web Developer & Cybersecurity Specialist with hands-on experience building modern web applications. He combines technical expertise with security best practices to create robust, user-friendly solutions.",
      "With a background in both web development and Cybersecurity, Mohamad brings a unique perspective to his projects. He's experienced in building scalable applications while maintaining security standards and best practices.",
      "Mohamad's experience spans the full development stack, from React frontends to Node.js backends, with a specialized focus on Cybersecurity. This combination allows him to build applications that are both functional and secure.",
      "As a Full Stack Developer, Mohamad has experience across the entire development lifecycle. His Cybersecurity expertise ensures that security is built into every project from the ground up."
    ],
    contact: [
      "You can reach Mohamad through LinkedIn at https://www.linkedin.com/in/mohamadchalhoub or explore his work on GitHub at https://github.com/mohamadchalhoub. He's always open to connecting with fellow developers and potential collaborators!",
      "Connect with Mohamad on LinkedIn (https://www.linkedin.com/in/mohamadchalhoub) for professional networking, or check out his code on GitHub (https://github.com/mohamadchalhoub). He welcomes opportunities to discuss projects and collaborations.",
      "Mohamad is accessible through LinkedIn at https://www.linkedin.com/in/mohamadchalhoub and shares his development work on GitHub at https://github.com/mohamadchalhoub. Feel free to reach out for professional opportunities!",
      "For professional connections, find Mohamad on LinkedIn: https://www.linkedin.com/in/mohamadchalhoub. For his technical work, visit his GitHub: https://github.com/mohamadchalhoub. He's always interested in new opportunities!"
    ],
    about: [
      "Mohamad is a passionate developer who loves building modern web applications and exploring Cybersecurity. He's constantly learning new technologies and approaches, always looking for ways to improve his craft and create better user experiences.",
      "A dedicated Full Stack Developer with a Cybersecurity mindset, Mohamad enjoys the challenge of building applications that are both powerful and secure. He's always exploring new technologies and methodologies to stay current in the field.",
      "Mohamad combines creativity with technical expertise, building applications that solve real problems while maintaining high security standards. His passion for development drives him to continuously learn and improve his skills.",
      "As a developer, Mohamad is driven by the challenge of creating elegant solutions to complex problems. His Cybersecurity background gives him a unique perspective on building applications that users can trust and rely on."
    ],
    resume: [
      "Mohamad's CV is available in the portfolio and provides detailed information about his experience, education, and technical skills. It's a comprehensive overview of his professional background and qualifications.",
      "You can download Mohamad's CV from the portfolio to get a complete picture of his professional experience, technical skills, and educational background. It's regularly updated to reflect his latest achievements.",
      "Mohamad's resume is accessible through the portfolio and showcases his professional journey, technical expertise, and career progression. It's a great resource for understanding his qualifications and experience.",
      "The portfolio includes Mohamad's CV with detailed information about his skills, experience, and background. It's designed to give potential employers or collaborators a comprehensive understanding of his capabilities."
    ]
  };

  private getRandomResponse(category: string): string {
    const responses = this.responseVariations[category];
    if (!responses) return this.responseVariations.about[0];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private addToContext(message: string) {
    this.conversationContext.push(message.toLowerCase());
    if (this.conversationContext.length > 5) {
      this.conversationContext.shift();
    }
  }

  private getContextualResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    this.addToContext(userMessage);

    // Check for exact keyword matches first
    const exactMatches: Record<string, string> = {
      'github': 'github',
      'git': 'github',
      'code': 'github',
      'linkedin': 'linkedin',
      'profile': 'linkedin',
      'projects': 'projects',
      'project': 'projects',
      'work': 'projects',
      'skills': 'skills',
      'skill': 'skills',
      'technology': 'skills',
      'tech': 'skills',
      'experience': 'experience',
      'background': 'experience',
      'work experience': 'experience',
      'contact': 'contact',
      'email': 'contact',
      'reach': 'contact',
      'about': 'about',
      'who': 'about',
      'resume': 'resume',
      'cv': 'resume',
      'curriculum vitae': 'resume'
    };

    // Check for exact matches
    for (const [key, category] of Object.entries(exactMatches)) {
      if (message === key) {
        return this.getRandomResponse(category);
      }
    }

    // Check for partial matches with context awareness
    if (message.includes('project') || message.includes('build') || message.includes('create') || message.includes('develop')) {
      return this.getRandomResponse('projects');
    }
    
    if (message.includes('skill') || message.includes('technology') || message.includes('tech') || message.includes('learn') || message.includes('know')) {
      return this.getRandomResponse('skills');
    }
    
    if (message.includes('linkedin') || message.includes('profile') || message.includes('connect') || message.includes('network')) {
      return this.getRandomResponse('linkedin');
    }
    
    if (message.includes('github') || message.includes('code') || message.includes('repository') || message.includes('source')) {
      return this.getRandomResponse('github');
    }
    
    if (message.includes('experience') || message.includes('work') || message.includes('job') || message.includes('career')) {
      return this.getRandomResponse('experience');
    }
    
    if (message.includes('contact') || message.includes('email') || message.includes('reach') || message.includes('message')) {
      return this.getRandomResponse('contact');
    }
    
    if (message.includes('about') || message.includes('who') || message.includes('tell me about')) {
      return this.getRandomResponse('about');
    }
    
    if (message.includes('resume') || message.includes('cv') || message.includes('curriculum vitae')) {
      return this.getRandomResponse('resume');
    }

    // Greeting detection
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening')) {
      return this.getRandomResponse('greeting');
    }

    // Help detection
    if (message.includes('help') || message.includes('what can you do') || message.includes('capabilities') || message.includes('assist')) {
      return "I'm your AI assistant for Mohamad's portfolio! I can tell you about his skills, projects, experience, GitHub, LinkedIn, and more. Just ask me anything specific or try one of the suggested questions. What would you like to know?";
    }

    // Question about capabilities
    if (message.includes('what') && (message.includes('can') || message.includes('do'))) {
      return "I can help you learn about Mohamad's technical skills, project portfolio, professional experience, GitHub contributions, LinkedIn profile, and much more! I'm designed to give you comprehensive insights into his development journey. What specific area interests you?";
    }

    // Fallback with context awareness
    const contextKeywords = this.conversationContext.join(' ');
    if (contextKeywords.includes('project') || contextKeywords.includes('work')) {
      return "Based on our conversation, it sounds like you're interested in Mohamad's work. Would you like to know more about his specific projects, or would you prefer to explore his GitHub to see his code in action?";
    }
    
    if (contextKeywords.includes('skill') || contextKeywords.includes('technology')) {
      return "Since we've been discussing technical topics, would you like me to elaborate on any specific skills or technologies that Mohamad uses? I can provide detailed information about his tech stack and expertise areas.";
    }

    // Intelligent fallback
    return "That's an interesting question! While I'm specifically designed to help with information about Mohamad's portfolio, skills, and experience, I'd be happy to help you find what you're looking for. Could you rephrase your question or ask about his projects, skills, GitHub, LinkedIn, or background?";
  }

  public processMessage(userMessage: string): string {
    return this.getContextualResponse(userMessage);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ reply: "No message provided." }, { status: 400 });
    }

    // Initialize the smart AI
    const ai = new SmartAI();
    const reply = ai.processMessage(message);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { reply: "I'm experiencing some technical difficulties right now. Please try again in a moment, or feel free to explore the portfolio directly!" },
      { status: 500 }
    );
  }
}
