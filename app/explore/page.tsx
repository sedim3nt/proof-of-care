'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import AttestationCard from '@/components/AttestationCard';
import { MOCK_ATTESTATIONS, MOCK_PROFILES, CATEGORIES, CATEGORY_EMOJI, Category } from '@/lib/mock-data';
import CareScore from '@/components/CareScore';

type Tab = 'attestations' | 'profiles';

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function ExplorePage() {
  const [tab, setTab] = useState<Tab>('attestations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [bilateralOnly, setBilateralOnly] = useState(false);

  const filteredAttestations = useMemo(() => {
    return MOCK_ATTESTATIONS.filter(att => {
      if (selectedCategory !== 'All' && att.category !== selectedCategory) return false;
      if (bilateralOnly && !att.bilateral) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          att.fromName.toLowerCase().includes(q) ||
          att.toName.toLowerCase().includes(q) ||
          att.description.toLowerCase().includes(q) ||
          att.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedCategory, bilateralOnly]);

  const profiles = Object.values(MOCK_PROFILES).sort((a, b) => b.score - a.score);

  const tabStyle = (t: Tab): React.CSSProperties => ({
    padding: '10px 24px',
    borderRadius: '100px',
    border: 'none',
    fontFamily: 'Nunito, sans-serif',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    background: tab === t ? 'var(--orange-primary)' : 'transparent',
    color: tab === t ? 'white' : 'var(--text-secondary)',
  });

  return (
    <div style={{ padding: '48px 0 80px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}>
            Explore care work
          </h1>
          <p style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '17px',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            margin: 0,
            maxWidth: '540px',
          }}>
            Browse the public record of care. Real people, real actions, permanently on Base.
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '4px',
          background: 'var(--warm-gray)',
          borderRadius: '100px',
          width: 'fit-content',
          marginBottom: '32px',
        }}>
          <button style={tabStyle('attestations')} onClick={() => setTab('attestations')}>
            📋 Attestations
          </button>
          <button style={tabStyle('profiles')} onClick={() => setTab('profiles')}>
            🏆 Top Care Providers
          </button>
        </div>

        {tab === 'attestations' && (
          <>
            {/* Search + filters */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '24px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
              {/* Search */}
              <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                <span style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '16px',
                  pointerEvents: 'none',
                }}>
                  🔍
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search names, descriptions..."
                  style={{
                    width: '100%',
                    height: '48px',
                    paddingLeft: '42px',
                    paddingRight: '16px',
                    borderRadius: '12px',
                    border: '2px solid var(--warm-gray)',
                    background: 'white',
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '15px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 200ms ease',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--orange-primary)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--warm-gray)'; }}
                />
              </div>

              {/* Bilateral toggle */}
              <button
                onClick={() => setBilateralOnly(!bilateralOnly)}
                style={{
                  height: '48px',
                  padding: '0 20px',
                  borderRadius: '12px',
                  border: `2px solid ${bilateralOnly ? 'var(--teal)' : 'var(--warm-gray)'}`,
                  background: bilateralOnly ? 'rgba(6, 214, 160, 0.08)' : 'white',
                  color: bilateralOnly ? '#06D6A0' : 'var(--text-secondary)',
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  whiteSpace: 'nowrap',
                }}
              >
                ✓ Bilateral only
              </button>
            </div>

            {/* Category filter */}
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '32px',
            }}>
              <button
                onClick={() => setSelectedCategory('All')}
                className="pill"
                style={{
                  border: `2px solid ${selectedCategory === 'All' ? 'var(--orange-primary)' : 'var(--warm-gray)'}`,
                  background: selectedCategory === 'All' ? 'var(--orange-ultralight)' : 'white',
                  color: selectedCategory === 'All' ? 'var(--orange-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontFamily: 'Nunito',
                  fontSize: '13px',
                  fontWeight: 600,
                  transition: 'all 150ms ease',
                  padding: '6px 14px',
                }}
              >
                All
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? 'All' : cat)}
                  className="pill"
                  style={{
                    border: `2px solid ${selectedCategory === cat ? 'var(--orange-primary)' : 'var(--warm-gray)'}`,
                    background: selectedCategory === cat ? 'var(--orange-ultralight)' : 'white',
                    color: selectedCategory === cat ? 'var(--orange-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontFamily: 'Nunito',
                    fontSize: '13px',
                    fontWeight: 600,
                    transition: 'all 150ms ease',
                    padding: '6px 14px',
                  }}
                >
                  {CATEGORY_EMOJI[cat]} {cat}
                </button>
              ))}
            </div>

            {/* Results count */}
            <div style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '14px',
              color: 'var(--text-muted)',
              marginBottom: '20px',
            }}>
              {filteredAttestations.length} attestation{filteredAttestations.length !== 1 ? 's' : ''} found
            </div>

            {/* Attestations grid */}
            {filteredAttestations.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: 'var(--bg-card)',
                borderRadius: '20px',
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌱</div>
                <p style={{ fontFamily: 'Nunito', fontSize: '16px', color: 'var(--text-muted)' }}>
                  No attestations found matching your filters.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setBilateralOnly(false); }}
                  className="btn-secondary"
                  style={{ marginTop: '16px', display: 'inline-flex' }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '20px',
              }}>
                {filteredAttestations.map(att => (
                  <AttestationCard key={att.id} attestation={att} compact />
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'profiles' && (
          <div>
            <p style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '15px',
              color: 'var(--text-muted)',
              marginBottom: '24px',
            }}>
              Ranked by Care Score — the non-tradeable reputation from verified attestations.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {profiles.map((profile, i) => (
                <Link key={profile.address} href={`/profile/${profile.address}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    cursor: 'pointer',
                  }}>
                    {/* Rank */}
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: i === 0 ? 'linear-gradient(135deg, #FFD166, #F47D31)' :
                                  i === 1 ? 'linear-gradient(135deg, #C3B1E1, #0EA5E9)' :
                                  i === 2 ? 'linear-gradient(135deg, #FFB88C, #F0EDE8)' :
                                  'var(--warm-gray)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'DM Serif Display',
                      fontSize: '16px',
                      color: i < 3 ? 'white' : 'var(--text-muted)',
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>

                    {/* Avatar */}
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--orange-primary), var(--yellow))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      flexShrink: 0,
                    }}>
                      🫶
                    </div>

                    {/* Name + address */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: 'DM Serif Display, Georgia, serif',
                        fontSize: '18px',
                        color: 'var(--text-primary)',
                        marginBottom: '4px',
                      }}>
                        {profile.name || shortAddress(profile.address)}
                      </div>
                      <div style={{
                        fontFamily: 'Nunito, sans-serif',
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                      }}>
                        {profile.totalAttestations} attestations · {profile.bilateralCount} bilateral
                      </div>
                    </div>

                    {/* Score */}
                    <CareScore score={profile.score} grade={profile.grade} size={80} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
