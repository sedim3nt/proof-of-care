'use client';

import { useState } from 'react';

interface Attestation {
  category: string;
  description: string;
  date?: string;
}

interface ImpactNarrativeProps {
  attestations: Attestation[];
  name?: string;
}

export default function ImpactNarrative({ attestations, name }: ImpactNarrativeProps) {
  const [narrative, setNarrative] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generated, setGenerated] = useState(false);

  async function handleGenerate() {
    if (attestations.length === 0) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/impact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attestations, name }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to generate narrative');
      }

      const data = await res.json();
      setNarrative(data.narrative);
      setGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (attestations.length === 0) return null;

  return (
    <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: generated ? '20px' : '0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>✨</span>
          <h2 style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: '22px',
            color: 'var(--text-primary)',
            margin: 0,
          }}>
            Impact Narrative
          </h2>
        </div>
        {!generated && (
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              padding: '8px 20px',
              borderRadius: '100px',
              border: 'none',
              background: loading ? 'var(--warm-gray)' : '#8B6FB0',
              color: loading ? 'var(--text-muted)' : 'white',
              fontFamily: 'Nunito, sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 200ms ease',
            }}
          >
            {loading ? (
              <>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                Generating…
              </>
            ) : (
              <>🔮 Generate with AI</>
            )}
          </button>
        )}
      </div>

      {!generated && !loading && (
        <p style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: '14px',
          color: 'var(--text-muted)',
          marginTop: '8px',
          marginBottom: 0,
        }}>
          Let The Witness generate an impact narrative from this person&apos;s care history.
        </p>
      )}

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

      {generated && narrative && (
        <>
          <div style={{
            padding: '20px 24px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--bg-base) 0%, rgba(195, 177, 225, 0.06) 100%)',
            border: '1px solid rgba(195, 177, 225, 0.2)',
          }}>
            {narrative.split('\n\n').map((paragraph, i) => (
              <p key={i} style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: '1.75',
                margin: i === 0 ? '0 0 16px 0' : 0,
              }}>
                {paragraph}
              </p>
            ))}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '12px',
          }}>
            <p style={{
              fontFamily: 'Nunito',
              fontSize: '11px',
              color: 'var(--text-muted)',
              margin: 0,
            }}>
              ⚡ AI-generated narrative by The Witness. Based on attestation data.
            </p>
            <button
              onClick={() => { setGenerated(false); setNarrative(''); }}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'Nunito',
                fontSize: '12px',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Regenerate
            </button>
          </div>
        </>
      )}
    </div>
  );
}
