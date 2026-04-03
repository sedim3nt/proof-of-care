import Link from 'next/link';
import CareScore from '@/components/CareScore';
import AttestationCard from '@/components/AttestationCard';
import {
  MOCK_ATTESTATIONS,
  MOCK_PROFILES,
  CATEGORY_COLOR,
  CATEGORY_EMOJI,
  Category,
} from '@/lib/mock-data';
import { fetchAttestationsForAddress, CARE_SCHEMA_UID, BASE_SEPOLIA_EXPLORER, ParsedCareAttestation } from '@/lib/eas';
import ImpactNarrative from '@/components/ImpactNarrative';

interface PageProps {
  params: Promise<{ address: string }>;
}

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatTimestamp(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

const GRADE_LABEL: Record<string, string> = {
  A: 'Exceptional care provider',
  B: 'Strong care record',
  C: 'Growing care practice',
  D: 'Emerging care network',
  F: 'Just getting started',
};

export default async function ProfilePage({ params }: PageProps) {
  const { address } = await params;

  const profile = MOCK_PROFILES[address] || {
    address,
    name: undefined,
    score: 42,
    grade: 'C' as const,
    totalAttestations: 3,
    bilateralCount: 1,
    categoryBreakdown: { 'Community Service': 2, Mentorship: 1 },
    joinedDate: '2025-01-01',
  };

  // Mock data for this address
  const attestationsReceived = MOCK_ATTESTATIONS.filter(a => a.to === address);
  const attestationsGiven = MOCK_ATTESTATIONS.filter(a => a.from === address);
  const allMockAttestations = [...attestationsReceived, ...attestationsGiven];

  // Live EAS attestations for this address
  let liveAttestations: ParsedCareAttestation[] = [];
  if (CARE_SCHEMA_UID) {
    try {
      liveAttestations = await fetchAttestationsForAddress(address, CARE_SCHEMA_UID);
    } catch {
      // fail silently
    }
  }

  const categoryEntries = Object.entries(profile.categoryBreakdown) as [Category, number][];
  const maxCategoryCount = Math.max(...categoryEntries.map(([, v]) => v), 1);

  return (
    <div style={{ padding: '48px 0 80px' }}>
      <div className="container">
        <Link href="/explore" style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: '14px',
          color: 'var(--text-muted)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '32px',
        }}>
          ← All Profiles
        </Link>

        {/* Profile header */}
        <div className="card" style={{
          padding: '40px',
          marginBottom: '32px',
          background: 'linear-gradient(135deg, #fff 0%, var(--orange-ultralight) 100%)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '32px',
            flexWrap: 'wrap',
          }}>
            {/* Avatar + name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: '220px' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--orange-primary), var(--yellow))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0,
              }}>
                🫶
              </div>
              <div>
                {profile.name && (
                  <h1 style={{
                    fontFamily: 'DM Serif Display, Georgia, serif',
                    fontSize: '28px',
                    color: 'var(--text-primary)',
                    marginBottom: '4px',
                  }}>
                    {profile.name}
                  </h1>
                )}
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                }}>
                  {shortAddress(address)}
                </div>
                <div style={{ fontFamily: 'Nunito', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Member since {formatDate(profile.joinedDate)}
                </div>
              </div>
            </div>

            {/* Care Score */}
            <CareScore score={profile.score} grade={profile.grade} size={160} />

            {/* Stats */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              minWidth: '180px',
            }}>
              <div style={{
                padding: '16px 20px',
                borderRadius: '16px',
                background: 'white',
                border: '1px solid var(--warm-gray)',
              }}>
                <div style={{
                  fontFamily: 'DM Serif Display, Georgia, serif',
                  fontSize: '28px',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}>
                  {profile.totalAttestations + liveAttestations.length}
                </div>
                <div style={{ fontFamily: 'Nunito', fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Total Attestations
                </div>
              </div>
              <div style={{
                padding: '16px 20px',
                borderRadius: '16px',
                background: 'white',
                border: '1px solid var(--warm-gray)',
              }}>
                <div style={{
                  fontFamily: 'DM Serif Display, Georgia, serif',
                  fontSize: '28px',
                  color: '#06D6A0',
                  lineHeight: 1,
                }}>
                  {Math.round((profile.bilateralCount / Math.max(profile.totalAttestations, 1)) * 100)}%
                </div>
                <div style={{ fontFamily: 'Nunito', fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Bilateral Rate
                </div>
              </div>
            </div>
          </div>

          {/* Grade label */}
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--warm-gray)' }}>
            <span className="pill" style={{
              background: 'rgba(244, 125, 49, 0.1)',
              color: 'var(--orange-primary)',
              fontSize: '14px',
              fontFamily: 'Nunito',
              fontWeight: 600,
            }}>
              {GRADE_LABEL[profile.grade]}
            </span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}>
          {/* Category Breakdown */}
          <div className="card" style={{ padding: '28px' }}>
            <h2 style={{
              fontFamily: 'DM Serif Display, Georgia, serif',
              fontSize: '22px',
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}>
              Care Categories
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {categoryEntries.sort(([, a], [, b]) => b - a).map(([cat, count]) => {
                const color = CATEGORY_COLOR[cat];
                const pct = (count / maxCategoryCount) * 100;
                return (
                  <div key={cat}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '6px',
                    }}>
                      <span style={{ fontFamily: 'Nunito', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {CATEGORY_EMOJI[cat]} {cat}
                      </span>
                      <span style={{ fontFamily: 'Nunito', fontSize: '13px', color: 'var(--text-muted)' }}>
                        {count} attestation{count !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div style={{
                      height: '8px',
                      borderRadius: '100px',
                      background: 'var(--warm-gray)',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        borderRadius: '100px',
                        background: color,
                        width: `${pct}%`,
                        transition: 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick stats */}
          <div className="card" style={{ padding: '28px' }}>
            <h2 style={{
              fontFamily: 'DM Serif Display, Georgia, serif',
              fontSize: '22px',
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}>
              Care Activity
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Attestations received', value: attestationsReceived.length, emoji: '📥' },
                { label: 'Attestations given', value: attestationsGiven.length, emoji: '📤' },
                { label: 'Bilateral confirmations', value: profile.bilateralCount, emoji: '🤝' },
                { label: 'Care categories', value: categoryEntries.length, emoji: '🌈' },
                ...(liveAttestations.length > 0 ? [{ label: 'On-chain attestations', value: liveAttestations.length, emoji: '⛓️' }] : []),
              ].map(stat => (
                <div key={stat.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'var(--bg-base)',
                }}>
                  <span style={{ fontFamily: 'Nunito', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    {stat.emoji} {stat.label}
                  </span>
                  <span style={{ fontFamily: 'DM Serif Display', fontSize: '20px', color: 'var(--text-primary)' }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live attestations section */}
        {liveAttestations.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <h2 style={{
                fontFamily: 'DM Serif Display, Georgia, serif',
                fontSize: '24px',
                color: 'var(--text-primary)',
                margin: 0,
              }}>
                ⛓️ On-Chain Attestations
              </h2>
              <span style={{
                fontFamily: 'Nunito',
                fontSize: '12px',
                color: '#06D6A0',
                background: 'rgba(6, 214, 160, 0.1)',
                padding: '4px 12px',
                borderRadius: '100px',
                border: '1px solid rgba(6, 214, 160, 0.2)',
              }}>
                Base Sepolia
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {liveAttestations.map((att) => (
                <div key={att.uid} style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'white',
                  border: '1px solid rgba(6, 214, 160, 0.2)',
                  boxShadow: '0 2px 8px rgba(6, 214, 160, 0.06)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)' }}>
                        From: {shortAddress(att.attester)}
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)' }}>
                        To: {shortAddress(att.recipient)}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {att.category && (
                        <span style={{
                          fontFamily: 'Nunito',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'var(--orange-primary)',
                          background: 'var(--orange-ultralight)',
                          padding: '3px 10px',
                          borderRadius: '100px',
                        }}>
                          {att.category}
                        </span>
                      )}
                      {att.bilateral && (
                        <span style={{
                          fontFamily: 'Nunito',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#06D6A0',
                          background: 'rgba(6, 214, 160, 0.1)',
                          padding: '3px 10px',
                          borderRadius: '100px',
                        }}>
                          🤝 Bilateral
                        </span>
                      )}
                      <span style={{ fontFamily: 'Nunito', fontSize: '12px', color: 'var(--text-muted)' }}>
                        {formatTimestamp(att.time)}
                      </span>
                    </div>
                  </div>
                  {att.description && (
                    <p style={{
                      fontFamily: 'Nunito',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      margin: '0 0 12px 0',
                    }}>
                      {att.description}
                    </p>
                  )}
                  <a
                    href={`${BASE_SEPOLIA_EXPLORER}/tx/${att.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                    }}
                  >
                    tx: {att.txHash?.slice(0, 20)}… ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Impact Narrative */}
        <ImpactNarrative
          attestations={[
            ...allMockAttestations.map(a => ({
              category: a.category,
              description: a.description,
              date: a.date,
            })),
            ...liveAttestations.map(a => ({
              category: a.category,
              description: a.description,
              date: new Date(a.time * 1000).toISOString().split('T')[0],
            })),
          ]}
          name={profile.name}
        />

        {/* Mock attestation history */}
        <div>
          <h2 style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: '28px',
            color: 'var(--text-primary)',
            marginBottom: '20px',
          }}>
            Attestation History
          </h2>

          {allMockAttestations.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--bg-card)',
              borderRadius: '20px',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌱</div>
              <p style={{ fontFamily: 'Nunito', fontSize: '16px', color: 'var(--text-muted)' }}>
                No attestations yet. Be the first to recognize their care.
              </p>
              <Link href="/attest" className="btn-primary" style={{ marginTop: '20px', display: 'inline-flex' }}>
                ✍️ Attest Care
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {allMockAttestations.map(att => (
                <AttestationCard key={att.id} attestation={att} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
