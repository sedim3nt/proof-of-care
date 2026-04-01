import Link from 'next/link';

const OSTROM_PRINCIPLES = [
  {
    number: '01',
    title: 'Clearly defined boundaries',
    description: 'Who is a care provider? Who receives care? The Care Graph has explicit attestation schemas. The community is bounded by the protocol, not by gatekeepers.',
  },
  {
    number: '02',
    title: 'Rules match local conditions',
    description: 'Attestation categories evolve through governance. What counts as "care" in rural Guatemala may differ from urban Seoul. The protocol makes room for this.',
  },
  {
    number: '03',
    title: 'Collective choice arrangements',
    description: 'Care Score weights are set through on-chain governance. The community that generates care data controls how that data is valued.',
  },
  {
    number: '04',
    title: 'Monitoring',
    description: 'Attestations are public and bilateral. The care graph is queryable. Fake attestations are visible and weighted accordingly. Transparency is the enforcement.',
  },
  {
    number: '05',
    title: 'Graduated sanctions',
    description: 'Unilateral attestations carry less weight. Flagged attestations can be disputed. Reputation builds slowly and is expensive to fake.',
  },
  {
    number: '06',
    title: 'Conflict resolution mechanisms',
    description: 'Any attestation can be disputed. The community can vote on contested cases. The protocol includes human judgment, not just algorithms.',
  },
  {
    number: '07',
    title: 'Minimal recognition of rights',
    description: 'The protocol operates on Base, a public L2. No permission required. No application process. Any address can attest care.',
  },
  {
    number: '08',
    title: 'Nested enterprises',
    description: 'Local mutual aid networks, DAOs, and nonprofits can build on top of Proof of Care. The protocol is infrastructure, not product.',
  },
];

const FAQ = [
  {
    q: 'Can I fake attestations?',
    a: 'You can write a unilateral attestation, but it carries less weight in the Care Score. Bilateral attestations require both parties to sign, making fabrication expensive. The care graph makes patterns visible — fake attestation rings look different from real care networks.',
  },
  {
    q: 'What if someone attests something that didn\'t happen?',
    a: 'Any attestation can be disputed. The recipient can publicly deny it. The community can vote to weight it at zero. The transparency of the public record is the enforcement mechanism.',
  },
  {
    q: 'Why Base?',
    a: 'Base is Coinbase\'s L2. Low fees (a cent or less per attestation), EAS already deployed, USDC native. More importantly: it\'s regulated and real-name connected, which makes Sybil attacks harder.',
  },
  {
    q: 'Will the Care Score ever become a token?',
    a: 'No. This is a core design commitment, not a feature flag. The moment the Care Score becomes tradeable, it becomes something to game rather than something to give. Elinor Ostrom showed us this: some commons must stay outside the market to retain value.',
  },
  {
    q: 'What can I do with a Care Score?',
    a: 'In v0.1: prove your care work history. In future versions: qualify for DAO grants, unlock access to care networks, demonstrate trustworthiness in peer-to-peer coordination. The value accrues in the social layer, not the financial layer.',
  },
  {
    q: 'Is this open source?',
    a: 'Yes. The protocol is MIT licensed. The smart contracts are public. The indexer is public. We want this to be infrastructure, not product.',
  },
];

export default function AboutPage() {
  return (
    <div style={{ padding: '48px 0 80px' }}>
      <div className="container">

        {/* Hero */}
        <div style={{
          maxWidth: '720px',
          marginBottom: '80px',
        }}>
          <div style={{ marginBottom: '20px' }}>
            <span style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: 'var(--orange-primary)',
            }}>
              Philosophy
            </span>
          </div>
          <h1 style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: 'clamp(32px, 5vw, 52px)',
            lineHeight: '1.15',
            color: 'var(--text-primary)',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}>
            The economy doesn&apos;t measure
            <span style={{ color: 'var(--orange-primary)' }}> what matters most.</span>
          </h1>
          <p style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '19px',
            lineHeight: '1.7',
            color: 'var(--text-secondary)',
          }}>
            $10.8 trillion in annual care work. The mentoring, the mutual aid, the emotional support, the caregiving — all of it invisible to GDP, unrepresented in financial systems, unrewarded by markets.
          </p>
        </div>

        {/* The problem */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {[
              {
                emoji: '💰',
                title: 'What the economy measures',
                items: ['Financial transactions', 'Code contributions', 'Content production', 'Property ownership', 'Market participation'],
                color: '#EF476F',
              },
              {
                emoji: '❤️‍🔥',
                title: 'What the economy ignores',
                items: ['Mentorship relationships', 'Mutual aid networks', 'Emotional labor', 'Community caregiving', 'Informal teaching'],
                color: '#06D6A0',
              },
            ].map(col => (
              <div key={col.title} className="card" style={{ padding: '32px' }}>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{col.emoji}</div>
                <h3 style={{
                  fontFamily: 'DM Serif Display, Georgia, serif',
                  fontSize: '22px',
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                }}>
                  {col.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.items.map(item => (
                    <li key={item} style={{
                      fontFamily: 'Nunito, sans-serif',
                      fontSize: '15px',
                      color: 'var(--text-secondary)',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--warm-gray)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}>
                      <span style={{ color: col.color, fontSize: '16px' }}>●</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Why not a token */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--text-primary) 0%, #3D3F5F 100%)',
            borderRadius: '24px',
            padding: '48px',
            color: 'white',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>🚫💰</div>
            <h2 style={{
              fontFamily: 'DM Serif Display, Georgia, serif',
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: 'white',
              marginBottom: '20px',
            }}>
              Why the Care Score is not a token
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}>
              {[
                {
                  title: 'Tokens financialize things',
                  body: 'The moment something becomes tradeable, it becomes something to speculate on. Care work that generates tradeable tokens becomes care work performed for financial yield — which isn\'t care at all.',
                },
                {
                  title: 'Ostrom showed us this',
                  body: 'Elinor Ostrom\'s Nobel-winning research proved that commons governed outside the market often outperform both privatized and state-managed alternatives. Some things must stay outside the market.',
                },
                {
                  title: 'Reputation, not currency',
                  body: 'The Care Score accrues. It compounds. It can\'t be bought or sold. It\'s proof of a relationship between people, not a financial instrument. That\'s what makes it meaningful.',
                },
              ].map(item => (
                <div key={item.title} style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  <h4 style={{
                    fontFamily: 'DM Serif Display, Georgia, serif',
                    fontSize: '20px',
                    color: 'white',
                    marginBottom: '12px',
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.65',
                    margin: 0,
                  }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ostrom principles */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: 'DM Serif Display, Georgia, serif',
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: 'var(--text-primary)',
              marginBottom: '12px',
            }}>
              Elinor Ostrom&apos;s design principles for the commons
            </h2>
            <p style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '16px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              maxWidth: '560px',
            }}>
              The Care Graph is governed by these eight principles. Each design decision maps back to one of them.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {OSTROM_PRINCIPLES.map(principle => (
              <div key={principle.number} className="card" style={{ padding: '24px' }}>
                <div style={{
                  fontFamily: 'DM Serif Display, Georgia, serif',
                  fontSize: '36px',
                  color: 'var(--warm-gray)',
                  lineHeight: 1,
                  marginBottom: '12px',
                }}>
                  {principle.number}
                </div>
                <h3 style={{
                  fontFamily: 'DM Serif Display, Georgia, serif',
                  fontSize: '18px',
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                }}>
                  {principle.title}
                </h3>
                <p style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.65',
                  margin: 0,
                }}>
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Care economy vision */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{
            background: 'var(--orange-ultralight)',
            borderRadius: '24px',
            padding: '48px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌐</div>
            <h2 style={{
              fontFamily: 'DM Serif Display, Georgia, serif',
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}>
              The care economy vision
            </h2>
            <p style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '17px',
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0 auto 24px',
            }}>
              We believe care work should be legible. Not monetized — legible. When DAOs fund contributors, they should be able to see care history alongside code commits. When cooperatives elect leaders, care reputation should be part of the signal. When communities evaluate trust, the care graph should be queryable.
            </p>
            <p style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '17px',
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0 auto',
            }}>
              We&apos;re not building a care token. We&apos;re building the infrastructure for a world where care work finally shows up in the record.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: 'var(--text-primary)',
            marginBottom: '32px',
          }}>
            Frequently asked questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQ.map(item => (
              <div key={item.q} className="card" style={{ padding: '28px' }}>
                <h3 style={{
                  fontFamily: 'DM Serif Display, Georgia, serif',
                  fontSize: '20px',
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                }}>
                  {item.q}
                </h3>
                <p style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.65',
                  margin: 0,
                }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <h2 style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: 'var(--text-primary)',
            marginBottom: '16px',
          }}>
            Ready to make care visible?
          </h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/attest" className="btn-primary">
              ✍️ Attest Care Work
            </Link>
            <Link href="/explore" className="btn-secondary">
              Browse the Graph
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
