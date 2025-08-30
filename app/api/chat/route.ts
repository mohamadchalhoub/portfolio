import { NextRequest, NextResponse } from 'next/server';
import { portfolioRAG } from '@/lib/rag';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Initialize RAG system if not already done
    if (!portfolioRAG.isInitialized) {
      await portfolioRAG.initialize();
    }

    // Generate comprehensive response that can handle both portfolio and general questions
    const reply = await portfolioRAG.generateComprehensiveResponse(message);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
