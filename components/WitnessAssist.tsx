'use client';

import { useState } from 'react';
import { Category } from '@/lib/mock-data';

interface StructuredResult {
  category: string;
  summary: string;
  hours_estimate: number;
  market_value_estimate: string;
  attestation_statement: string;
}

interface WitnessAssistProps {
  onStructured: (data: {
    category: Category;
    description: string;
  }) => void;
}

// Map AI categories to our app categories
const CATEGORY_MAP: Record<string, Category> = {
  'Mentorship': 'Mentorship',
  'Emergency Aid': 'Emergency Aid',
  'Community Service': 'Community Service',
  'Emotional Support': 'Emotional Support',
  'Physical Help': 'Physical Help',
  'Skill Sharing': 'Skill Sharing',
  'Caregiving': 'Caregiving',
  'Mutual Aid': 'Mutual Aid',
  'Other': 'Other',
};

export default function WitnessAssist({ onStructured }: WitnessAssistProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [plainText, setPlainText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StructuredResult | null>(null);
  const [error, setError] = useState('');

  async function handleStructure() {
    if (plainText.trim().length < 10) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/structure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: plainText }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to structure attestation');
      }

      const data: StructuredResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  function handleApply() {
    if (!result) return;
    const mappedCategory = CATEGORY_MAP[result.category] || 'Other';
    onStructured({
      category: mappedCategory,
      description: result.attestation_statement.slice(0, 280),
    });
    setIsOpen(false);
    setResult(null);
    setPlainText('');
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          borderRadius: '100px',
          border: '2px solid var(--lavender)',
          background: 'rgba(195, 177, 225, 0.08)',
          fontFamily: 'Nunito, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#8B6FB0',
          cursor: 'pointer',
          transition: 'all 200ms ease',
        }}
      >
        ✨ AI Assist — The Witness
      </button>
    );
  }

  return (
    <div className="card" style={{
      padding: '24px',
      border: '2px solid var(--lavender)',
      background: 'linear-gradient(135deg, #fff 0%, rgba(195, 177, 225, 0.06) 100%)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>✨</span>
          <h3 style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: '18px',
            color: 'var(--text-primary)',
            margin: 0,
          }}>
            The Witness
          </h3>
        </div>
        <button
          type="button"
          onClick={() => { setIsOpen(false); setResult(null); setError(''); }}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'Nunito',
            fontSize: '13px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          Close ×
        </button>
      </div>

      <p style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: '14px',
        color: 'var(--text-secondary)',
        lineHeight: '1.6',
        marginBottom: '16px',
      }}>
        Describe the care work in your own words. The Witness will help structure it into a formal attestation.
      </p>

      <textarea
        value={plainText}
        onChange={e => setPlainText(e.target.value)}
        placeholder="e.g., My neighbor watched my kids every Tuesday for 3 months while I was in chemo treatment. She never asked for anything..."
        rows={4}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '2px solid var(--lavender)',
          background: 'var(--bg-base)',
          fontFamily: 'Nunito, sans-serif',
          fontSize: '15px',
          lineHeight: '1.6',
          color: 'var(--text-primary)',
          outline: 'none',
          resize: 'vertical',
          transition: 'border-color 200ms ease',
          boxSizing: 'border-box',
        }}
        onFocus={e => { e.target.style.borderColor = '#8B6FB0'; }}
        onBlur={e => { e.target.style.borderColor = 'var(--lavender)'; }}
      />

      {error && (
        <div style={{
          marginTop: '12px',
          padding: '10px 14px',
          borderRadius: '10px',
          background: 'rgba(239, 71, 111, 0.08)',
          border: '1px solid rgba(239, 71, 111, 0.2)',
        }}>
          <p style={{ fontFamily: 'Nunito', fontSize: '13px', color: '#EF476F', margin: 0 }}>
            ⚠️ {error}
          </p>
        </div>
      )}

      {!result && (
        <button
          type="button"
          onClick={handleStructure}
          disabled={loading || plainText.trim().length < 10}
          style={{
            marginTop: '12px',
            padding: '10px 24px',
            borderRadius: '100px',
            border: 'none',
            background: loading || plainText.trim().length < 10 ? 'var(--warm-gray)' : '#8B6FB0',
            color: loading || plainText.trim().length < 10 ? 'var(--text-muted)' : 'white',
            fontFamily: 'Nunito, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            cursor: loading || plainText.trim().length < 10 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 200ms ease',
          }}
        >
          {loading ? (
            <>
              <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
              The Witness is listening…
            </>
          ) : (
            <>🔮 Structure with AI</>
          )}
        </button>
      )}

      {result && (
        <div style={{ marginTop: '16px' }}>
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'var(--bg-base)',
            border: '1px solid var(--warm-gray)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="pill" style={{
                background: 'rgba(195, 177, 225, 0.15)',
                color: '#8B6FB0',
              }}>
                {result.category}
              </span>
              <span className="pill" style={{
                background: 'rgba(6, 214, 160, 0.1)',
                color: '#06D6A0',
              }}>
                ~{result.hours_estimate}h
              </span>
              <span className="pill" style={{
                background: 'rgba(244, 125, 49, 0.1)',
                color: 'var(--orange-primary)',
              }}>
                {result.market_value_estimate}
              </span>
            </div>

            <div>
              <div style={{
                fontFamily: 'Nunito',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px',
              }}>
                Summary
              </div>
              <p style={{ fontFamily: 'Nunito', fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                {result.summary}
              </p>
            </div>

            <div>
              <div style={{
                fontFamily: 'Nunito',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px',
              }}>
                Attestation Statement
              </div>
              <p style={{
                fontFamily: 'Nunito',
                fontSize: '14px',
                color: 'var(--text-primary)',
                margin: 0,
                lineHeight: '1.6',
                fontStyle: 'italic',
              }}>
                &ldquo;{result.attestation_statement}&rdquo;
              </p>
            </div>
          </div>

          <div style={{
            marginTop: '12px',
            padding: '10px 14px',
            borderRadius: '10px',
            background: 'var(--orange-ultralight)',
            border: '1px solid rgba(244, 125, 49, 0.15)',
          }}>
            <p style={{ fontFamily: 'Nunito', fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              ⚡ AI-assisted attestation. Review all details before submitting on-chain.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <button
              type="button"
              onClick={handleApply}
              style={{
                padding: '10px 24px',
                borderRadius: '100px',
                border: 'none',
                background: '#8B6FB0',
                color: 'white',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
            >
              ✅ Apply to Form
            </button>
            <button
              type="button"
              onClick={() => { setResult(null); }}
              style={{
                padding: '10px 20px',
                borderRadius: '100px',
                border: '2px solid var(--warm-gray)',
                background: 'transparent',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
            >
              ↩ Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
