'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES, CATEGORY_EMOJI, Category } from '@/lib/mock-data';

const MAX_CHARS = 280;

export default function AttestPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress] = useState('0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b');
  const [recipient, setRecipient] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const charsLeft = MAX_CHARS - description.length;
  const isValid = walletConnected && recipient.length > 0 && category !== '' && description.length >= 10;

  function shortAddress(addr: string) {
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    // Simulate blockchain write
    await new Promise(r => setTimeout(r, 2000));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>❤️‍🔥</div>
        <h1 style={{
          fontFamily: 'DM Serif Display, Georgia, serif',
          fontSize: '36px',
          color: 'var(--text-primary)',
          marginBottom: '16px',
        }}>
          Attestation submitted
        </h1>
        <p style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: '17px',
          color: 'var(--text-secondary)',
          lineHeight: '1.65',
          marginBottom: '32px',
        }}>
          Your care attestation has been recorded on Base. It&apos;s permanent, public, and proof that care happened.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/explore" className="btn-primary">
            Browse Attestations
          </Link>
          <button
            onClick={() => { setSubmitted(false); setRecipient(''); setCategory(''); setDescription(''); }}
            className="btn-secondary"
          >
            Attest Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '48px 0 80px' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <Link href="/" style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '14px',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '20px',
          }}>
            ← Back
          </Link>
          <h1 style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 40px)',
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}>
            Attest care work
          </h1>
          <p style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '16px',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            margin: 0,
          }}>
            Record someone&apos;s care on the blockchain. Takes 2 minutes. Costs pennies on Base.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Wallet Connect */}
            <div className="card" style={{ padding: '24px' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}>
                Your Wallet
              </label>

              {walletConnected ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'rgba(6, 214, 160, 0.08)',
                  borderRadius: '12px',
                  border: '1px solid rgba(6, 214, 160, 0.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #F47D31, #FFD166)',
                    }} />
                    <div>
                      <div style={{ fontFamily: 'monospace', fontSize: '14px', color: 'var(--text-primary)' }}>
                        {shortAddress(walletAddress)}
                      </div>
                      <div style={{ fontFamily: 'Nunito', fontSize: '12px', color: '#06D6A0' }}>
                        Connected · Base
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWalletConnected(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontFamily: 'Nunito',
                      fontSize: '13px',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                    }}
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: '1.5',
                  }}>
                    Connect your wallet to sign this attestation on Base. Your address becomes the &quot;attester&quot; on-chain.
                  </p>
                  <button
                    type="button"
                    onClick={() => setWalletConnected(true)}
                    className="btn-primary"
                    style={{ alignSelf: 'flex-start', height: '44px', fontSize: '14px' }}
                  >
                    🔗 Connect Wallet
                  </button>
                </div>
              )}
            </div>

            {/* Recipient */}
            <div className="card" style={{ padding: '24px' }}>
              <label htmlFor="recipient" style={{
                display: 'block',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}>
                Who are you attesting? *
              </label>
              <p style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}>
                The Ethereum address of the person who provided care.
              </p>
              <input
                id="recipient"
                type="text"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="0x..."
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid var(--warm-gray)',
                  background: 'var(--bg-base)',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 200ms ease',
                  boxSizing: 'border-box',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--orange-primary)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--warm-gray)'; }}
              />
            </div>

            {/* Category */}
            <div className="card" style={{ padding: '24px' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}>
                Category *
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '8px',
              }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: `2px solid ${category === cat ? 'var(--orange-primary)' : 'var(--warm-gray)'}`,
                      background: category === cat ? 'var(--orange-ultralight)' : 'transparent',
                      fontFamily: 'Nunito, sans-serif',
                      fontSize: '14px',
                      fontWeight: category === cat ? 700 : 500,
                      color: category === cat ? 'var(--orange-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 150ms ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {CATEGORY_EMOJI[cat]} {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="card" style={{ padding: '24px' }}>
              <label htmlFor="description" style={{
                display: 'block',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}>
                Description *
              </label>
              <p style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}>
                What did they do? Be specific. This goes on-chain forever.
              </p>
              <textarea
                id="description"
                value={description}
                onChange={e => {
                  if (e.target.value.length <= MAX_CHARS) setDescription(e.target.value);
                }}
                placeholder="Describe what care was given and why it mattered..."
                rows={4}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid var(--warm-gray)',
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
                onFocus={e => { e.target.style.borderColor = 'var(--orange-primary)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--warm-gray)'; }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '6px',
              }}>
                <span style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '12px',
                  color: charsLeft < 40 ? '#EF476F' : 'var(--text-muted)',
                  fontWeight: charsLeft < 40 ? 700 : 400,
                }}>
                  {charsLeft} characters remaining
                </span>
              </div>
            </div>

            {/* Info box */}
            <div style={{
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'var(--orange-ultralight)',
              border: '1px solid rgba(244, 125, 49, 0.2)',
            }}>
              <p style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '14px',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: '1.6',
              }}>
                💡 After submission, the recipient can <strong>confirm the attestation</strong> to make it bilateral — which increases both of your Care Scores. You can find their address in{' '}
                <Link href="/explore" style={{ color: 'var(--orange-primary)' }}>Explore</Link>.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || submitting}
              className="btn-primary"
              style={{
                opacity: !isValid ? 0.5 : 1,
                cursor: !isValid ? 'not-allowed' : 'pointer',
                justifyContent: 'center',
                fontSize: '16px',
                height: '56px',
              }}
            >
              {submitting ? (
                <>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                  Signing to Base…
                </>
              ) : (
                <>✍️ Submit Attestation</>
              )}
            </button>

            {!walletConnected && (
              <p style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                color: 'var(--text-muted)',
                textAlign: 'center',
                margin: 0,
              }}>
                Connect your wallet above to enable submission.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
