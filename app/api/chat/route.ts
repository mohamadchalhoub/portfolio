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

    // Get relevant context from the portfolio knowledge base
    const context = await portfolioRAG.getContextForQuery(message);

    // Generate response using the RAG system
    const reply = await portfolioRAG.generateResponse(message, context);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
