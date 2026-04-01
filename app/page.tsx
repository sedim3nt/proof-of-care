'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import AttestationCard from '@/components/AttestationCard';
import { MOCK_ATTESTATIONS, MOCK_STATS, CATEGORY_EMOJI } from '@/lib/mock-data';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return <>{count.toLocaleString()}{suffix}</>;
}

const HOW_IT_WORKS = [
  {
    step: '01',
    emoji: '🤝',
    title: 'Someone cares',
    description: 'A mentor guides you through a career change. Your neighbor helps you move. Someone listens when you needed it most.',
  },
  {
    step: '02',
    emoji: '✍️',
    title: 'Attest it',
    description: 'Connect your wallet and write a 280-character attestation. Who helped you, what category, a description. Takes 2 minutes.',
  },
  {
    step: '03',
    emoji: '❤️‍🔥',
    title: 'It lives forever',
    description: 'Your attestation is signed to Base, indexed in the Care Graph, and contributes to both your Care Scores. Permanent, non-transferable.',
  },
];

const CATEGORIES_PREVIEW = [
  { emoji: '📚', label: 'Mentorship' },
  { emoji: '🚨', label: 'Emergency Aid' },
  { emoji: '🌱', label: 'Community Service' },
  { emoji: '❤️‍🔥', label: 'Emotional Support' },
  { emoji: '🏠', label: 'Physical Help' },
  { emoji: '🤝', label: 'Skill Sharing' },
  { emoji: '🫶', label: 'Caregiving' },
  { emoji: '🌐', label: 'Mutual Aid' },
];

export default function HomePage() {
  const recentAttestations = MOCK_ATTESTATIONS.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(160deg, var(--cream) 0%, var(--orange-ultralight) 60%, #fff5ed 100%)',
        padding: '80px 0 96px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 125, 49, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-40px',
          left: '-60px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 214, 160, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative' }}>
          {/* Badge */}
          <div style={{ marginBottom: '24px' }}>
            <span className="pill" style={{
              background: 'rgba(244, 125, 49, 0.12)',
              color: 'var(--orange-primary)',
              fontSize: '13px',
              fontFamily: 'Nunito',
            }}>
              ⛓️ Live on Base · Open Beta
            </span>
          </div>

          <h1 style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: 'clamp(36px, 6vw, 64px)',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            maxWidth: '720px',
            marginBottom: '24px',
          }}>
            Care work is invisible
            <br />
            <span style={{ color: 'var(--orange-primary)' }}>to the economy.</span>
            <br />
            We&apos;re changing that.
          </h1>

          <p style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '18px',
            lineHeight: '1.65',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            marginBottom: '40px',
          }}>
            $10.8 trillion in annual care work — mentorship, mutual aid, emotional support, community service — goes unrecognized.
            Proof of Care puts it on-chain. Not as tokens. As reputation.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/attest" className="btn-primary">
              ✍️ Attest Care Work
            </Link>
            <Link href="/explore" className="btn-secondary">
              Browse Attestations
            </Link>
          </div>

          {/* Categories preview */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: '48px',
          }}>
            {CATEGORIES_PREVIEW.map(cat => (
              <span key={cat.label} className="pill" style={{
                background: 'rgba(255,255,255,0.7)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--warm-gray)',
                fontFamily: 'Nunito',
                fontSize: '13px',
              }}>
                {cat.emoji} {cat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{
        background: 'var(--text-primary)',
        padding: '40px 0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            textAlign: 'center',
          }}>
            {[
              { value: MOCK_STATS.totalAttestations, label: 'Attestations', suffix: '' },
              { value: MOCK_STATS.uniqueAddresses, label: 'Care Providers', suffix: '' },
              { value: Math.round(MOCK_STATS.bilateralRate * 100), label: 'Bilateral Rate', suffix: '%' },
              { value: 10800, label: 'Billion in Unpaid Care/Year', suffix: '' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: 'DM Serif Display, Georgia, serif',
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  color: 'white',
                  lineHeight: 1.1,
                }}>
                  {i === 3 ? '$' : ''}<AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.6)',
                  marginTop: '4px',
                  letterSpacing: '0.03em',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{
              fontFamily: 'DM Serif Display, Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: 'var(--text-primary)',
              marginBottom: '12px',
            }}>
              How it works
            </h2>
            <p style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '17px',
              color: 'var(--text-secondary)',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}>
              Two minutes. One wallet. Permanent record of care.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="card" style={{ padding: '32px', position: 'relative' }}>
                <div style={{
                  fontFamily: 'DM Serif Display, Georgia, serif',
                  fontSize: '72px',
                  lineHeight: 1,
                  color: 'var(--warm-gray)',
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  userSelect: 'none',
                }}>
                  {step.step}
                </div>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{step.emoji}</div>
                <h3 style={{
                  fontFamily: 'DM Serif Display, Georgia, serif',
                  fontSize: '22px',
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.65',
                  margin: 0,
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent attestations */}
      <section className="section" style={{ background: 'var(--warm-gray)', paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div>
              <h2 style={{
                fontFamily: 'DM Serif Display, Georgia, serif',
                fontSize: 'clamp(24px, 3vw, 32px)',
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}>
                Recent attestations
              </h2>
              <p style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '15px',
                color: 'var(--text-secondary)',
                margin: 0,
              }}>
                Real care work, on-chain forever.
              </p>
            </div>
            <Link href="/explore" style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--orange-primary)',
              textDecoration: 'none',
            }}>
              View all →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px',
          }}>
            {recentAttestations.map(att => (
              <AttestationCard key={att.id} attestation={att} compact />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/attest" className="btn-primary">
              ✍️ Add Your Attestation
            </Link>
          </div>
        </div>
      </section>

      {/* Why not a token */}
      <section className="section">
        <div className="container">
          <div style={{
            maxWidth: '680px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>🚫💰</div>
            <h2 style={{
              fontFamily: 'DM Serif Display, Georgia, serif',
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}>
              Not a token. Never a token.
            </h2>
            <p style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '17px',
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
              marginBottom: '20px',
            }}>
              Tokens financialize things. Financialization corrupts care. The moment you can trade &quot;care points&quot; they become something to game, not something to give.
            </p>
            <p style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '17px',
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
              marginBottom: '32px',
            }}>
              Elinor Ostrom showed us: some commons must stay outside the market to retain value. The Care Score is reputation, not currency. It accrues. It can&apos;t be bought. That&apos;s the point.
            </p>
            <Link href="/about" className="btn-secondary">
              Read the Philosophy →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg, var(--orange-primary) 0%, #e86a1c 100%)',
        padding: '80px 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            color: 'white',
            marginBottom: '16px',
            lineHeight: '1.2',
          }}>
            Someone cared for you.
            <br />
            Make it permanent.
          </h2>
          <p style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.85)',
            marginBottom: '40px',
            maxWidth: '480px',
            margin: '0 auto 40px',
            lineHeight: '1.6',
          }}>
            It takes 2 minutes and costs less than a cent on Base.
            The care you witnessed deserves a permanent record.
          </p>
          <Link href="/attest" style={{
            ...{} as React.CSSProperties,
            height: '56px',
            padding: '0 40px',
            borderRadius: '28px',
            background: 'white',
            color: 'var(--orange-primary)',
            fontFamily: 'Nunito, sans-serif',
            fontSize: '17px',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}>
            ✍️ Attest Care Work
          </Link>
        </div>
      </section>
    </div>
  );
}
