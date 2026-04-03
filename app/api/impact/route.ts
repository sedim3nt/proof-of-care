import { generateText } from 'ai';
import { defaultModel } from '@/lib/ai-provider';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are The Witness. Given a person's attestation history, write a 2-paragraph impact narrative.

First paragraph: factual summary of care provided (hours, types, value). Be specific with numbers.

Second paragraph: the human meaning — what this care means in context, why it matters, what it represents. Be genuine, not sentimental. Avoid clichés. Speak to the concrete reality of what this person has built through care.

End with a single line: "Estimated market value of care provided: $X"

Write in a warm but direct voice. No bullet points. No headers. Just two clean paragraphs and the closing line.`;

export async function POST(request: NextRequest) {
  try {
    const { attestations, name } = await request.json();

    if (!attestations || !Array.isArray(attestations) || attestations.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one attestation.' },
        { status: 400 }
      );
    }

    const summary = attestations.map((a: { category?: string; description?: string; date?: string }, i: number) =>
      `${i + 1}. [${a.category || 'Uncategorized'}] ${a.description || 'No description'} (${a.date || 'unknown date'})`
    ).join('\n');

    const prompt = `Generate an impact narrative for ${name || 'this person'} based on their attestation history:\n\n${summary}`;

    const { text } = await generateText({
      model: defaultModel,
      system: SYSTEM_PROMPT,
      prompt,
      maxOutputTokens: 600,
      temperature: 0.5,
    });

    return NextResponse.json({ narrative: text.trim() });
  } catch (error) {
    console.error('Impact API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate impact narrative. Please try again.' },
      { status: 500 }
    );
  }
}
