import { NextRequest, NextResponse } from 'next/server';
import { portfolioRAG } from '@/lib/rag';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const message = body?.message;
    const history = Array.isArray(body?.history) ? body.history.slice(-8) : [];

    if (typeof message !== 'string' || !message.trim() || message.length > 1500) {
      return NextResponse.json(
        { error: 'Please enter a message between 1 and 1500 characters.' },
        { status: 400 }
      );
    }

    // Initialize RAG system if not already done
    if (!portfolioRAG.isInitialized) {
      await portfolioRAG.initialize();
    }

    // Generate comprehensive response that can handle both portfolio and general questions
    const reply = await portfolioRAG.generateComprehensiveResponse(message, history);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
