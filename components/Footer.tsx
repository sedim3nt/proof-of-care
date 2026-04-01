import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--warm-gray)',
      padding: '48px 0 32px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '40px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>❤️‍🔥</span>
              <span style={{
                fontFamily: 'DM Serif Display, Georgia, serif',
                fontSize: '18px',
                color: 'var(--text-primary)',
              }}>
                Proof of Care
              </span>
            </div>
            <p style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              margin: 0,
            }}>
              Making care work visible, verifiable, and valued. Built on Base using EAS.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '12px',
              marginTop: 0,
            }}>
              Protocol
            </h4>
            {[
              { href: '/', label: 'Home' },
              { href: '/explore', label: 'Explore' },
              { href: '/attest', label: 'Attest Care' },
              { href: '/about', label: 'About' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{
                display: 'block',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '14px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                marginBottom: '8px',
                transition: 'color 150ms ease',
              }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Built with */}
          <div>
            <h4 style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '12px',
              marginTop: 0,
            }}>
              Built With
            </h4>
            {[
              { label: '⛓️ Base L2', href: 'https://base.org' },
              { label: '📋 EAS Protocol', href: 'https://attest.sh' },
              { label: '🌐 Open Source', href: 'https://github.com/sedim3nt/proof-of-care' },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{
                display: 'block',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '14px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                marginBottom: '8px',
              }}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--warm-gray)',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '13px',
            color: 'var(--text-muted)',
            margin: 0,
          }}>
            © 2025 SpiritTree. Care is the operating system.
          </p>
          <p style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '13px',
            color: 'var(--text-muted)',
            margin: 0,
          }}>
            No tokens. No trading. Just care.
          </p>
        </div>
      </div>
    </footer>
  );
}
