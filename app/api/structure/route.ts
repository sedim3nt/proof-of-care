import { generateText } from 'ai';
import { defaultModel } from '@/lib/ai-provider';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are The Witness, helping people formally attest to care work.
Given a plain-text description of care work, respond with ONLY valid JSON (no markdown, no code fences):
{
  "category": "Mentorship|Emergency Aid|Community Service|Emotional Support|Physical Help|Skill Sharing|Caregiving|Mutual Aid|Other",
  "summary": "1 sentence formal attestation",
  "hours_estimate": number,
  "market_value_estimate": "$X based on Y rate",
  "attestation_statement": "2-3 sentence formal statement suitable for blockchain record"
}

Be generous in valuing care work — use professional rates as baseline:
- Home health aide: $25-35/hr
- Therapy/counseling: $150/hr
- Childcare: $20-30/hr
- Mentorship/coaching: $100-200/hr
- Emergency services: $50-75/hr
- Community organizing: $30-50/hr
- Skilled trades: $50-100/hr

Use the EXACT category names listed above. Pick the best match.`;

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json();

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a description of at least 10 characters.' },
        { status: 400 }
      );
    }

    const { text } = await generateText({
      model: defaultModel,
      system: SYSTEM_PROMPT,
      prompt: description.trim(),
      maxOutputTokens: 500,
      temperature: 0.3,
    });

    // Parse the JSON response
    const cleaned = text.replace(/```json?\s*/g, '').replace(/```\s*/g, '').trim();
    const structured = JSON.parse(cleaned);

    return NextResponse.json(structured);
  } catch (error) {
    console.error('Structure API error:', error);
    return NextResponse.json(
      { error: 'Failed to structure attestation. Please try again.' },
      { status: 500 }
    );
  }
}
