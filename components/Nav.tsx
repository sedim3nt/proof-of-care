'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 250, 240, 0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(240, 237, 232, 0.8)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>❤️‍🔥</span>
          <span style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: '20px',
            color: 'var(--text-primary)',
            fontWeight: 400,
          }}>
            Proof of Care
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          {links.map(link => (
            <Link key={link.href} href={link.href} style={{
              textDecoration: 'none',
              fontFamily: 'Nunito, sans-serif',
              fontSize: '15px',
              fontWeight: pathname === link.href ? 700 : 500,
              color: pathname === link.href ? 'var(--orange-primary)' : 'var(--text-secondary)',
              transition: 'color 200ms ease',
            }}>
              {link.label}
            </Link>
          ))}
          <Link href="/attest" className="btn-primary" style={{ height: '40px', padding: '0 20px', fontSize: '14px' }}>
            ✍️ Attest
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: 'var(--text-primary)',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--bg-base)',
          borderTop: '1px solid var(--warm-gray)',
          padding: '16px 20px',
        }} className="mobile-menu">
          {links.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                textDecoration: 'none',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '16px',
                fontWeight: pathname === link.href ? 700 : 500,
                color: pathname === link.href ? 'var(--orange-primary)' : 'var(--text-primary)',
                borderBottom: '1px solid var(--warm-gray)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/attest" onClick={() => setMenuOpen(false)} className="btn-primary" style={{
            display: 'inline-flex',
            marginTop: '16px',
            height: '44px',
            fontSize: '15px',
          }}>
            ✍️ Attest Care
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
