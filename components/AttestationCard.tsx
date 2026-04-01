import Link from 'next/link';
import { Attestation, CATEGORY_COLOR, CATEGORY_EMOJI } from '@/lib/mock-data';

interface AttestationCardProps {
  attestation: Attestation;
  compact?: boolean;
}

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function AttestationCard({ attestation, compact = false }: AttestationCardProps) {
  const color = CATEGORY_COLOR[attestation.category];
  const emoji = CATEGORY_EMOJI[attestation.category];

  return (
    <div className="card" style={{
      padding: compact ? '16px' : '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, flexWrap: 'wrap' }}>
          <Link href={`/profile/${attestation.from}`} style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textDecoration: 'none',
          }}>
            {attestation.fromName}
          </Link>
          <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>→</span>
          <Link href={`/profile/${attestation.to}`} style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--orange-primary)',
            textDecoration: 'none',
          }}>
            {attestation.toName}
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
          {attestation.bilateral && (
            <span className="pill" style={{ background: 'rgba(6, 214, 160, 0.12)', color: '#06D6A0', fontSize: '11px' }}>
              ✓ Bilateral
            </span>
          )}
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'Nunito' }}>
            {formatDate(attestation.date)}
          </span>
        </div>
      </div>

      {/* Category pill */}
      <div>
        <span className="pill" style={{
          background: `${color}18`,
          color: color,
          fontFamily: 'Nunito',
        }}>
          {emoji} {attestation.category}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: '15px',
        lineHeight: '1.6',
        color: 'var(--text-primary)',
        margin: 0,
        display: compact ? '-webkit-box' : 'block',
        WebkitLineClamp: compact ? 3 : undefined,
        WebkitBoxOrient: compact ? 'vertical' : undefined,
        overflow: compact ? 'hidden' : 'visible',
      }}>
        &ldquo;{attestation.description}&rdquo;
      </p>

      {/* Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '8px',
        borderTop: '1px solid var(--warm-gray)',
      }}>
        <span style={{
          fontFamily: 'monospace',
          fontSize: '11px',
          color: 'var(--text-muted)',
        }}>
          {shortAddress(attestation.from)}
        </span>
        <a
          href={`https://base.easscan.org/attestation/view/${attestation.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '11px',
            fontFamily: 'Nunito',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          View on Base ↗
        </a>
      </div>
    </div>
  );
}
